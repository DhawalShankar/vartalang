// auth.ts (NextAuth v5 config)
import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { signinSchema } from "@/lib/validations/auth";

export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate input
          const validatedFields = signinSchema.safeParse(credentials);
          
          if (!validatedFields.success) {
            return null;
          }
          
          const { email, password } = validatedFields.data;
          
          // Connect to database
          await dbConnect();
          
          // Find user with password field
          const user = await User.findOne({ email }).select('+password');
          
          if (!user) {
            return null;
          }
          
          // Check if account is blocked
          if (user.isBlocked) {
            throw new Error("Account has been blocked");
          }
          
          // Verify password
          const isPasswordValid = await user.comparePassword(password);
          
          if (!isPasswordValid) {
            return null;
          }
          
          // Return user object
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.profilePhoto,
            primaryRole: user.primaryRole,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          
          // Check if user exists
          const existingUser = await User.findOne({ email: user.email });
          
          if (existingUser) {
            // Update user info if needed
            existingUser.name = user.name || existingUser.name;
            existingUser.profilePhoto = user.image || existingUser.profilePhoto;
            await existingUser.save();
            
            // Check if blocked
            if (existingUser.isBlocked) {
              return false;
            }
            
            return true;
          }
          
          // For new Google users, redirect to complete signup
          // We'll handle this in the signup flow
          return true;
        } catch (error) {
          console.error("SignIn callback error:", error);
          return false;
        }
      }
      
      return true;
    },
    
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.primaryRole = user.primaryRole;
      }
      
      // Store provider info
      if (account) {
        token.provider = account.provider;
      }
      
      return token;
    },
    
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.primaryRole = token.primaryRole as string;
        session.user.provider = token.provider as string;
      }
      
      return session;
    },
  },
  
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// Type extensions for NextAuth
declare module "next-auth" {
  interface User {
    primaryRole?: string;
  }
  
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      primaryRole?: string;
      provider?: string;
    };
  }
}

declare module "next-auth" {
  interface JWT {
    id: string;
    primaryRole?: string;
    provider?: string;
  }
}