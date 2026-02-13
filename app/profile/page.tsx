"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, Edit, Save, X, Camera, MapPin, Languages, 
  GraduationCap, Award, BookOpen, Star, LogOut
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';
import { useAuth } from '@/lib/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface LanguageKnown {
  language: string;
  fluency: string;
}

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  bio?: string;
  state: string;
  city?: string;
  country: string;
  primaryLanguageToLearn: string;
  secondaryLanguageToLearn?: string;
  languagesKnow: LanguageKnown[];
  primaryRole: 'learner' | 'teacher';
  authProvider?: 'local' | 'google';
  createdAt: string;
  totalConnections?: number;
  coursesCompleted?: number;
  hoursLearned?: number;
}

export default function ProfilePage() {
  const { darkMode } = useDarkMode();
  const { setIsLoggedIn } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [imageError, setImageError] = useState(false);

  const languages = [
    "Hindi", "English", "Tamil", "Telugu", "Kannada", "Malayalam", "Maithili",
    "Bengali", "Gujarati", "Punjabi", "Marathi", "Odia", "Assamese",
    "Urdu", "Sanskrit", "French", "German", "Spanish", "Japanese", "Korean"
  ];

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Outside India"
  ];

  const fluencyLevels = ["Beginner", "Intermediate", "Advanced", "Native"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setProfile(data.user);
        setEditedProfile(data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Profile fetch error:", error);
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      });
  }, []);

  // Reset image error when profile photo changes
  useEffect(() => {
    setImageError(false);
  }, [profile?.profilePhoto]);

  const handleSave = async () => {
    if (!editedProfile) return;
    
    setSaving(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedProfile),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await res.json();
      setProfile(data.user);
      setEditedProfile(data.user);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/auth/login";
  };

  const addLanguage = () => {
    if (!editedProfile) return;
    setEditedProfile({
      ...editedProfile,
      languagesKnow: [...editedProfile.languagesKnow, { language: "", fluency: "" }],
    });
  };

  const removeLanguage = (index: number) => {
    if (!editedProfile || editedProfile.languagesKnow.length <= 1) return;
    const updated = editedProfile.languagesKnow.filter((_, i) => i !== index);
    setEditedProfile({ ...editedProfile, languagesKnow: updated });
  };

  // Check if user is Google user
  const isGoogleUser = profile?.authProvider === 'google';

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={darkMode ? 'text-orange-200' : 'text-gray-700'}>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile || !editedProfile) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
        <div className="text-center">
          <p className={darkMode ? 'text-orange-200' : 'text-gray-700'}>Failed to load profile</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />

      <div className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Profile Header Card */}
          <div className={`rounded-3xl overflow-hidden mb-8 ${
            darkMode 
              ? 'bg-orange-900/10 border border-orange-800/30' 
              : 'bg-white border border-orange-100 shadow-xl'
          }`}>
            {/* Cover */}
            <div className={`h-32 ${
              darkMode 
                ? 'bg-linear-to-r from-orange-900/40 to-red-900/40' 
                : 'bg-linear-to-r from-orange-100 to-red-100'
            }`}></div>

            <div className="px-6 pb-6">
              {/* Profile Photo & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 mb-6">
                <div className="relative group">
                  <div className={`w-32 h-32 rounded-2xl border-4 overflow-hidden ${
                    darkMode 
                      ? 'border-[#1a1410] bg-orange-900/30' 
                      : 'border-white bg-orange-50'
                  }`}>
                    {profile.profilePhoto && !imageError ? (
                      <img 
                        src={profile.profilePhoto} 
                        alt={profile.name} 
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className={`w-16 h-16 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4 sm:mt-0">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {saving ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={saving}
                        className={`px-6 py-3 rounded-xl border font-semibold transition-all flex items-center gap-2 disabled:opacity-50 ${
                          darkMode 
                            ? 'border-orange-800/30 text-orange-200 hover:bg-orange-900/20' 
                            : 'border-orange-200 text-gray-700 hover:bg-orange-50'
                        }`}
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Name & Bio */}
              <div className="mb-6">
                {!isEditing ? (
                  <>
                    <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {profile.name}
                    </h1>
                    <p className={`text-sm mb-3 ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                      {profile.email}
                      {isGoogleUser && (
                        <span className={`ml-2 text-xs px-2 py-1 rounded ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                          Google Account
                        </span>
                      )}
                    </p>
                    {profile.bio && (
                      <p className={`text-base leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                        {profile.bio}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                        Name {isGoogleUser && <span className="text-xs opacity-70">(Cannot be changed - Google account)</span>}
                      </label>
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                        disabled={isGoogleUser}
                        className={`w-full px-4 py-3 rounded-xl border text-2xl font-bold outline-none ${
                          isGoogleUser ? 'opacity-50 cursor-not-allowed' : ''
                        } ${
                          darkMode 
                            ? 'bg-orange-900/20 border-orange-800/30 text-orange-50' 
                            : 'bg-orange-50 border-orange-200 text-gray-900'
                        }`}
                        placeholder="Your Name"
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={editedProfile.bio || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none resize-none ${
                        darkMode 
                          ? 'bg-orange-900/20 border-orange-800/30 text-orange-50' 
                          : 'bg-orange-50 border-orange-200 text-gray-900'
                      }`}
                      placeholder="Tell others about yourself..."
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            
            {/* Location */}
            <div className={`p-6 rounded-2xl ${
              darkMode 
                ? 'bg-orange-900/10 border border-orange-800/30' 
                : 'bg-white border border-orange-100 shadow-lg'
            }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                darkMode ? 'text-orange-50' : 'text-gray-900'
              }`}>
                <MapPin className="w-5 h-5" />
                Location
              </h3>
              
              {!isEditing ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>Country</span>
                    <span className={`font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {profile.country}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>State</span>
                    <span className={`font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                      {profile.state}
                    </span>
                  </div>
                  {profile.city && (
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>City</span>
                      <span className={`font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                        {profile.city}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      Country
                    </label>
                    <input
                      type="text"
                      value={editedProfile.country}
                      onChange={(e) => setEditedProfile({ ...editedProfile, country: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none ${
                        darkMode 
                          ? 'bg-orange-900/20 border-orange-800/30 text-orange-50' 
                          : 'bg-orange-50 border-orange-200 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      State *
                    </label>
                    <select
                      value={editedProfile.state}
                      onChange={(e) => setEditedProfile({ ...editedProfile, state: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none ${
                        darkMode 
                          ? 'bg-orange-900/20 border-orange-800/30 text-orange-50' 
                          : 'bg-orange-50 border-orange-200 text-gray-900'
                      }`}
                    >
                      {indianStates.map((state) => (
                        <option key={state} value={state} className={darkMode ? 'bg-[#1a1410]' : 'bg-white'}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      City (Optional)
                    </label>
                    <input
                      type="text"
                      value={editedProfile.city || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, city: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none ${
                        darkMode 
                          ? 'bg-orange-900/20 border-orange-800/30 text-orange-50' 
                          : 'bg-orange-50 border-orange-200 text-gray-900'
                      }`}
                      placeholder="Your city"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Role */}
            <div className={`p-6 rounded-2xl ${
              darkMode 
                ? 'bg-orange-900/10 border border-orange-800/30' 
                : 'bg-white border border-orange-100 shadow-lg'
            }`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                darkMode ? 'text-orange-50' : 'text-gray-900'
              }`}>
                <Award className="w-5 h-5" />
                Primary Role
              </h3>
              
              {!isEditing ? (
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-orange-900/20' : 'bg-orange-50'
                }`}>
                  <div className="flex items-center gap-3">
                    {profile.primaryRole === 'learner' ? (
                      <>
                        <GraduationCap className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                        <div>
                          <div className={`font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                            Primary Learner
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                            Here to learn
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <BookOpen className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                        <div>
                          <div className={`font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                            Primary Teacher
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                            Here to teach
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setEditedProfile({ ...editedProfile, primaryRole: 'learner' })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      editedProfile.primaryRole === 'learner'
                        ? darkMode 
                          ? 'border-orange-500 bg-orange-500/20' 
                          : 'border-orange-500 bg-orange-100'
                        : darkMode 
                          ? 'border-orange-800/30 hover:border-orange-700/50' 
                          : 'border-orange-200 hover:border-orange-300'
                    }`}
                  >
                    <GraduationCap className={`w-6 h-6 mx-auto mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    <p className={`text-sm font-medium ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>Learner</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditedProfile({ ...editedProfile, primaryRole: 'teacher' })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      editedProfile.primaryRole === 'teacher'
                        ? darkMode 
                          ? 'border-orange-500 bg-orange-500/20' 
                          : 'border-orange-500 bg-orange-100'
                        : darkMode 
                          ? 'border-orange-800/30 hover:border-orange-700/50' 
                          : 'border-orange-200 hover:border-orange-300'
                    }`}
                  >
                    <BookOpen className={`w-6 h-6 mx-auto mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    <p className={`text-sm font-medium ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>Teacher</p>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Languages Section */}
          <div className={`p-6 rounded-2xl mb-8 ${
            darkMode 
              ? 'bg-orange-900/10 border border-orange-800/30' 
              : 'bg-white border border-orange-100 shadow-lg'
          }`}>
            <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
              darkMode ? 'text-orange-50' : 'text-gray-900'
            }`}>
              <Languages className="w-5 h-5" />
              Languages
            </h3>

            {/* Learning */}
            <div className="mb-6">
              <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                Currently Learning
              </h4>
              {!isEditing ? (
                <div className="flex flex-wrap gap-2">
                  <span className={`px-4 py-2 rounded-full border ${
                    darkMode 
                      ? 'bg-orange-500/20 border-orange-600/30 text-orange-200' 
                      : 'bg-orange-50 border-orange-200 text-orange-700'
                  }`}>
                    {profile.primaryLanguageToLearn} (Primary)
                  </span>
                  {profile.secondaryLanguageToLearn && (
                    <span className={`px-4 py-2 rounded-full border ${
                      darkMode 
                        ? 'bg-orange-900/20 border-orange-800/30 text-orange-300' 
                        : 'bg-orange-50/50 border-orange-100 text-gray-700'
                    }`}>
                      {profile.secondaryLanguageToLearn}
                    </span>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-sm mb-1 ${darkMode ? 'text-orange-200' : 'text-gray-600'}`}>
                      Primary *
                    </label>
                    <select
                      value={editedProfile.primaryLanguageToLearn}
                      onChange={(e) => setEditedProfile({ ...editedProfile, primaryLanguageToLearn: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none ${
                        darkMode 
                          ? 'bg-orange-900/20 border-orange-800/30 text-orange-50' 
                          : 'bg-orange-50 border-orange-200 text-gray-900'
                      }`}
                    >
                      {languages.map((lang) => (
                        <option key={lang} value={lang} className={darkMode ? 'bg-[#1a1410]' : 'bg-white'}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm mb-1 ${darkMode ? 'text-orange-200' : 'text-gray-600'}`}>
                      Secondary (Optional)
                    </label>
                    <select
                      value={editedProfile.secondaryLanguageToLearn || ''}
                      onChange={(e) => setEditedProfile({ ...editedProfile, secondaryLanguageToLearn: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border outline-none ${
                        darkMode 
                          ? 'bg-orange-900/20 border-orange-800/30 text-orange-50' 
                          : 'bg-orange-50 border-orange-200 text-gray-900'
                      }`}
                    >
                      <option value="">None</option>
                      {languages.map((lang) => (
                        <option key={lang} value={lang} className={darkMode ? 'bg-[#1a1410]' : 'bg-white'}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Known Languages */}
            <div>
              <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                Languages I Know & Can Teach
              </h4>
              {!isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {profile.languagesKnow.map((lang, i) => (
                    <span
                      key={i}
                      className={`px-4 py-2 rounded-full border flex items-center gap-2 ${
                        darkMode 
                          ? 'bg-green-900/20 border-green-800/30 text-green-300' 
                          : 'bg-green-50 border-green-200 text-green-700'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      {lang.language} • {lang.fluency}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {editedProfile.languagesKnow.map((lang, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3">
                      <select
                        value={lang.language}
                        onChange={(e) => {
                          const updated = [...editedProfile.languagesKnow];
                          updated[i].language = e.target.value;
                          setEditedProfile({ ...editedProfile, languagesKnow: updated });
                        }}
                        className={`px-4 py-3 rounded-xl border outline-none ${
                          darkMode 
                            ? 'bg-orange-900/20 border-orange-800/30 text-orange-50' 
                            : 'bg-orange-50 border-orange-200 text-gray-900'
                        }`}
                      >
                        <option value="">Select language</option>
                        {languages.map((l) => (
                          <option key={l} value={l} className={darkMode ? 'bg-[#1a1410]' : 'bg-white'}>
                            {l}
                          </option>
                        ))}
                      </select>
                      <select
                        value={lang.fluency}
                        onChange={(e) => {
                          const updated = [...editedProfile.languagesKnow];
                          updated[i].fluency = e.target.value;
                          setEditedProfile({ ...editedProfile, languagesKnow: updated });
                        }}
                        className={`px-4 py-3 rounded-xl border outline-none ${
                          darkMode 
                            ? 'bg-orange-900/20 border-orange-800/30 text-orange-50' 
                            : 'bg-orange-50 border-orange-200 text-gray-900'
                        }`}
                      >
                        <option value="">Select level</option>
                        {fluencyLevels.map((level) => (
                          <option key={level} value={level} className={darkMode ? 'bg-[#1a1410]' : 'bg-white'}>
                            {level}
                          </option>
                        ))}
                      </select>
                      {editedProfile.languagesKnow.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLanguage(i)}
                          className={`px-3 py-2 rounded-xl ${
                            darkMode 
                              ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' 
                              : 'bg-red-100 text-red-600 hover:bg-red-200'
                          }`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addLanguage}
                    className={`text-sm font-medium ${darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-700'}`}
                  >
                    + Add another language
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Account Actions */}
          <div className={`p-6 rounded-2xl ${
            darkMode 
              ? 'bg-orange-900/10 border border-orange-800/30' 
              : 'bg-white border border-orange-100 shadow-lg'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
              Account
            </h3>
            <div className="space-y-2">
              <button
                onClick={handleLogout}
                className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all ${
                  darkMode 
                    ? 'hover:bg-red-900/20 text-red-400' 
                    : 'hover:bg-red-50 text-red-600'
                }`}
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}