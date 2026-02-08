"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { 
  Mic, 
  Headphones,
  PenTool,
  BookOpen,
  Crown,
  Star,
  ChevronRight,
  Award,
  TrendingUp,
  Clock,
  Trophy,
  Users,
  CheckCircle,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { useDarkMode } from '@/lib/DarkModeContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Lab {
  id: string;
  title: string;
  description: string;
  icon: any;
  type: 'free' | 'premium';
  duration: string;
  exercises: number;
  gradient: string;
}

interface Mentor {
  _id: string;
  name: string;
  languages: string[];
  rating: number;
  reviewCount: number;
  pricePerReview: number;
  pricePerHour: number;
  tagline: string;
  responseTime: string;
}

interface ProgressStats {
  totalSessions: number;
  completedLabs: number;
  mentorReviews: number;
  streakDays: number;
  todaysPractice: number;
}

export default function PracticePage() {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Hindi");
  const [activeTab, setActiveTab] = useState<'labs' | 'mentors'>('labs');
  const [progress, setProgress] = useState<ProgressStats | null>(null);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // Available languages for practice
  const languages = [
    "Hindi", "English", "Spanish", "French", "German", 
    "Japanese", "Korean", "Mandarin", "Tamil", "Bengali"
  ];

  // Practice Labs - Real, hands-on exercises
  const labs: Lab[] = [
    {
      id: 'listening-lab',
      title: 'Listening Lab',
      description: 'Hear words/sentences → Write what you heard → Check accuracy',
      icon: Headphones,
      type: 'free',
      duration: '10-15 min',
      exercises: 20,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'pronunciation-recording',
      title: 'Pronunciation Practice',
      description: 'Record yourself saying words → Submit for mentor review',
      icon: Mic,
      type: 'free',
      duration: '5-10 min',
      exercises: 15,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 'meaning-match',
      title: 'Meaning Match',
      description: 'Hear a word → Choose correct meaning from 4 options',
      icon: BookOpen,
      type: 'free',
      duration: '8-12 min',
      exercises: 25,
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 'dictation-lab',
      title: 'Dictation Lab',
      description: 'Listen to full sentences → Type them out → Get scored',
      icon: PenTool,
      type: 'free',
      duration: '10-15 min',
      exercises: 10,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'sound-identification',
      title: 'Sound Recognition',
      description: 'Identify similar-sounding letters (ड vs ड़, त vs ट)',
      icon: Sparkles,
      type: 'free',
      duration: '5-8 min',
      exercises: 30,
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'mentor-review',
      title: 'Get Mentor Review',
      description: 'Submit your recordings → Get detailed feedback from experts',
      icon: Crown,
      type: 'premium',
      duration: '24 hrs',
      exercises: 1,
      gradient: 'from-violet-500 to-purple-600'
    }
  ];

  useEffect(() => {
    // Check authentication first
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    
    setIsAuthenticating(false);
    fetchProgress();
  }, []);

  useEffect(() => {
    if (activeTab === 'mentors') {
      fetchMentors();
    }
  }, [activeTab, selectedLanguage]);

  const fetchProgress = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/practice/progress`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setProgress(data.progress || {
          totalSessions: 0,
          completedLabs: 0,
          mentorReviews: 0,
          streakDays: 0,
          todaysPractice: 0
        });
      } else {
        setProgress({
          totalSessions: 0,
          completedLabs: 0,
          mentorReviews: 0,
          streakDays: 0,
          todaysPractice: 0
        });
      }
    } catch (error) {
      console.error("Fetch progress error:", error);
      setProgress({
        totalSessions: 0,
        completedLabs: 0,
        mentorReviews: 0,
        streakDays: 0,
        todaysPractice: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMentors = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/mentors?language=${selectedLanguage}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setMentors(data.mentors || []);
      }
    } catch (error) {
      console.error("Fetch mentors error:", error);
    }
  };

  const handleLabClick = (labId: string, isPremium: boolean) => {
    if (isPremium) {
      setActiveTab('mentors');
    } else {
      router.push(`/practice/session?lab=${labId}&language=${selectedLanguage}`);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading || isAuthenticating) {
    return (
      <div className={`pt-20 min-h-screen ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={darkMode ? 'text-orange-200' : 'text-gray-700'}>
              {isAuthenticating ? 'Checking authentication...' : 'Loading practice labs...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-20 min-h-screen ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"}`}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        
        {/* Hero Section */}
        <div className={`rounded-3xl p-8 ${darkMode ? "bg-linear-to-br from-orange-900/20 to-red-900/20 border border-orange-800/30" : "bg-linear-to-br from-orange-50 to-red-50 border border-orange-200"}`}>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? "text-orange-50" : "text-orange-950"}`}>
                🎙️ Practice Lab
              </h1>
              <p className={`text-lg ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                Hands-on exercises to improve listening, speaking, and comprehension
              </p>
            </div>
            
            {/* Language Selector */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                Practice Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={`px-4 py-2 rounded-xl border font-medium outline-none ${
                  darkMode 
                    ? "bg-orange-900/30 border-orange-800/30 text-orange-100" 
                    : "bg-white border-orange-300 text-orange-900"
                }`}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        {progress && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className={`rounded-2xl p-4 ${darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className={`w-5 h-5 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                <span className={`text-sm font-medium ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                  Streak
                </span>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                {progress.streakDays} days
              </p>
            </div>

            <div className={`rounded-2xl p-4 ${darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                <span className={`text-sm font-medium ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                  Labs Done
                </span>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                {progress.completedLabs}
              </p>
            </div>

            <div className={`rounded-2xl p-4 ${darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className={`w-5 h-5 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                <span className={`text-sm font-medium ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                  Reviews
                </span>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                {progress.mentorReviews}
              </p>
            </div>

            <div className={`rounded-2xl p-4 ${darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                <span className={`text-sm font-medium ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                  Sessions
                </span>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                {progress.totalSessions}
              </p>
            </div>

            <div className={`rounded-2xl p-4 ${darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                <Clock className={`w-5 h-5 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                <span className={`text-sm font-medium ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                  Today
                </span>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                {progress.todaysPractice} min
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 border-b" style={{ borderColor: darkMode ? 'rgba(251, 146, 60, 0.2)' : 'rgba(251, 146, 60, 0.3)' }}>
          <button
            onClick={() => setActiveTab('labs')}
            className={`px-6 py-3 font-semibold border-b-2 transition-all ${
              activeTab === 'labs'
                ? darkMode
                  ? "border-orange-500 text-orange-100"
                  : "border-orange-600 text-orange-900"
                : darkMode
                  ? "border-transparent text-orange-300/50 hover:text-orange-200"
                  : "border-transparent text-orange-600/50 hover:text-orange-800"
            }`}
          >
            Practice Labs
          </button>
          <button
            onClick={() => setActiveTab('mentors')}
            className={`px-6 py-3 font-semibold border-b-2 transition-all ${
              activeTab === 'mentors'
                ? darkMode
                  ? "border-orange-500 text-orange-100"
                  : "border-orange-600 text-orange-900"
                : darkMode
                  ? "border-transparent text-orange-300/50 hover:text-orange-200"
                  : "border-transparent text-orange-600/50 hover:text-orange-800"
            }`}
          >
            Expert Mentors
          </button>
        </div>

        {/* Labs Tab */}
        {activeTab === 'labs' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {labs.map((lab) => (
              <button
                key={lab.id}
                onClick={() => handleLabClick(lab.id, lab.type === 'premium')}
                className={`group text-left rounded-2xl p-6 border transition-all hover:scale-[1.02] ${
                  darkMode 
                    ? "bg-orange-900/10 border-orange-800/30 hover:border-orange-700/50 hover:shadow-xl hover:shadow-orange-900/20" 
                    : "bg-white border-orange-200 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-200/50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-linear-to-br ${lab.gradient}`}>
                    <lab.icon className="w-6 h-6 text-white" />
                  </div>
                  {lab.type === 'premium' && (
                    <div className={`px-2 py-1 rounded-lg flex items-center gap-1 ${
                      darkMode ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-700"
                    }`}>
                      <Crown className="w-3 h-3" />
                      <span className="text-xs font-medium">Premium</span>
                    </div>
                  )}
                </div>

                <h3 className={`text-lg font-bold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                  {lab.title}
                </h3>
                
                <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                  {lab.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className={`w-4 h-4 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                      <span className={darkMode ? "text-orange-200/70" : "text-orange-700/70"}>
                        {lab.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className={`w-4 h-4 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                      <span className={darkMode ? "text-orange-200/70" : "text-orange-700/70"}>
                        {lab.exercises} exercises
                      </span>
                    </div>
                  </div>
                  
                  <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                    darkMode ? "text-orange-300" : "text-orange-600"
                  }`} />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Mentors Tab */}
        {activeTab === 'mentors' && (
          <div>
            <div className={`rounded-2xl p-6 mb-6 ${
              darkMode ? "bg-purple-900/20 border border-purple-800/30" : "bg-purple-50 border border-purple-200"
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${darkMode ? "bg-purple-800/30" : "bg-purple-200"}`}>
                  <Crown className={`w-6 h-6 ${darkMode ? "text-purple-300" : "text-purple-700"}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-1 ${darkMode ? "text-purple-100" : "text-purple-900"}`}>
                    Get Expert Feedback
                  </h3>
                  <p className={`text-sm ${darkMode ? "text-purple-200/70" : "text-purple-700/70"}`}>
                    Submit your pronunciation recordings and get detailed, personalized feedback from certified language mentors within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {mentors.length === 0 ? (
              <div className={`rounded-2xl p-12 text-center ${
                darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200"
              }`}>
                <Users className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-orange-400/50" : "text-orange-600/50"}`} />
                <p className={`text-lg font-semibold mb-2 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                  No mentors found for {selectedLanguage}
                </p>
                <p className={`text-sm ${darkMode ? "text-orange-300/70" : "text-orange-600/70"}`}>
                  We're onboarding expert mentors. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {mentors.map((mentor) => (
                  <div
                    key={mentor._id}
                    className={`rounded-2xl p-6 border ${
                      darkMode 
                        ? "bg-orange-900/10 border-orange-800/30" 
                        : "bg-white border-orange-200"
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-bold text-xl shrink-0">
                        {getInitials(mentor.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-bold text-lg truncate ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                            {mentor.name}
                          </h3>
                          <Award className={`w-4 h-4 shrink-0 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                        </div>
                        <p className={`text-sm mb-2 ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                          {mentor.tagline}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className={`text-sm font-semibold ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                              {mentor.rating.toFixed(1)}
                            </span>
                          </div>
                          <span className={`text-sm ${darkMode ? "text-orange-300/50" : "text-orange-600/50"}`}>
                            ({mentor.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl mb-4 ${
                      darkMode ? "bg-orange-900/20" : "bg-orange-50"
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                          Recording Review
                        </span>
                        <span className={`text-lg font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                          ₹{mentor.pricePerReview}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                          Live 1-on-1 Session (1hr)
                        </span>
                        <span className={`text-lg font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                          ₹{mentor.pricePerHour}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Clock className={`w-4 h-4 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                      <span className={`text-sm ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                        Responds in {mentor.responseTime}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                        darkMode 
                          ? "bg-orange-900/30 text-orange-200 border border-orange-800/30 hover:bg-orange-900/50" 
                          : "bg-orange-100 text-orange-800 border border-orange-300 hover:bg-orange-200"
                      }`}>
                        Submit Recording
                      </button>
                      <button className="flex-1 py-2 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-medium hover:scale-[1.02] transition-all">
                        Book Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}