"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from '@/components/layout/Footer';
import { 
  Users, 
  MapPin,
  Info,
  ArrowLeft,
  ChevronRight,
  X,
  Heart
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Swipe state
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchMatches();
  }, []);

  useEffect(() => {
    if (showDetails || animating) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleSwipe('right');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleSwipe('left');
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setShowDetails(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, showDetails, animating]);

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

  const handleSwipe = async (swipeDirection: 'left' | 'right') => {
    if (!currentMatch || animating) return;

    setShowDetails(false);

    // If swiping left (skip)
    if (swipeDirection === 'left') {
      setAnimating(true);
      setDirection(swipeDirection);

      const token = localStorage.getItem("token");
      try {
        await fetch(`${API_URL}/matches/swipe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            targetUserId: currentMatch._id,
            action: 'skip',
          }),
        });
      } catch (error) {
        console.error("❌ Skip error:", error);
      }
      
      setTimeout(() => {
        if (currentIndex < matches.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
        setDirection(null);
        setAnimating(false);
      }, 300);
      return;
    }

    const token = localStorage.getItem("token");
  
  try {
    const swipeRes = await fetch(`${API_URL}/matches/swipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        targetUserId: currentMatch._id,
        action: 'like',
      }),
    });

    // ✅ FIX 1: Parse response FIRST (before checking ok)
    const swipeData = await swipeRes.json();
    console.log("🎯 Swipe response:", swipeData);

    // ✅ FIX 2: Handle "already swiped" gracefully - just skip to next
    if (swipeData.error === "You already swiped on this user" || 
        swipeData.error === "You already interacted with this user") {
      console.log("⏭️ Already swiped, moving to next card");
      setAnimating(true);
      setDirection('right');
      setTimeout(() => {
        if (currentIndex < matches.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
        setDirection(null);
        setAnimating(false);
      }, 300);
      return;
    }

    // ✅ FIX 3: NOW check for other errors
    if (!swipeRes.ok) {
      throw new Error(swipeData.error || "Failed to process swipe");
    }

    // ✅ SUCCESS - Check if mutual match
    if (swipeData.matched && swipeData.chatId) {
      // MUTUAL MATCH! Redirect to chat
      console.log("🎉 MUTUAL MATCH! Redirecting to chat:", swipeData.chatId);
      setSuccessMessage(`It's a match with ${currentMatch.name}! 🎉`);
      
      setTimeout(() => {
        router.push(`/chats?chat=${swipeData.chatId}`);
      }, 1500);
    } else {
      // NOT mutual - notification sent
      console.log("💌 Match request sent");
      setSuccessMessage("Match request sent! 💌");
      
      // Animate card away
      setAnimating(true);
      setDirection('right');
      
      setTimeout(() => {
        if (currentIndex < matches.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
        setDirection(null);
        setAnimating(false);
        setSuccessMessage(null);
      }, 1500);
    }

  } catch (error) {
    console.error("❌ Swipe error:", error);
    setErrorMessage(error instanceof Error ? error.message : "Failed to process swipe");
    
    // Still move to next card on error
    setAnimating(true);
    setDirection('right');
    
    setTimeout(() => {
      if (currentIndex < matches.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
      setDirection(null);
      setAnimating(false);
      setErrorMessage(null);
    }, 2000);
  }
};

  const handleNext = async () => {
    if (currentIndex < matches.length - 1 && !animating) {
      const token = localStorage.getItem("token");
      try {
        await fetch(`${API_URL}/matches/swipe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            targetUserId: currentMatch._id,
            action: 'skip',
          }),
        });
      } catch (error) {
        console.error("❌ Skip error:", error);
      }

      setDirection('left');
      setShowDetails(false);
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setDirection(null);
        setAnimating(false);
      }, 300);
    }
  };

  const handlePointerStart = (e: React.PointerEvent) => {
    if (showDetails || animating) return;
    e.preventDefault();
    
    setTouchStart({ x: e.clientX, y: e.clientY });
    setTouchEnd({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || showDetails || animating) return;
    
    setTouchEnd({ x: e.clientX, y: e.clientY });
    
    const deltaX = e.clientX - touchStart.x;
    const deltaY = e.clientY - touchStart.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handlePointerEnd = () => {
    if (!isDragging || showDetails || animating) return;
    
    setIsDragging(false);
    
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 100) {
      if (deltaX > 0) {
        handleSwipe('right');
      } else {
        handleSwipe('left');
      }
    }
    
    setDragOffset({ x: 0, y: 0 });
  };

  const getCardTransform = () => {
    if (direction === 'left') return 'translateX(-120%) rotate(-20deg)';
    if (direction === 'right') return 'translateX(120%) rotate(20deg)';
    if (isDragging && dragOffset.x !== 0) {
      const rotation = dragOffset.x / 20;
      return `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`;
    }
    return 'translateX(0) rotate(0)';
  };

  const getCardOpacity = () => {
    if (direction) return 0;
    if (isDragging && Math.abs(dragOffset.x) > 50) {
      return 1 - Math.abs(dragOffset.x) / 300;
    }
    return 1;
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
        <div className="max-w-2xl mx-auto px-4 pt-24 flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={darkMode ? 'text-orange-200' : 'text-gray-700'}>Finding your matches...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentMatch = matches[currentIndex];

  if (!currentMatch || currentIndex >= matches.length) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"}`}>
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 pt-24 flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <Users className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-orange-400/50" : "text-orange-600/50"}`} />
            <h2 className={`text-xl font-bold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
              No More Matches
            </h2>
            <p className={`text-sm mb-6 ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
              Check back later for new language partners
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                fetchMatches();
              }}
              className="px-6 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold active:scale-95 transition-all"
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
      
      {/* Error Toast */}
      {errorMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-lg bg-red-500 text-white shadow-lg animate-slide-down">
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Success Toast */}
      {successMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-lg bg-green-500 text-white shadow-lg animate-slide-down">
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}
      
      <div className="max-w-2xl mx-auto px-4 pt-24 pb-8">
        
        {/* Header */}
        <div className="text-center pt-10 mb-6">
          <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${darkMode ? "text-orange-50" : "text-orange-950"}`}>
            Find Your Language Partner
          </h1>
          <p className={`text-sm ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
            {isMobile ? "Swipe right to match • Swipe left to pass" : "← → Arrow keys • Enter for details"}
          </p>
          <div className={`inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full ${
            darkMode ? "bg-orange-900/20 border border-orange-800/30" : "bg-orange-100 border border-orange-200"
          }`}>
            <Info className="w-4 h-4 text-orange-500" />
            <span className={`text-sm ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
              {currentIndex + 1} of {matches.length}
            </span>
          </div>
        </div>

        {/* Swipe indicators - Mobile only */}
        {isMobile && isDragging && (
          <>
            <div 
              className="fixed left-8 top-1/2 -translate-y-1/2 z-50 transition-opacity"
              style={{ opacity: dragOffset.x < -50 ? 1 : 0 }}
            >
              <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-2xl">
                <X className="w-10 h-10 text-white" />
              </div>
            </div>
            <div 
              className="fixed right-8 top-1/2 -translate-y-1/2 z-50 transition-opacity"
              style={{ opacity: dragOffset.x > 50 ? 1 : 0 }}
            >
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-2xl">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
            </div>
          </>
        )}

        {/* Card - Simple View */}
        {!showDetails ? (
          <div
            ref={cardRef}
            onPointerDown={handlePointerStart}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onClick={(e) => {
              const totalDrag = Math.sqrt(dragOffset.x ** 2 + dragOffset.y ** 2);
              if (!isDragging && !animating && totalDrag < 10) {
                setShowDetails(true);
              }
            }}
            className={`rounded-xl p-8 mb-6 cursor-pointer touch-none select-none ${
              darkMode 
                ? "bg-orange-900/10 border border-orange-800/30" 
                : "bg-white border border-orange-200 shadow-xl"
            } ${animating ? 'pointer-events-none' : ''}`}
            style={{
              transform: getCardTransform(),
              opacity: getCardOpacity(),
              transition: isDragging ? 'none' : 'all 0.3s ease-out'
            }}
          >
            {/* Match type badge */}
            {currentMatch.matchType && (
              <div className="mb-6">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  currentMatch.matchType === "primary"
                    ? darkMode 
                      ? "bg-green-900/30 text-green-400 border border-green-800/30" 
                      : "bg-green-100 text-green-700 border border-green-300"
                    : darkMode 
                      ? "bg-blue-900/30 text-blue-400 border border-blue-800/30" 
                      : "bg-blue-100 text-blue-700 border border-blue-300"
                }`}>
                  {currentMatch.matchType === "primary" ? "Perfect Match" : "Good Match"}
                </span>
              </div>
            )}

            {/* Profile section */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-bold text-2xl mb-4">
                {getInitials(currentMatch.name)}
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                {currentMatch.name}
              </h2>
              <div className={`flex items-center gap-1 text-sm ${darkMode ? "text-orange-300/70" : "text-orange-600/70"}`}>
                <MapPin className="w-4 h-4" />
                <span>{currentMatch.city ? `${currentMatch.city}, ` : ''}{currentMatch.state}</span>
              </div>
            </div>

            {/* Can Teach You */}
            <div className="mb-4">
              <h3 className={`text-sm font-semibold mb-3 text-center ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
                Can Teach You:
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {currentMatch.languagesKnow.map((lang, idx) => (
                  <span
                    key={idx}
                    className={`px-4 py-2 rounded-full text-base font-medium ${
                      darkMode 
                        ? "bg-green-900/30 text-green-400 border border-green-800/30" 
                        : "bg-green-100 text-green-700 border border-green-300"
                    }`}
                  >
                    {lang.language} ({lang.fluency})
                  </span>
                ))}
              </div>
            </div>

            {/* Wants to Learn */}
            <div className="text-center">
              <h3 className={`text-sm font-semibold mb-3 ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
                Wants to Learn:
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                <span
                  className={`px-4 py-2 rounded-full text-base font-medium ${
                    darkMode 
                      ? "bg-blue-900/30 text-blue-400 border border-blue-800/30" 
                      : "bg-blue-100 text-blue-700 border border-blue-300"
                  }`}
                >
                  {currentMatch.primaryLanguageToLearn}
                </span>
                {currentMatch.secondaryLanguageToLearn && (
                  <span
                    className={`px-4 py-2 rounded-full text-base font-medium ${
                      darkMode 
                        ? "bg-blue-900/30 text-blue-400 border border-blue-800/30" 
                        : "bg-blue-100 text-blue-700 border border-blue-300"
                    }`}
                  >
                    {currentMatch.secondaryLanguageToLearn}
                  </span>
                )}
              </div>
            </div>

            {/* Tap for more hint */}
            <div className="mt-8 text-center">
              <p className={`text-sm flex items-center justify-center gap-1 ${darkMode ? "text-orange-300/70" : "text-orange-600/70"}`}>
                {isMobile ? "Tap" : "Click"} to view full profile
                <ChevronRight className="w-4 h-4" />
              </p>
            </div>
          </div>
        ) : (
          /* Card - Detailed View */
          <div
            className={`rounded-2xl p-6 mb-6 transition-all ${
              darkMode 
                ? "bg-orange-900/10 border border-orange-800/30" 
                : "bg-white border border-orange-200 shadow-xl"
            }`}
          >
            {/* Back Button */}
            <button
              onClick={() => setShowDetails(false)}
              className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-lg transition-all ${
                darkMode ? "text-orange-300 hover:bg-orange-900/30" : "text-orange-600 hover:bg-orange-100"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </button>

            {/* Match type badge */}
            {currentMatch.matchType && (
              <div className="mb-4">
                <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-semibold ${
                  currentMatch.matchType === "primary"
                    ? darkMode 
                      ? "bg-green-900/30 text-green-400 border border-green-800/30" 
                      : "bg-green-100 text-green-700 border border-green-300"
                    : darkMode 
                      ? "bg-blue-900/30 text-blue-400 border border-blue-800/30" 
                      : "bg-blue-100 text-blue-700 border border-blue-300"
                }`}>
                  {currentMatch.matchType === "primary" ? "Perfect Match" : "Good Match"}
                </span>
              </div>
            )}

            {/* Profile section */}
            <div className="flex items-start gap-4 mb-5">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-bold text-2xl shrink-0">
                {getInitials(currentMatch.name)}
              </div>
              <div className="flex-1">
                <h2 className={`text-2xl font-bold mb-1 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                  {currentMatch.name}
                </h2>
                <div className={`flex items-center gap-1 text-sm mb-2 ${darkMode ? "text-orange-300/70" : "text-orange-600/70"}`}>
                  <MapPin className="w-4 h-4" />
                  <span>{currentMatch.city ? `${currentMatch.city}, ` : ''}{currentMatch.state}, {currentMatch.country}</span>
                </div>
                <div className={`inline-block px-3 py-1 rounded-lg text-xs font-medium ${
                  darkMode ? "bg-orange-800/30 text-orange-300" : "bg-orange-100 text-orange-700"
                }`}>
                  {currentMatch.primaryRole === 'teacher' ? 'Primary Teacher' : 'Primary Learner'}
                </div>
              </div>
            </div>

            {/* Bio */}
            {currentMatch.bio && (
              <div className="mb-5">
                <h3 className={`text-sm font-semibold mb-2 ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
                  About
                </h3>
                <p className={`text-sm ${darkMode ? "text-orange-200/80" : "text-orange-800"} leading-relaxed`}>
                  {currentMatch.bio}
                </p>
              </div>
            )}

            {/* Languages */}
            <div className="space-y-4 mb-5">
              <div>
                <h3 className={`text-sm font-semibold mb-2 ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
                  Can Teach You:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentMatch.languagesKnow.map((lang, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        darkMode 
                          ? "bg-green-900/30 text-green-400 border border-green-800/30" 
                          : "bg-green-100 text-green-700 border border-green-300"
                      }`}
                    >
                      {lang.language} • {lang.fluency}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className={`text-sm font-semibold mb-2 ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
                  Wants to Learn:
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      darkMode 
                        ? "bg-blue-900/30 text-blue-400 border border-blue-800/30" 
                        : "bg-blue-100 text-blue-700 border border-blue-300"
                    }`}
                  >
                    {currentMatch.primaryLanguageToLearn} (Primary)
                  </span>
                  {currentMatch.secondaryLanguageToLearn && (
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        darkMode 
                          ? "bg-blue-900/30 text-blue-400 border border-blue-800/30" 
                          : "bg-blue-100 text-blue-700 border border-blue-300"
                      }`}
                    >
                      {currentMatch.secondaryLanguageToLearn}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons in Detail View */}
            <div className="flex gap-3">
              <button
                onClick={handleNext}
                disabled={animating}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all active:scale-95 ${
                  animating
                    ? "opacity-50 cursor-not-allowed"
                    : darkMode 
                      ? "bg-orange-900/20 text-orange-300 border border-orange-800/30 hover:bg-orange-900/30" 
                      : "bg-orange-100 text-orange-700 border border-orange-300 hover:bg-orange-200"
                }`}
              >
                Pass
              </button>
              <button
                onClick={() => handleSwipe('right')}
                disabled={animating}
                className={`flex-1 py-3 rounded-xl bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg ${
                  animating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Heart className="w-5 h-5" />
                Send Request
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons - Only show in simple view on desktop */}
        {!showDetails && !isMobile && (
          <>
            <div className="flex items-center justify-center gap-4 mb-4">
              {/* Pass Button */}
              <button
                onClick={() => handleSwipe('left')}
                disabled={animating}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                  animating
                    ? "opacity-50 cursor-not-allowed"
                    : darkMode 
                      ? "bg-red-900/20 text-red-400 hover:bg-red-900/30 border-2 border-red-800/30" 
                      : "bg-white text-red-600 hover:bg-red-50 border-2 border-red-300 shadow-lg"
                }`}
              >
                <X className="w-8 h-8" />
              </button>

              {/* Send Request Button */}
              <button
                onClick={() => handleSwipe('right')}
                disabled={animating}
                className={`px-6 py-3.5 rounded-full bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold active:scale-95 transition-all flex items-center gap-2 shadow-xl ${
                  animating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Heart className="w-5 h-5" />
                Send Request
              </button>
            </div>

            {/* Helper Text */}
            <div className="text-center">
              <p className={`text-sm ${darkMode ? "text-orange-300/50" : "text-orange-600/50"}`}>
                ← → Arrow keys to swipe • Click card for details
              </p>
            </div>
          </>
        )}
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