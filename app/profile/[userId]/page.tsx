"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, MapPin, Languages, 
  GraduationCap, Award, BookOpen, Star, ArrowLeft, Calendar
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

    setIsOwnProfile(userId === myUserId);

    fetch(`${API_URL}/auth/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (profileRes) => {
        if (!profileRes.ok) throw new Error("Failed to fetch profile");
        
        const profileData = await profileRes.json();
        setProfile(profileData.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [userId, router]);

  const getMemberSince = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
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

  if (isOwnProfile) {
    router.push('/profile');
    return null;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#1a1410]' : 'bg-[#FFF9F5]'}`}>
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
            {/* Beautiful Pattern Cover */}
            <div className="relative h-48 overflow-hidden">
              {/* Base gradient */}
              <div className={`absolute inset-0 ${
                darkMode 
                  ? 'bg-linear-to-br from-orange-900/50 via-red-800/40 to-orange-800/50' 
                  : 'bg-linear-to-br from-orange-200 via-red-100 to-orange-100'
              }`}></div>
              
              {/* Geometric pattern overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1.5" fill="currentColor" className={darkMode ? 'text-orange-400' : 'text-orange-600'} />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Decorative shapes */}
              <div className={`absolute top-10 right-20 w-32 h-32 rounded-full ${
                darkMode ? 'bg-orange-500/10' : 'bg-white/30'
              }`}></div>
              <div className={`absolute -bottom-10 left-10 w-40 h-40 rounded-full ${
                darkMode ? 'bg-red-500/10' : 'bg-white/40'
              }`}></div>
            </div>

            <div className="px-6 pb-8">
              {/* Centered Profile Photo */}
              <div className="flex flex-col items-center -mt-20 mb-6">
                <div className={`w-36 h-36 rounded-full border-4 overflow-hidden ${
                  darkMode 
                    ? 'border-[#1a1410] bg-orange-900/30' 
                    : 'border-white bg-orange-50'
                } shadow-2xl`}>
                  {profile.profilePhoto ? (
                    <img src={profile.profilePhoto} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${
                      darkMode ? 'bg-linear-to-br from-orange-900/40 to-red-900/40' : 'bg-linear-to-br from-orange-100 to-red-100'
                    }`}>
                      <User className={`w-20 h-20 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    </div>
                  )}
                </div>

                {/* Member Since Badge */}
                <div className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  darkMode 
                    ? 'bg-orange-900/30 text-orange-300 border border-orange-800/30' 
                    : 'bg-orange-50 text-orange-700 border border-orange-200'
                }`}>
                  <Calendar className="w-4 h-4" />
                  Member since {getMemberSince(profile.createdAt)}
                </div>
              </div>

              {/* Name & Bio */}
              <div className="mb-6 text-center space-y-3">
                <h1 className={`text-4xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  {profile.name}
                </h1>
                
                <p className={`text-sm ${darkMode ? 'text-orange-300/70' : 'text-gray-500'}`}>
                  {profile.email}
                </p>
                
                <div className={`max-w-2xl mx-auto p-4 rounded-xl ${
                  darkMode ? 'bg-orange-900/20' : 'bg-orange-50/50'
                }`}>
                  <p className={`text-base leading-relaxed ${darkMode ? 'text-orange-200/90' : 'text-gray-700'}`}>
                    {profile.bio || (
                      <span className={`italic ${darkMode ? 'text-orange-300/50' : 'text-gray-400'}`}>
                        No bio added yet
                      </span>
                    )}
                  </p>
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
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl ${
                  darkMode ? 'bg-orange-900/30' : 'bg-orange-100'
                }`}>
                  <MapPin className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  Location
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  darkMode ? 'bg-orange-900/20' : 'bg-orange-50/50'
                }`}>
                  <span className={`text-sm font-medium ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>Country</span>
                  <span className={`font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    {profile.country}
                  </span>
                </div>
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  darkMode ? 'bg-orange-900/20' : 'bg-orange-50/50'
                }`}>
                  <span className={`text-sm font-medium ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>State</span>
                  <span className={`font-semibold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                    {profile.state}
                  </span>
                </div>
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  darkMode ? 'bg-orange-900/20' : 'bg-orange-50/50'
                }`}>
                  <span className={`text-sm font-medium ${darkMode ? 'text-orange-300/70' : 'text-gray-600'}`}>City</span>
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
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl ${
                  darkMode ? 'bg-orange-900/30' : 'bg-orange-100'
                }`}>
                  <Award className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                  Primary Role
                </h3>
              </div>
              
              <div className={`p-5 rounded-xl ${
                darkMode ? 'bg-linear-to-br from-orange-900/30 to-red-900/20' : 'bg-linear-to-br from-orange-50 to-red-50'
              }`}>
                <div className="flex items-center gap-4">
                  {profile.primaryRole === 'learner' ? (
                    <>
                      <div className={`p-3 rounded-xl ${
                        darkMode ? 'bg-orange-500/20' : 'bg-orange-200'
                      }`}>
                        <GraduationCap className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                      </div>
                      <div>
                        <div className={`font-bold text-lg ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                          Primary Learner
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                          Here to learn new languages
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`p-3 rounded-xl ${
                        darkMode ? 'bg-orange-500/20' : 'bg-orange-200'
                      }`}>
                        <BookOpen className={`w-8 h-8 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                      </div>
                      <div>
                        <div className={`font-bold text-lg ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                          Primary Teacher
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-orange-200/70' : 'text-gray-600'}`}>
                          Here to teach languages
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
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-xl ${
                darkMode ? 'bg-orange-900/30' : 'bg-orange-100'
              }`}>
                <Languages className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-orange-50' : 'text-gray-900'}`}>
                Languages
              </h3>
            </div>

            {/* Learning */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-1 h-6 rounded-full ${
                  darkMode ? 'bg-orange-500' : 'bg-orange-600'
                }`}></div>
                <h4 className={`text-sm font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                  Currently Learning
                </h4>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className={`px-5 py-2.5 rounded-full border-2 font-semibold ${
                  darkMode 
                    ? 'bg-orange-500/20 border-orange-500/40 text-orange-200' 
                    : 'bg-orange-100 border-orange-300 text-orange-700'
                }`}>
                  {profile.primaryLanguageToLearn} 
                  <span className="ml-2 text-xs opacity-75">(Primary)</span>
                </span>
                {profile.secondaryLanguageToLearn && (
                  <span className={`px-5 py-2.5 rounded-full border-2 font-semibold ${
                    darkMode 
                      ? 'bg-orange-900/20 border-orange-800/30 text-orange-300' 
                      : 'bg-orange-50 border-orange-200 text-gray-700'
                  }`}>
                    {profile.secondaryLanguageToLearn}
                  </span>
                )}
              </div>
            </div>

            {/* Known Languages */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-1 h-6 rounded-full ${
                  darkMode ? 'bg-green-500' : 'bg-green-600'
                }`}></div>
                <h4 className={`text-sm font-semibold ${darkMode ? 'text-orange-300' : 'text-gray-700'}`}>
                  Languages Can Teach
                </h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {profile.languagesKnow.map((lang, i) => (
                  <span
                    key={i}
                    className={`px-5 py-2.5 rounded-full border-2 flex items-center gap-2 font-semibold ${
                      darkMode 
                        ? 'bg-green-900/20 border-green-700/30 text-green-300' 
                        : 'bg-green-50 border-green-300 text-green-700'
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                    {lang.language}
                    <span className="ml-1 text-xs opacity-75">• {lang.fluency}</span>
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