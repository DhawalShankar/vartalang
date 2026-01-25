import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

/* ------------------------------------------------------------------
   Interfaces
-------------------------------------------------------------------*/

export interface ILanguageKnow {
  language: string;
  fluency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface IUser extends Document {
  email: string;
  password?: string; // Optional for OAuth users
  name: string;
  profilePhoto?: string;

  // Primary fields from signup
  primaryLanguageToLearn: string;
  secondaryLanguageToLearn?: string;
  languagesKnow: ILanguageKnow[];

  // Role
  primaryRole: 'learner' | 'teacher';

  // Location
  state: string;
  country: string;

  // Preferences
  emailUpdates: boolean;

  // Optional fields (editable later)
  age?: number;
  city?: string;
  bio?: string;
  interests?: string[];

  // OAuth
  provider?: 'google' | 'email';
  providerId?: string;

  // System fields
  isBlocked: boolean;
  isPremium: boolean;

  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/* ------------------------------------------------------------------
   Schema
-------------------------------------------------------------------*/

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      select: false,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    profilePhoto: {
      type: String,
    },

    // Primary fields
    primaryLanguageToLearn: {
      type: String,
      required: true,
    },

    secondaryLanguageToLearn: {
      type: String,
    },

    languagesKnow: [
      {
        language: {
          type: String,
          required: true,
        },
        fluency: {
          type: String,
          enum: ['Beginner', 'Intermediate', 'Advanced', 'Native'],
          required: true,
        },
      },
    ],

    // Role
    primaryRole: {
      type: String,
      enum: ['learner', 'teacher'],
      required: true,
      default: 'learner',
    },

    // Location
    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
      default: 'India',
    },

    // Preferences
    emailUpdates: {
      type: Boolean,
      default: true,
    },

    // Optional fields
    age: {
      type: Number,
      min: 13,
      max: 120,
    },

    city: {
      type: String,
    },

    bio: {
      type: String,
      maxlength: 500,
    },

    interests: [
      {
        type: String,
      },
    ],

    // OAuth
    provider: {
      type: String,
      enum: ['google', 'email'],
      default: 'email',
    },

    providerId: {
      type: String,
    },

    // System fields
    isBlocked: {
      type: Boolean,
      default: false,
    },

    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* ------------------------------------------------------------------
   Hooks
-------------------------------------------------------------------*/

// Hash password before saving
UserSchema.pre('save', async function (this: IUser) {
  if (!this.isModified('password') || !this.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* ------------------------------------------------------------------
   Methods
-------------------------------------------------------------------*/

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

/* ------------------------------------------------------------------
   Model Export (Prevent recompilation)
-------------------------------------------------------------------*/

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
