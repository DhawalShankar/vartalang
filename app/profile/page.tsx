"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  User, Edit, Save, X, Camera, MapPin, Languages, 
  GraduationCap, Award, BookOpen, Heart, Star,
  Settings, LogOut, Shield, Bell
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

interface LanguageKnown {
  language: string;
  fluency: string;
}

interface UserProfile {
  name: string;
  email: string;
  profilePhoto: string;
  bio: string;
  state: string;
  city: string;
  primaryLanguageToLearn: string;
  secondaryLanguageToLearn: string;
  languagesKnow: LanguageKnown[];
  primaryRole: 'learner' | 'teacher';
  joinedDate: string;
  totalConnections: number;
  coursesCompleted: number;
  hoursLearned: number;
}

export default function ProfilePage() {
  const { darkMode } = useDarkMode();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    profilePhoto: '',
    bio: 'Passionate about learning languages and connecting with people across India. Love sharing my knowledge of Hindi and Tamil.',
    state: 'Karnataka',
    city: 'Bangalore',
    primaryLanguageToLearn: 'Telugu',
    secondaryLanguageToLearn: 'Malayalam',
    languagesKnow: [
      { language: 'Hindi', fluency: 'Native' },
      { language: 'Tamil', fluency: 'Advanced' },
      { language: 'English', fluency: 'Advanced' }
    ],
    primaryRole: 'learner',
    joinedDate: 'January 2024',
    totalConnections: 12,
    coursesCompleted: 3,
    hoursLearned: 45
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const languages = [
    "Hindi", "English", "Tamil", "Telugu", "Kannada", "Malayalam",
    "Bengali", "Gujarati", "Punjabi", "Marathi", "Odia", "Assamese"
  ];

  const indianStates = [
    "Andhra Pradesh", "Karnataka", "Kerala", "Tamil Nadu", "Telangana",
    "Maharashtra", "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal",
    "Delhi", "Punjab", "Haryana", "Outside India"
  ];

  const fluencyLevels = ["Beginner", "Intermediate", "Advanced", "Native"];

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />
      
      {/* Space for Global Header */}
      <div className="h-20"></div>

      <div className="py-12 px-4">
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
                    {profile.profilePhoto ? (
                      <img src={profile.profilePhoto} alt={profile.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className={`w-16 h-16 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-2 right-2 p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex gap-2 mt-4 sm:mt-0">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </button>
                      <button className={`px-4 py-3 rounded-xl border transition-all ${
                        darkMode 
                          ? 'border-orange-800/30 text-orange-200 hover:bg-orange-900/20' 
                          : 'border-orange-200 text-gray-700 hover:bg-orange-50'
                      }`}>
                        <Settings className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className={`px-6 py-3 rounded-xl border font-semibold transition-all flex items-center gap-2 ${
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
                    </p>
                    <p className={`text-base leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                      {profile.bio}
                    </p>
                  </>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-2xl font-bold outline-none ${
                        darkMode 
                          ? 'bg-orange-900/20 border-orange-800/30 text-orange-50' 
                          : 'bg-orange-50 border-orange-200 text-gray-900'
                      }`}
                      placeholder="Your Name"
                    />
                    <textarea
                      rows={3}
                      value={editedProfile.bio}
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

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className={`p-4 rounded-xl text-center ${
                  darkMode ? 'bg-orange-900/20' : 'bg-orange-50'
                }`}>
                  <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    {profile.totalConnections}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                    Connections
                  </div>
                </div>
                <div className={`p-4 rounded-xl text-center ${
                  darkMode ? 'bg-orange-900/20' : 'bg-orange-50'
                }`}>
                  <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    {profile.coursesCompleted}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                    Courses Done
                  </div>
                </div>
                <div className={`p-4 rounded-xl text-center ${
                  darkMode ? 'bg-orange-900/20' : 'bg-orange-50'
                }`}>
                  <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                    {profile.hoursLearned}h
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>
                    Hours Learned
                  </div>
                </div>
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
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-orange-200' : 'text-gray-700'}`}>
                      City (Optional)
                    </label>
                    <input
                      type="text"
                      value={editedProfile.city}
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
                  <select
                    value={editedProfile.primaryLanguageToLearn}
                    onChange={(e) => setEditedProfile({ ...editedProfile, primaryLanguageToLearn: e.target.value })}
                    className={`px-4 py-3 rounded-xl border outline-none ${
                      darkMode 
                        ? 'bg-orange-900/20 border-orange-800/30 text-orange-50' 
                        : 'bg-orange-50 border-orange-200 text-gray-900'
                    }`}
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>{lang} (Primary)</option>
                    ))}
                  </select>
                  <select
                    value={editedProfile.secondaryLanguageToLearn}
                    onChange={(e) => setEditedProfile({ ...editedProfile, secondaryLanguageToLearn: e.target.value })}
                    className={`px-4 py-3 rounded-xl border outline-none ${
                      darkMode 
                        ? 'bg-orange-900/20 border-orange-800/30 text-orange-50' 
                        : 'bg-orange-50 border-orange-200 text-gray-900'
                    }`}
                  >
                    <option value="">Secondary (Optional)</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
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
                    <div key={i} className="grid grid-cols-2 gap-3">
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
                        {languages.map((l) => (
                          <option key={l} value={l}>{l}</option>
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
                        {fluencyLevels.map((level) => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                  ))}
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
              <button className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all ${
                darkMode 
                  ? 'hover:bg-orange-900/20 text-orange-200' 
                  : 'hover:bg-orange-50 text-gray-700'
              }`}>
                <Bell className="w-5 h-5" />
                Notification Preferences
              </button>
              <button className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all ${
                darkMode 
                  ? 'hover:bg-orange-900/20 text-orange-200' 
                  : 'hover:bg-orange-50 text-gray-700'
              }`}>
                <Shield className="w-5 h-5" />
                Privacy & Safety
              </button>
              <button className={`w-full px-4 py-3 rounded-xl text-left flex items-center gap-3 transition-all ${
                darkMode 
                  ? 'hover:bg-red-900/20 text-red-400' 
                  : 'hover:bg-red-50 text-red-600'
              }`}>
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