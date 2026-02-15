"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, Edit, Save, X, Camera, MapPin, Languages, 
  GraduationCap, Award, BookOpen, Star, ArrowLeft, MessageCircle
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useDarkMode } from '@/lib/DarkModeContext';

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
}

export default function DynamicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { darkMode } = useDarkMode();
  
  const userId = params.userId as string;
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const myUserId = localStorage.getItem("userId");
    
    if (!token) {
      router.push("/auth/login");
      return;
    }

    // Check if viewing own profile
    setIsOwnProfile(userId === myUserId);

    // Fetch profile
    fetch(`${API_URL}/auth/user/${userId}`, {
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Profile fetch error:", error);
        setLoading(false);
      });
  }, [userId, router]);

  const handleSendMessage = async () => {
    // Logic to create/find chat and navigate
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`${API_URL}/chats/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otherUserId: userId }),
      });

      const data = await res.json();
      router.push(`/chats?chat=${data.chatId}`);
    } catch (error) {
      console.error("Start chat error:", error);
      alert("Failed to start chat");
    }
  };

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

  if (!profile) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
        <div className="text-center">
          <p className={darkMode ? 'text-orange-200' : 'text-gray-700'}>Profile not found</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // If it's own profile, redirect to /profile
  if (isOwnProfile) {
    router.push('/profile');
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
      <Navbar />

      <div className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className={`mb-6 flex items-center gap-2 text-sm font-medium ${
              darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

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
              {/* Profile Photo & Message Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 mb-6">
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

                {/* Message Button */}
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2 mt-4 sm:mt-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send Message
                </button>
              </div>

              {/* Name & Bio (Read-only) */}
              <div className="mb-6">
                <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {profile.name}
                </h1>
                <p className={`text-sm mb-3 ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                  {profile.email}
                </p>
                <p className={`text-base leading-relaxed ${darkMode ? 'text-orange-200/80' : 'text-gray-700'}`}>
                  {profile.bio || <span className={`italic ${darkMode ? 'text-orange-300/50' : 'text-gray-400'}`}>No bio added yet</span>}
                </p>
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
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>City</span>
                  <span className={`font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    {profile.city || <span className={`italic ${darkMode ? 'text-orange-300/50' : 'text-gray-400'}`}>Not specified</span>}
                  </span>
                </div>
              </div>
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
            </div>

            {/* Known Languages */}
            <div>
              <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                Languages Can Teach
              </h4>
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
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}