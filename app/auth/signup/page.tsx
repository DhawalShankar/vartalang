"use client";
import { useState } from "react";
import Link from "next/link";
import { Upload, User, Mail, GraduationCap, BookOpen } from "lucide-react";
import { useDarkMode } from '@/lib/DarkModeContext';

// Add this at the top
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function SignupPage() {
  const { darkMode } = useDarkMode();
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate that at least one language is filled
      const validLanguages = formData.languagesKnow.filter(
        lang => lang.language && lang.fluency
      );

      if (validLanguages.length === 0) {
        alert("Please add at least one language you know");
        setLoading(false);
        return;
      }

      const dataToSend = {
        ...formData,
        languagesKnow: validLanguages
      };

      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      // Save token and redirect
      localStorage.setItem("token", data.token);
      alert("Signup successful! Redirecting...");
      window.location.href = "/learn";
    } catch (error) {
      console.error("Signup error:", error);
      alert("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"}`}>
      
      {/* Simple Header */}
      <div className={`py-6 px-4 ${darkMode ? "border-b border-orange-900/30" : "border-b border-orange-200"}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center">
              <span className="text-white text-sm font-bold">V</span>
            </div>
            <span className={`font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>VartaLang</span>
          </Link>
          <Link href="/auth/login" className={`text-sm ${darkMode ? "text-orange-300 hover:text-orange-200" : "text-orange-600 hover:text-orange-700"}`}>
            Sign In
          </Link>
        </div>
      </div>

      <div className="pt-12 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? "text-orange-50" : "text-orange-950"}`}>
              Join VartaLang
            </h1>
            <p className={darkMode ? "text-orange-200/70" : "text-orange-700/70"}>Complete your profile in one step</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={`rounded-3xl p-6 md:p-8 ${darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200 shadow-lg"}`}>
            
            <div className="space-y-5">
              
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none ${
                      darkMode 
                        ? "bg-orange-900/20 border-orange-800/30 text-orange-100 placeholder:text-orange-400/50 focus:border-orange-600" 
                        : "bg-orange-50 border-orange-300 text-orange-950 placeholder:text-orange-400 focus:border-orange-500"
                    }`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none ${
                      darkMode 
                        ? "bg-orange-900/20 border-orange-800/30 text-orange-100 placeholder:text-orange-400/50 focus:border-orange-600" 
                        : "bg-orange-50 border-orange-300 text-orange-950 placeholder:text-orange-400 focus:border-orange-500"
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                  Password *
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none ${
                    darkMode 
                      ? "bg-orange-900/20 border-orange-800/30 text-orange-100 placeholder:text-orange-400/50 focus:border-orange-600" 
                      : "bg-orange-50 border-orange-300 text-orange-950 placeholder:text-orange-400 focus:border-orange-500"
                  }`}
                  placeholder="Min 8 characters"
                />
              </div>

              {/* Languages to Learn */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                    Primary Language to Learn *
                  </label>
                  <select
                    required
                    value={formData.primaryLanguageToLearn}
                    onChange={(e) => setFormData({ ...formData, primaryLanguageToLearn: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none ${
                      darkMode 
                        ? "bg-orange-900/20 border-orange-800/30 text-orange-100 focus:border-orange-600" 
                        : "bg-orange-50 border-orange-300 text-orange-950 focus:border-orange-500"
                    }`}
                  >
                    <option value="">Select language</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang} className={darkMode ? "bg-[#1a1410]" : "bg-white"}>{lang}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                    Secondary Language (Optional)
                  </label>
                  <select
                    value={formData.secondaryLanguageToLearn}
                    onChange={(e) => setFormData({ ...formData, secondaryLanguageToLearn: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none ${
                      darkMode 
                        ? "bg-orange-900/20 border-orange-800/30 text-orange-100 focus:border-orange-600" 
                        : "bg-orange-50 border-orange-300 text-orange-950 focus:border-orange-500"
                    }`}
                  >
                    <option value="">Select language</option>
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
                {formData.languagesKnow.map((lang, index) => (
                  <div key={index} className="grid grid-cols-2 gap-3 mb-3">
                    <select
                      required
                      value={lang.language}
                      onChange={(e) => {
                        const updated = [...formData.languagesKnow];
                        updated[index].language = e.target.value;
                        setFormData({ ...formData, languagesKnow: updated });
                      }}
                      className={`px-4 py-3 rounded-xl border focus:outline-none ${
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
                        className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none ${
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
                          className={`px-3 py-2 rounded-xl ${
                            darkMode 
                              ? "bg-red-900/20 text-red-400 hover:bg-red-900/30" 
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                          }`}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLanguage}
                  className={`text-sm font-medium ${darkMode ? "text-orange-400 hover:text-orange-300" : "text-orange-600 hover:text-orange-700"}`}
                >
                  + Add another language
                </button>
              </div>

              {/* Primary Role */}
              <div>
                <label className={`block text-sm font-semibold mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                  What's your primary goal? *
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, primaryRole: "learner" })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.primaryRole === "learner"
                        ? darkMode 
                          ? "border-orange-500 bg-orange-500/20" 
                          : "border-orange-500 bg-orange-100"
                        : darkMode 
                          ? "border-orange-800/30 bg-orange-900/10 hover:border-orange-700/50" 
                          : "border-orange-300 bg-orange-50 hover:border-orange-400"
                    }`}
                  >
                    <GraduationCap className={`w-8 h-8 mx-auto mb-2 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                    <p className={`font-semibold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>🎓 Primary Learner</p>
                    <p className={`text-xs mt-1 ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>I'm here to learn</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, primaryRole: "teacher" })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.primaryRole === "teacher"
                        ? darkMode 
                          ? "border-orange-500 bg-orange-500/20" 
                          : "border-orange-500 bg-orange-100"
                        : darkMode 
                          ? "border-orange-800/30 bg-orange-900/10 hover:border-orange-700/50" 
                          : "border-orange-300 bg-orange-50 hover:border-orange-400"
                    }`}
                  >
                    <BookOpen className={`w-8 h-8 mx-auto mb-2 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                    <p className={`font-semibold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>👨‍🏫 Primary Teacher</p>
                    <p className={`text-xs mt-1 ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>I'm here to teach</p>
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                    State *
                  </label>
                  <select
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none ${
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
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none ${
                      darkMode 
                        ? "bg-orange-900/20 border-orange-800/30 text-orange-100" 
                        : "bg-orange-50 border-orange-300 text-orange-950"
                    }`}
                  />
                </div>
              </div>

              {/* Email Updates */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="emailUpdates"
                  checked={formData.emailUpdates}
                  onChange={(e) => setFormData({ ...formData, emailUpdates: e.target.checked })}
                  className="w-4 h-4 rounded accent-orange-500"
                />
                <label htmlFor="emailUpdates" className={`text-sm ${darkMode ? "text-orange-200/80" : "text-orange-800"}`}>
                  Send me weekly learning tips & match suggestions
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Complete Signup"}
              </button>

              <p className={`text-center text-sm ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                Already have an account?{" "}
                <Link href="/auth/login" className={`font-medium ${darkMode ? "text-orange-400 hover:text-orange-300" : "text-orange-600 hover:text-orange-700"}`}>
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}