"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDarkMode } from '@/lib/DarkModeContext';
import { 
  Heart, 
  Shield, 
  BookOpen, 
  Users, 
  Sparkles,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function PledgePage() {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const matchId = searchParams.get('matchId');
  const chatId = searchParams.get('chatId');
  const matchName = searchParams.get('name');

  useEffect(() => {
    // Redirect if no match data
    if (!matchId || !chatId) {
      router.push('/matches');
    }
  }, [matchId, chatId, router]);

  const handleSubmit = async () => {
    if (!isAgreed) {
      alert("Please accept the pledge to continue");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      // Record pledge acceptance
      await fetch(`${API_URL}/matches/accept-pledge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          matchId,
          acceptedAt: new Date().toISOString(),
        }),
      });

      // Show success animation
      setShowSuccess(true);

      // Redirect to chat after animation
      setTimeout(() => {
        router.push(`/chats?chat=${chatId}`);
      }, 2000);

    } catch (error) {
      console.error("Pledge submission error:", error);
      alert("Failed to submit pledge. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"
      }`}>
        <div className="text-center px-4 animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 animate-scale-in shadow-2xl">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className={`text-3xl font-bold mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            Pledge Accepted! 🎉
          </h2>
          <p className={`text-lg ${darkMode ? "text-orange-200/80" : "text-orange-700/80"}`}>
            Welcome to your learning journey with {matchName}
          </p>
          <div className="mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 text-orange-500">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">Redirecting to chat...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"} py-8 px-4`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-orange-500 to-red-600 mb-4 shadow-lg">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${darkMode ? "text-orange-100" : "text-orange-950"}`}>
            VartaLang Pledge
          </h1>
          <p className={`text-lg ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
            A commitment to respectful and meaningful learning
          </p>
        </div>

        {/* Congratulations Card */}
        <div className={`rounded-2xl p-6 mb-8 animate-slide-up ${
          darkMode 
            ? "bg-linear-to-br from-orange-900/20 to-red-900/20 border border-orange-800/30" 
            : "bg-linear-to-br from-orange-50 to-red-50 border border-orange-200"
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-orange-500" />
            <h3 className={`text-xl font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
              Congratulations on Your Match!
            </h3>
          </div>
          <p className={`text-base ${darkMode ? "text-orange-200/80" : "text-orange-800"}`}>
            You're about to start an incredible language learning journey with <span className="font-semibold">{matchName}</span>. 
            Before you begin chatting, please read and accept our community pledge.
          </p>
        </div>

        {/* Pledge Content */}
        <div className={`rounded-2xl p-8 mb-8 animate-slide-up animation-delay-200 ${
          darkMode 
            ? "bg-orange-900/10 border border-orange-800/30" 
            : "bg-white border border-orange-200 shadow-xl"
        }`}>
          
          {/* Core Values Icons */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 ${
                darkMode ? "bg-orange-900/30" : "bg-orange-100"
              }`}>
                <Shield className="w-8 h-8 text-orange-500" />
              </div>
              <p className={`text-sm font-medium ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
                Respect
              </p>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 ${
                darkMode ? "bg-orange-900/30" : "bg-orange-100"
              }`}>
                <BookOpen className="w-8 h-8 text-orange-500" />
              </div>
              <p className={`text-sm font-medium ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
                Dedication
              </p>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 ${
                darkMode ? "bg-orange-900/30" : "bg-orange-100"
              }`}>
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <p className={`text-sm font-medium ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
                Community
              </p>
            </div>
          </div>

          {/* Pledge Text */}
          <div className={`space-y-4 text-base leading-relaxed ${
            darkMode ? "text-orange-100" : "text-orange-900"
          }`}>
            <p className="font-semibold text-lg">
              I pledge that on VartaLang, I will communicate with respect, honesty, and empathy.
            </p>
            
            <p>
              I will follow all community rules and uphold the values of dignity and safety.
            </p>
            
            <p>
              I will not hurt anyone's feelings through words, intent, or behavior. I will treat every 
              learner and teacher with patience, cultural sensitivity, and kindness.
            </p>
            
            <p>
              I commit to learning devotedly and dedicatedly, to teaching sincerely where I can, and to 
              using this platform only for meaningful language learning.
            </p>
            
            <p className="font-semibold">
              I understand that language is not just skill, but trust and humanity. I pledge to protect that trust.
            </p>
          </div>

          {/* Divider */}
          <div className={`my-8 border-t ${darkMode ? "border-orange-800/30" : "border-orange-200"}`}></div>

          {/* Acceptance Checkbox */}
          <div className="space-y-6">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="peer w-6 h-6 rounded-md border-2 border-orange-500 appearance-none cursor-pointer transition-all checked:bg-linear-to-br checked:from-orange-500 checked:to-red-600 checked:border-transparent focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2"
                />
                <CheckCircle2 className="absolute top-0 left-0 w-6 h-6 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <div className="flex-1">
                <p className={`text-base font-semibold ${darkMode ? "text-orange-100" : "text-orange-900"} group-hover:text-orange-500 transition-colors`}>
                  I have read and agree to uphold the VartaLang Pledge
                </p>
                <p className={`text-sm mt-1 ${darkMode ? "text-orange-300/70" : "text-orange-700/70"}`}>
                  By checking this box, you commit to respectful and meaningful language exchange
                </p>
              </div>
            </label>

            {/* Move to Chats Button */}
            <button
              onClick={handleSubmit}
              disabled={!isAgreed || isSubmitting}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
                !isAgreed || isSubmitting
                  ? darkMode
                    ? "bg-orange-900/20 text-orange-500/50 cursor-not-allowed border border-orange-800/30"
                    : "bg-orange-100 text-orange-400 cursor-not-allowed border border-orange-200"
                  : "bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg hover:shadow-xl active:scale-[0.98] hover:from-orange-600 hover:to-red-700"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Accepting Pledge...</span>
                </>
              ) : (
                <>
                  <Heart className="w-6 h-6" />
                  <span>Move to Chats</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Helper Text */}
            {!isAgreed && (
              <p className={`text-sm text-center ${darkMode ? "text-orange-400/70" : "text-orange-600/70"}`}>
                Please accept the pledge to continue
              </p>
            )}
          </div>
        </div>

        {/* Trust Badge */}
        <div className={`text-center py-6 animate-slide-up animation-delay-400`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-orange-500" />
            <p className={`text-sm font-medium ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
              Protected by VartaLang Community Standards
            </p>
          </div>
          <p className={`text-xs ${darkMode ? "text-orange-400/60" : "text-orange-600/60"}`}>
            Your safety and learning experience matter to us
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}