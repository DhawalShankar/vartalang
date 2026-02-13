"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from '@/components/layout/Footer';
import { 
  Users, 
  MapPin,
  X,
  Heart,
  Loader2
} from "lucide-react";
import { useDarkMode } from '@/lib/DarkModeContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Match {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  city?: string;
  state: string;
  country: string;
  primaryLanguageToLearn: string;
  secondaryLanguageToLearn?: string;
  languagesKnow: Array<{ language: string; fluency: string }>;
  primaryRole: 'learner' | 'teacher';
  matchType?: 'primary' | 'secondary';
}

export default function MatchesPage() {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/matches/potential`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch matches");

      const data = await res.json();
      setMatches(data.matches);
      setLoading(false);
    } catch (error) {
      console.error("Fetch matches error:", error);
      setLoading(false);
    }
  };

  const handleSkip = async (matchId: string) => {
    setProcessingId(matchId);
    const token = localStorage.getItem("token");

    try {
      await fetch(`${API_URL}/matches/swipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          targetUserId: matchId,
          action: 'skip',
        }),
      });

      // Remove from list
      setMatches(matches.filter(m => m._id !== matchId));
      setProcessingId(null);
    } catch (error) {
      console.error("Skip error:", error);
      setProcessingId(null);
    }
  };

  const handleSendRequest = async (match: Match) => {
    setProcessingId(match._id);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/matches/swipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          targetUserId: match._id,
          action: 'like',
        }),
      });

      const data = await res.json();
      console.log("Response:", data);

      // Check if mutual match
      if (data.matched && data.chatId) {
        setSuccessMessage(`🎉 It's a match with ${match.name}!`);
        setTimeout(() => {
          router.push(`/chats?chat=${data.chatId}`);
        }, 1500);
        return;
      }

      // Success - request sent
      setSuccessMessage("Match request sent! 💌");
      setMatches(matches.filter(m => m._id !== match._id));
      
      setTimeout(() => {
        setSuccessMessage(null);
        setProcessingId(null);
      }, 2000);

    } catch (error) {
      console.error("Send request error:", error);
      setErrorMessage("Failed to send request");
      
      setTimeout(() => {
        setErrorMessage(null);
        setProcessingId(null);
      }, 2000);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"}`}>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 pt-24 flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-orange-500" />
            <p className={darkMode ? 'text-orange-200' : 'text-gray-700'}>Finding your matches...</p>
          </div>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"}`}>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 pt-24 flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <Users className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-orange-400/50" : "text-orange-600/50"}`} />
            <h2 className={`text-xl font-bold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
              No More Matches
            </h2>
            <p className={`text-sm mb-6 ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
              Check back later for new language partners
            </p>
            <button
              onClick={fetchMatches}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transition-all"
            >
              Refresh Matches
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"}`}>
      <Navbar />
      
      {/* Toast Messages */}
      {errorMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg bg-red-500 text-white shadow-lg animate-slide-down">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg bg-green-500 text-white shadow-lg animate-slide-down">
          {successMessage}
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-3 ${darkMode ? "text-orange-50" : "text-orange-950"}`}>
            Find Your Language Partner
          </h1>
          <p className={`text-base ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
            {matches.length} potential {matches.length === 1 ? 'match' : 'matches'} found
          </p>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div
              key={match._id}
              className={`rounded-xl p-6 transition-all ${
                darkMode 
                  ? "bg-orange-900/10 border border-orange-800/30 hover:border-orange-700/50" 
                  : "bg-white border border-orange-200 hover:border-orange-300 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Match Type Badge */}
              {match.matchType && (
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    match.matchType === "primary"
                      ? darkMode 
                        ? "bg-green-900/30 text-green-400 border border-green-800/30" 
                        : "bg-green-100 text-green-700 border border-green-300"
                      : darkMode 
                        ? "bg-blue-900/30 text-blue-400 border border-blue-800/30" 
                        : "bg-blue-100 text-blue-700 border border-blue-300"
                  }`}>
                    {match.matchType === "primary" ? "Perfect Match" : "Good Match"}
                  </span>
                </div>
              )}

              {/* Profile */}
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                  {getInitials(match.name)}
                </div>
                <h3 className={`text-lg font-bold mb-1 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                  {match.name}
                </h3>
                <div className={`flex items-center justify-center gap-1 text-xs ${darkMode ? "text-orange-300/70" : "text-orange-600/70"}`}>
                  <MapPin className="w-3 h-3" />
                  <span>{match.city ? `${match.city}, ` : ''}{match.state}</span>
                </div>
              </div>

              {/* Bio */}
              {match.bio && (
                <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? "text-orange-200/70" : "text-gray-600"}`}>
                  {match.bio}
                </p>
              )}

              {/* Languages */}
              <div className="space-y-3 mb-4">
                <div>
                  <p className={`text-xs font-semibold mb-2 ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
                    Can Teach:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {match.languagesKnow.map((lang, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded-md text-xs ${
                          darkMode 
                            ? "bg-green-900/30 text-green-400" 
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {lang.language}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={`text-xs font-semibold mb-2 ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
                    Wants to Learn:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        darkMode 
                          ? "bg-blue-900/30 text-blue-400" 
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {match.primaryLanguageToLearn}
                    </span>
                    {match.secondaryLanguageToLearn && (
                      <span
                        className={`px-2 py-1 rounded-md text-xs ${
                          darkMode 
                            ? "bg-blue-900/30 text-blue-400" 
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {match.secondaryLanguageToLearn}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleSkip(match._id)}
                  disabled={processingId === match._id}
                  className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    processingId === match._id
                      ? "opacity-50 cursor-not-allowed"
                      : darkMode 
                        ? "bg-red-900/20 text-red-400 hover:bg-red-900/30 border border-red-800/30" 
                        : "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                  }`}
                >
                  {processingId === match._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <X className="w-4 h-4" />
                      <span className="text-sm font-medium">Pass</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleSendRequest(match)}
                  disabled={processingId === match._id}
                  className={`flex-1 py-2.5 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white flex items-center justify-center gap-2 transition-all ${
                    processingId === match._id
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-lg"
                  }`}
                >
                  {processingId === match._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Heart className="w-4 h-4" />
                      <span className="text-sm font-medium">Connect</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}