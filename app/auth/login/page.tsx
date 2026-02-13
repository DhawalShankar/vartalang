// app/auth/login/page.tsx (Updated)
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Sparkles, AlertCircle } from "lucide-react";
import { useGoogleLogin } from '@react-oauth/google';
import { useDarkMode } from '@/lib/DarkModeContext';
import { useAuth } from '@/lib/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function SigninPage() {
  const { darkMode } = useDarkMode();
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ← ADD THIS
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setError(""); // ← Clear previous errors
        
        // Get user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await userInfoResponse.json();
        
        // Send to backend
        const res = await fetch(`${API_URL}/auth/google-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            googleAccessToken: tokenResponse.access_token,
            email: userInfo.email,
            name: userInfo.name
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          // ✅ CHECK IF USER NOT FOUND
          if (res.status === 404 || data.error?.includes('not found')) {
            // Store Google info in sessionStorage for signup page
            sessionStorage.setItem('googleSignupData', JSON.stringify({
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
              accessToken: tokenResponse.access_token
            }));
            
            // Redirect to signup
            router.push('/auth/signup?from=google');
            return;
          }
          
          // Other errors
          setError(data.error || "Login failed. Please try again.");
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        setIsLoggedIn(true);
        router.push("/profile");
        
      } catch (error) {
        console.error("Google login error:", error);
        setError("Something went wrong. Please try again.");
      }
    },
    onError: () => {
      console.log("Google login failed");
      setError("Google login cancelled or failed.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // ← Clear previous errors

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId); 
      setIsLoggedIn(true);
      router.push("/profile");
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"}`}>
      
      {/* Background Glow */}
      <div className={`absolute top-20 left-1/3 w-72 h-72 rounded-full blur-3xl ${darkMode ? "bg-orange-900/20" : "bg-orange-300/30"}`}></div>
      <div className={`absolute bottom-20 right-1/3 w-64 h-64 rounded-full blur-3xl ${darkMode ? "bg-red-900/20" : "bg-red-300/30"}`}></div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <img
            src="/logo.png"
            alt="VartaLang logo"
            className="w-16 h-auto object-cover"
          />
          <span className={`text-lg font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>VartaLang</span>
        </Link>

        {/* Card */}
        <div className={`rounded-2xl p-6 ${darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200 shadow-lg"}`}>
          
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className={`text-2xl font-bold ${darkMode ? "text-orange-50" : "text-orange-950"}`}>Welcome Back</h1>
              <Sparkles className={`w-5 h-5 ${darkMode ? "text-orange-400" : "text-orange-500"}`} />
            </div>
            <p className={`text-sm ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>Sign in to continue learning</p>
          </div>

          {/* ✅ ERROR MESSAGE */}
          {error && (
            <div className={`mb-4 p-3 rounded-xl border flex items-start gap-2 ${
              darkMode 
                ? 'bg-red-900/20 border-red-800/30' 
                : 'bg-red-50 border-red-200'
            }`}>
              <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${
                darkMode ? 'text-red-400' : 'text-red-600'
              }`} />
              <p className={`text-sm ${darkMode ? 'text-red-200' : 'text-red-900'}`}>
                {error}
              </p>
            </div>
          )}

          {/* Custom Google Login Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => googleLogin()}
              className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${
                darkMode 
                  ? "bg-linear-to-r from-orange-900/30 to-red-900/30 hover:from-orange-900/40 hover:to-red-900/40 border-2 border-orange-700/40 hover:border-orange-600/60" 
                  : "bg-white hover:bg-orange-50 border-2 border-orange-200 hover:border-orange-300 shadow-md hover:shadow-lg"
              }`}
            >
              <div className="flex items-center justify-center gap-3 px-5 py-3.5">
                {/* Google Logo SVG */}
                <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                
                <span className={`font-semibold ${darkMode ? "text-orange-50" : "text-gray-800"}`}>
                  Continue with Google
                </span>
              </div>
              
              {/* Shimmer effect */}
              <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ${
                darkMode 
                  ? "bg-linear-to-r from-transparent via-orange-400/10 to-transparent" 
                  : "bg-linear-to-r from-transparent via-orange-300/20 to-transparent"
              }`}></div>
            </button>
            
            <div className={`my-6 text-center text-sm ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
              or continue with email
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>Email</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-11 pr-4 py-2.5 rounded-xl border focus:outline-none ${
                    darkMode 
                      ? "bg-orange-900/20 border-orange-800/30 text-orange-100 placeholder:text-orange-400/50 focus:border-orange-600" 
                      : "bg-orange-50 border-orange-300 text-orange-950 placeholder:text-orange-400 focus:border-orange-500"
                  }`}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>Password</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-11 pr-4 py-2.5 rounded-xl border focus:outline-none ${
                    darkMode 
                      ? "bg-orange-900/20 border-orange-800/30 text-orange-100 placeholder:text-orange-400/50 focus:border-orange-600" 
                      : "bg-orange-50 border-orange-300 text-orange-950 placeholder:text-orange-400 focus:border-orange-500"
                  }`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className={`flex items-center gap-2 ${darkMode ? "text-orange-200/80" : "text-orange-800"}`}>
                <input type="checkbox" className="w-4 h-4 rounded accent-orange-500" />
                Remember me
              </label>
              <a href="#" className={`font-medium ${darkMode ? "text-orange-400 hover:text-orange-300" : "text-orange-600 hover:text-orange-700"}`}>Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
                loading 
                  ? "bg-linear-to-r from-orange-400 to-red-400 cursor-not-allowed opacity-70" 
                  : "bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className={`text-center text-sm mt-6 ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
            Don't have an account?{" "}
            <Link href="/auth/signup" className={`font-semibold ${darkMode ? "text-orange-400 hover:text-orange-300" : "text-orange-600 hover:text-orange-700"} transition-colors`}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}