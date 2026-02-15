"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, Edit, Save, X, Camera, MapPin, Languages, 
  GraduationCap, Award, BookOpen, Star, ArrowLeft, MessageCircle,
  UserPlus, Clock, Check, UserCheck
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

interface MatchStatus {
  status: 'none' | 'pending_sent' | 'pending_received' | 'accepted';
  matchId?: string;
  chatId?: string;
}

export default function DynamicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { darkMode } = useDarkMode();
  
  const userId = params.userId as string;
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [matchStatus, setMatchStatus] = useState<MatchStatus>({ status: 'none' });
  const [actionLoading, setActionLoading] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const myUserId = localStorage.getItem("userId");
    
    if (!token) {
      router.push("/auth/login");
      return;
    }

    setIsOwnProfile(userId === myUserId);

    // Fetch profile AND match status together
    Promise.all([
      fetch(`${API_URL}/auth/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${API_URL}/matches/status/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ])
      .then(async ([profileRes, matchRes]) => {
        if (!profileRes.ok) throw new Error("Failed to fetch profile");
        
        const profileData = await profileRes.json();
        setProfile(profileData.user);
        
        if (matchRes.ok) {
          const matchData = await matchRes.json();
          console.log("Match status:", matchData);
          setMatchStatus({
            status: matchData.status,
            matchId: matchData.matchId,
            chatId: matchData.chatId,
          });
        }
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [userId, router]);

  const handleSendMatchRequest = async () => {
    const token = localStorage.getItem("token");
    if (!token || actionLoading) return;
    
    setActionLoading(true);
    
    try {
      const res = await fetch(`${API_URL}/matches/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId: userId }),
      });

      const data = await res.json();

      if (res.ok) {
        setMatchStatus({ 
          status: 'pending_sent',
          matchId: data.matchId 
        });
        alert("Match request sent! ✅");
      } else {
        alert(data.message || data.error || "Failed to send request");
      }
    } catch (error) {
      console.error("Match request error:", error);
      alert("Failed to send match request");
    } finally {
      setActionLoading(false);
    }
  };

  const handleMatchAction = async (action: 'accept' | 'reject') => {
    const token = localStorage.getItem("token");
    if (!token || !matchStatus.matchId || actionLoading) return;
    
    setActionLoading(true);
    
    try {
      const url = `${API_URL}/matches/${matchStatus.matchId}/${action}`;
      console.log("Calling:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || `Failed to ${action} match`);
      }

      const data = await response.json();
      console.log("Action response:", data);

      if (action === 'accept') {
        // Extract chatId safely
        const chatId = typeof data.chatId === 'string' 
          ? data.chatId 
          : data.chatId?._id || data.chat?._id;

        setMatchStatus({ 
          status: 'accepted',
          matchId: matchStatus.matchId,
          chatId: chatId
        });

        alert("Match accepted! 🎉");
        
        // Redirect to chat if chatId available
        if (chatId) {
          setTimeout(() => {
            router.push(`/chats?chat=${chatId}`);
          }, 1000);
        }
      } else {
        // Reject
        setMatchStatus({ status: 'none' });
        alert("Match request rejected");
      }

    } catch (error) {
      console.error(`${action} error:`, error);
      alert(error instanceof Error ? error.message : `Failed to ${action} match`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (matchStatus.chatId) {
      router.push(`/chats?chat=${matchStatus.chatId}`);
    } else {
      alert("Chat not available yet");
    }
  };

  // Render action button based on match status
  const renderActionButton = () => {
    const { status } = matchStatus;

    // ✅ ACCEPTED - Show Message Button
    if (status === 'accepted') {
      return (
        <button
          onClick={handleSendMessage}
          className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2 mt-4 sm:mt-0"
        >
          <MessageCircle className="w-4 h-4" />
          Send Message
        </button>
      );
    }

    // ⏳ PENDING SENT - Request Sent (disabled)
    if (status === 'pending_sent') {
      return (
        <button
          disabled
          className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 mt-4 sm:mt-0 cursor-not-allowed ${
            darkMode
              ? 'bg-orange-900/30 text-orange-400 border border-orange-800/30'
              : 'bg-gray-100 text-gray-500 border border-gray-300'
          }`}
        >
          <Clock className="w-4 h-4" />
          Request Sent
        </button>
      );
    }

    // 📨 PENDING RECEIVED - Show Accept/Reject buttons
    if (status === 'pending_received') {
      return (
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button
            onClick={() => handleMatchAction('accept')}
            disabled={actionLoading}
            className="flex-1 px-6 py-3 rounded-xl bg-linear-to-r from-green-500 to-green-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {actionLoading ? "..." : (
              <>
                <Check className="w-4 h-4" />
                Accept
              </>
            )}
          </button>
          <button
            onClick={() => handleMatchAction('reject')}
            disabled={actionLoading}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
              darkMode 
                ? "bg-red-900/30 text-red-300 hover:bg-red-900/50 border border-red-800/30" 
                : "bg-red-100 text-red-700 hover:bg-red-200 border border-red-200"
            }`}
          >
            {actionLoading ? "..." : (
              <>
                <X className="w-4 h-4" />
                Reject
              </>
            )}
          </button>
        </div>
      );
    }

    // ➕ NONE - Send Match Request
    return (
      <button
        onClick={handleSendMatchRequest}
        disabled={actionLoading}
        className="px-6 py-3 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2 mt-4 sm:mt-0 disabled:opacity-50"
      >
        {actionLoading ? "Sending..." : (
          <>
            <UserPlus className="w-4 h-4" />
            Send Match Request
          </>
        )}
      </button>
    );
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
              {/* Profile Photo & Action Button */}
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

                {/* 🎯 CONDITIONAL ACTION BUTTON */}
                {renderActionButton()}
              </div>

              {/* Name & Bio */}
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