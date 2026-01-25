// lib/validations/auth.ts
import { z } from 'zod';

// Supported languages
export const LANGUAGES = [
  "Hindi", "English", "Tamil", "Telugu", "Kannada", "Malayalam", "Maithili",
  "Bengali", "Gujarati", "Punjabi", "Marathi", "Odia", "Assamese",
  "Urdu", "Sanskrit", "French", "German", "Spanish", "Japanese", "Korean"
] as const;

// Indian states
export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Outside India"
] as const;

export const FLUENCY_LEVELS = ["Beginner", "Intermediate", "Advanced", "Native"] as const;

// Language with fluency schema
export const languageKnowSchema = z.object({
  language: z.enum(LANGUAGES),
  fluency: z.enum(FLUENCY_LEVELS),
});

// Complete signup schema
export const signupSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  
  email: z.string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
  
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  
  profilePhoto: z.string().url().optional().or(z.literal("")),
  
  primaryLanguageToLearn: z.enum(LANGUAGES).refine(val => val, {
    message: "Please select a language to learn",
  }),
  
  secondaryLanguageToLearn: z.enum(LANGUAGES).optional(),
  
  languagesKnow: z.array(languageKnowSchema)
    .min(1, "Please add at least one language you know")
    .refine(
      (languages) => {
        const languageNames = languages.map(l => l.language);
        return new Set(languageNames).size === languageNames.length;
      },
      { message: "Duplicate languages not allowed" }
    ),
  
  primaryRole: z.enum(["learner", "teacher"]).refine(val => val, {
    message: "Please select your primary role",
  }),
  
  state: z.enum(INDIAN_STATES).refine(val => val, {
    message: "Please select your state",
  }),
  
  country: z.string()
    .min(2, "Country must be at least 2 characters")
    .default("India"),
  
  emailUpdates: z.boolean().default(true),
});

// Sign in schema
export const signinSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

// Update profile schema (for editing later)
export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  bio: z.string().max(500).optional(),
  age: z.number().min(13).max(120).optional(),
  city: z.string().max(100).optional(),
  interests: z.array(z.string()).max(10).optional(),
  profilePhoto: z.string().url().optional(),
  emailUpdates: z.boolean().optional(),
});

// Types
export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;