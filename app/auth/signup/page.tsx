"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, BookOpen, Sparkles } from "lucide-react";
import { useGoogleLogin } from '@react-oauth/google';
import { useDarkMode } from '@/lib/DarkModeContext';
import { useAuth } from '@/lib/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function SignupPage() {
  const { darkMode } = useDarkMode();
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState<any>(null);
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    primaryLanguageToLearn: "",
    secondaryLanguageToLearn: "",
    languagesKnow: [{ language: "", fluency: "" }],
    primaryRole: "learner",
    state: "",
    country: "India",
    emailUpdates: true,
  });

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Outside India"
  ];

  const languages = [
    "Hindi", "English", "Tamil", "Telugu", "Kannada", "Malayalam", "Maithili",
    "Bengali", "Gujarati", "Punjabi", "Marathi", "Odia", "Assamese",
    "Urdu", "Sanskrit", "French", "German", "Spanish", "Japanese", "Korean"
  ];

  const fluencyLevels = ["Beginner", "Intermediate", "Advanced", "Native"];

  const addLanguage = () => {
    setFormData({
      ...formData,
      languagesKnow: [...formData.languagesKnow, { language: "", fluency: "" }],
    });
  };

  const removeLanguage = (index: number) => {
    const updated = formData.languagesKnow.filter((_, i) => i !== index);
    setFormData({ ...formData, languagesKnow: updated });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await userInfoResponse.json();
        
        setGoogleUser({
          accessToken: tokenResponse.access_token,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture
        });
        
        // Auto-fill name and email
        setFormData({
          ...formData,
          name: userInfo.name,
          email: userInfo.email,
        });
      } catch (error) {
        console.error("Error getting user info:", error);
      }
    },
    onError: () => {
      console.log("Google login failed");
    },
  });

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      // Decode the JWT to get user info
      const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      
      setGoogleUser({
        credential: credentialResponse.credential,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture
      });
      
      // Auto-fill name and email
      setFormData({
        ...formData,
        name: decoded.name,
        email: decoded.email,
      });
      
    } catch (error) {
      console.error("Error processing Google login:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Require Google authentication
    if (!googleUser) {
      return;
    }
    
    setLoading(true);

    try {
      const validLanguages = formData.languagesKnow.filter(
        lang => lang.language && lang.fluency
      );

      if (validLanguages.length === 0) {
        setLoading(false);
        return;
      }

      const dataToSend = {
        ...formData,
        languagesKnow: validLanguages,
        googleAccessToken: googleUser.accessToken
      };

      const res = await fetch(`${API_URL}/auth/google-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      setIsLoggedIn(true);
      router.push("/profile");
    } catch (error) {
      console.error("Signup error:", error);
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"}`}>
      
      {/* Simple Header */}
      <div className={`py-4 px-4 ${darkMode ? "border-b border-orange-900/30" : "border-b border-orange-200"}`}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="VartaLang logo"
              className="w-16 h-auto object-cover"
            />
            <span className={`text-base font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>VartaLang</span>
          </Link>
          <Link href="/auth/login" className={`text-sm ${darkMode ? "text-orange-300 hover:text-orange-200" : "text-orange-600 hover:text-orange-700"}`}>
            Sign In
          </Link>
        </div>
      </div>

      <div className="pt-8 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className={`w-6 h-6 ${darkMode ? "text-orange-400" : "text-orange-500"}`} />
              <h1 className={`text-2xl font-bold ${darkMode ? "text-orange-50" : "text-orange-950"}`}>
                Join VartaLang
              </h1>
            </div>
            <p className={`text-sm ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>Sign up with Google to get started</p>
          </div>

          {/* Form Container */}
          <div className={`rounded-2xl p-6 ${darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200 shadow-lg"}`}>
            
            {/* Google Signup Button */}
            {!googleUser ? (
              <div className="mb-6">
                {/* Custom Google Button */}
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
                
                {/* Info message */}
                <div className={`mt-3 text-center text-xs ${darkMode ? "text-orange-200/60" : "text-orange-700/60"}`}>
                  We use Google to verify your identity and keep your account secure
                </div>
              </div>
            ) : (
              /* Google User Connected */
              <div className={`mb-6 p-3 rounded-xl ${darkMode ? "bg-linear-to-r from-green-900/20 to-emerald-900/20 border border-green-700/30" : "bg-linear-to-r from-green-50 to-emerald-50 border border-green-200"}`}>
                <div className="flex items-center gap-3">
                  <img 
                    src={googleUser.picture} 
                    alt={googleUser.name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className={`font-semibold text-sm ${darkMode ? "text-green-100" : "text-green-900"}`}>
                        Connected with Google
                      </p>
                      <Sparkles className={`w-3.5 h-3.5 shrink-0 ${darkMode ? "text-green-400" : "text-green-500"}`} />
                    </div>
                    <p className={`text-xs truncate ${darkMode ? "text-green-200/70" : "text-green-700/70"}`}>
                      {googleUser.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setGoogleUser(null);
                      setFormData({ ...formData, name: "", email: "", password: "" });
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg shrink-0 ${darkMode ? "bg-orange-900/20 text-orange-300 hover:bg-orange-900/30" : "bg-orange-100 text-orange-700 hover:bg-orange-200"} transition-colors`}
                  >
                    Change
                  </button>
                </div>
              </div>
            )}

            {/* Email Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Password - Optional */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={`text-sm font-semibold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                    Password (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPasswordInfo(!showPasswordInfo)}
                    className={`text-xs px-2.5 py-1 rounded-full ${darkMode ? "bg-blue-900/20 text-blue-300 hover:bg-blue-900/30" : "bg-blue-100 text-blue-700 hover:bg-blue-200"} transition-colors`}
                  >
                    Why optional?
                  </button>
                </div>
                
                {showPasswordInfo && (
                  <div className={`mb-3 p-3 rounded-xl ${darkMode ? "bg-blue-900/20 border border-blue-800/30" : "bg-blue-50 border border-blue-200"}`}>
                    <p className={`text-xs leading-relaxed ${darkMode ? "text-blue-200" : "text-blue-800"}`}>
                      <span className="font-semibold">💡 About passwords:</span>
                      <br />
                      Skip the password to sign in exclusively with Google. Add one if you'd like email login too.
                    </p>
                  </div>
                )}
                
                <input
                  type="password"
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none ${
                    darkMode 
                      ? "bg-orange-900/20 border-orange-800/30 text-orange-100 placeholder:text-orange-400/50 focus:border-orange-600" 
                      : "bg-orange-50 border-orange-300 text-orange-950 placeholder:text-orange-400 focus:border-orange-500"
                  }`}
                  placeholder="Leave empty to use Google only"
                />
              </div>

              {/* Languages to Learn */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                    Primary Language to Learn *
                  </label>
                  <select
                    required
                    value={formData.primaryLanguageToLearn}
                    onChange={(e) => setFormData({ ...formData, primaryLanguageToLearn: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none ${
                      darkMode 
                        ? "bg-orange-900/20 border-orange-800/30 text-orange-100 focus:border-orange-600" 
                        : "bg-orange-50 border-orange-300 text-orange-950 focus:border-orange-500"
                    }`}
                  >
                    <option value="">Select</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang} className={darkMode ? "bg-[#1a1410]" : "bg-white"}>{lang}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                    Secondary (Optional)
                  </label>
                  <select
                    value={formData.secondaryLanguageToLearn}
                    onChange={(e) => setFormData({ ...formData, secondaryLanguageToLearn: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none ${
                      darkMode 
                        ? "bg-orange-900/20 border-orange-800/30 text-orange-100 focus:border-orange-600" 
                        : "bg-orange-50 border-orange-300 text-orange-950 focus:border-orange-500"
                    }`}
                  >
                    <option value="">Select</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang} className={darkMode ? "bg-[#1a1410]" : "bg-white"}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Languages I Know */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                  Languages I Know & Can Teach *
                </label>
                <div className="space-y-2.5">
                  {formData.languagesKnow.map((lang, index) => (
                    <div key={index} className="grid grid-cols-2 gap-3">
                      <select
                        required
                        value={lang.language}
                        onChange={(e) => {
                          const updated = [...formData.languagesKnow];
                          updated[index].language = e.target.value;
                          setFormData({ ...formData, languagesKnow: updated });
                        }}
                        className={`px-4 py-2.5 rounded-xl border focus:outline-none ${
                          darkMode 
                            ? "bg-orange-900/20 border-orange-800/30 text-orange-100" 
                            : "bg-orange-50 border-orange-300 text-orange-950"
                        }`}
                      >
                        <option value="">Language</option>
                        {languages.map((l) => (
                          <option key={l} value={l} className={darkMode ? "bg-[#1a1410]" : "bg-white"}>{l}</option>
                        ))}
                      </select>
                      <div className="flex gap-2">
                        <select
                          required
                          value={lang.fluency}
                          onChange={(e) => {
                            const updated = [...formData.languagesKnow];
                            updated[index].fluency = e.target.value;
                            setFormData({ ...formData, languagesKnow: updated });
                          }}
                          className={`flex-1 px-4 py-2.5 rounded-xl border focus:outline-none ${
                            darkMode 
                              ? "bg-orange-900/20 border-orange-800/30 text-orange-100" 
                              : "bg-orange-50 border-orange-300 text-orange-950"
                          }`}
                        >
                          <option value="">Level</option>
                          {fluencyLevels.map((level) => (
                            <option key={level} value={level} className={darkMode ? "bg-[#1a1410]" : "bg-white"}>{level}</option>
                          ))}
                        </select>
                        {formData.languagesKnow.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLanguage(index)}
                            className={`px-3 py-1.5 text-sm rounded-xl font-medium transition-colors ${
                              darkMode 
                                ? "bg-orange-900/20 text-orange-300 hover:bg-orange-900/30" 
                                : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                            }`}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addLanguage}
                  className={`mt-3 text-sm font-semibold px-3 py-2 rounded-xl transition-colors ${darkMode ? "text-orange-400 hover:bg-orange-900/20" : "text-orange-600 hover:bg-orange-100"}`}
                >
                  + Add another language
                </button>
              </div>

              {/* Primary Role */}
              <div>
                <label className={`block text-sm font-semibold mb-2.5 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                  What's your primary goal? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, primaryRole: "learner" })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.primaryRole === "learner"
                        ? darkMode 
                          ? "border-orange-500 bg-linear-to-br from-orange-500/20 to-red-500/20 shadow-lg shadow-orange-500/20" 
                          : "border-orange-500 bg-linear-to-br from-orange-100 to-red-100 shadow-lg shadow-orange-200"
                        : darkMode 
                          ? "border-orange-800/30 bg-orange-900/10 hover:border-orange-700/50 hover:bg-orange-900/20" 
                          : "border-orange-300 bg-orange-50 hover:border-orange-400 hover:bg-orange-100"
                    }`}
                  >
                    <GraduationCap className={`w-7 h-7 mx-auto mb-2 ${
                      formData.primaryRole === "learner"
                        ? darkMode ? "text-orange-300" : "text-orange-600"
                        : darkMode ? "text-orange-400" : "text-orange-500"
                    }`} />
                    <p className={`font-bold mb-1 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>Learn</p>
                    <p className={`text-xs ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>I'm here to learn</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, primaryRole: "teacher" })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.primaryRole === "teacher"
                        ? darkMode 
                          ? "border-orange-500 bg-linear-to-br from-orange-500/20 to-red-500/20 shadow-lg shadow-orange-500/20" 
                          : "border-orange-500 bg-linear-to-br from-orange-100 to-red-100 shadow-lg shadow-orange-200"
                        : darkMode 
                          ? "border-orange-800/30 bg-orange-900/10 hover:border-orange-700/50 hover:bg-orange-900/20" 
                          : "border-orange-300 bg-orange-50 hover:border-orange-400 hover:bg-orange-100"
                    }`}
                  >
                    <BookOpen className={`w-7 h-7 mx-auto mb-2 ${
                      formData.primaryRole === "teacher"
                        ? darkMode ? "text-orange-300" : "text-orange-600"
                        : darkMode ? "text-orange-400" : "text-orange-500"
                    }`} />
                    <p className={`font-bold mb-1 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>Teach</p>
                    <p className={`text-xs ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>I'm here to teach</p>
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                    State *
                  </label>
                  <select
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none ${
                      darkMode 
                        ? "bg-orange-900/20 border-orange-800/30 text-orange-100" 
                        : "bg-orange-50 border-orange-300 text-orange-950"
                    }`}
                  >
                    <option value="">Select state</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state} className={darkMode ? "bg-[#1a1410]" : "bg-white"}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none ${
                      darkMode 
                        ? "bg-orange-900/20 border-orange-800/30 text-orange-100" 
                        : "bg-orange-50 border-orange-300 text-orange-950"
                    }`}
                  />
                </div>
              </div>

              {/* Email Updates */}
              <div className={`flex items-start gap-2.5 p-3 rounded-xl ${darkMode ? "bg-orange-900/10" : "bg-orange-50"}`}>
                <input
                  type="checkbox"
                  id="emailUpdates"
                  checked={formData.emailUpdates}
                  onChange={(e) => setFormData({ ...formData, emailUpdates: e.target.checked })}
                  className="w-4 h-4 rounded accent-orange-500 mt-0.5"
                />
                <label htmlFor="emailUpdates" className={`text-sm cursor-pointer leading-relaxed ${darkMode ? "text-orange-200/90" : "text-orange-800"}`}>
                  <span className="font-semibold">Stay in the loop!</span> Get weekly tips, match suggestions, and updates.
                </label>
              </div>

              {/* Submit */}
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
                    Creating your account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Complete Signup
                    <Sparkles className="w-4 h-4" />
                  </span>
                )}
              </button>

              <p className={`text-center text-sm ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                Already have an account?{" "}
                <Link href="/auth/login" className={`font-semibold ${darkMode ? "text-orange-400 hover:text-orange-300" : "text-orange-600 hover:text-orange-700"} transition-colors`}>
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}