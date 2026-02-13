"use client";
import { useState } from "react";
import { X, Shield, Heart, Users, MessageCircle, CheckCircle2 } from "lucide-react";
import { useDarkMode } from '@/lib/DarkModeContext';
import { AlertTriangle } from "lucide-react";

interface PledgeModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export default function PledgeModal({ isOpen, onAccept, onClose }: PledgeModalProps) {
  const { darkMode } = useDarkMode();
  const [hasScrolled, setHasScrolled] = useState(false);

  if (!isOpen) return null;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
    if (isAtBottom && !hasScrolled) {
      setHasScrolled(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-100 p-4 animate-fadeIn">
      <div 
        className={`rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-slideUp overflow-hidden ${
          darkMode 
            ? "bg-linear-to-br from-[#2a1f1a] via-[#2a1f1a] to-[#3d2317] border border-orange-800/50" 
            : "bg-linear-to-br from-white via-orange-50/30 to-orange-100/40 border-2 border-orange-200/80"
        }`}
      >
        {/* Decorative Top Bar */}
        <div className="h-1.5 bg-linear-to-r from-orange-500 via-red-500 to-orange-600"></div>

        {/* Header */}
        <div className={`p-6 pb-4 border-b ${darkMode ? "border-orange-800/30" : "border-orange-200/60"}`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-linear-to-br from-orange-500 to-red-600 shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent ${
                    darkMode ? "from-orange-400 to-red-400" : ""
                  }`}>
                    Community Pledge
                  </h2>
                  <p className={`text-xs font-medium ${darkMode ? "text-orange-400/60" : "text-orange-600/60"}`}>
                    VartaLang Code of Conduct
                  </p>
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${darkMode ? "text-orange-200/70" : "text-orange-800/80"}`}>
                Before chatting, please review and accept our community guidelines to ensure a safe, 
                respectful environment for everyone.
              </p>
            </div>
            <button
              onClick={onClose}
              className={`ml-2 p-2 rounded-lg transition-all ${
                darkMode 
                  ? "hover:bg-orange-900/40 text-orange-400 hover:text-orange-300" 
                  : "hover:bg-orange-100 text-orange-600 hover:text-orange-700"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div 
          className={`flex-1 overflow-y-auto p-6 space-y-5 ${
            darkMode ? "text-orange-100" : "text-orange-900"
          }`}
          onScroll={handleScroll}
        >
          {/* Introduction Card */}
          <div className={`p-4 rounded-2xl border ${
            darkMode 
              ? "bg-linear-to-br from-orange-900/30 to-red-900/20 border-orange-800/40" 
              : "bg-linear-to-br from-orange-50 to-red-50/50 border-orange-300/50"
          }`}>
            <p className={`text-sm leading-relaxed ${
              darkMode ? "text-orange-200/90" : "text-orange-800"
            }`}>
              💬 VartaLang connects language learners worldwide through respectful conversations. 
              By using our chat feature, you commit to maintaining a safe, inclusive space for everyone.
            </p>
          </div>

          {/* Code of Conduct Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-orange-500/30 to-transparent"></div>
              <h3 className={`text-base font-bold flex items-center gap-2 ${
                darkMode ? "text-orange-300" : "text-orange-700"
              }`}>
                <MessageCircle className="w-4 h-4" />
                Our Guidelines
              </h3>
              <div className="h-px flex-1 bg-linear-to-r from-transparent via-orange-500/30 to-transparent"></div>
            </div>
            
            <div className="space-y-3">
              {/* Respect */}
              <div className={`group p-4 rounded-xl border transition-all ${
                darkMode 
                  ? "bg-orange-900/10 border-orange-800/30 hover:border-orange-700/50 hover:bg-orange-900/20" 
                  : "bg-white border-orange-200 hover:border-orange-300 hover:shadow-md"
              }`}>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 to-red-600 shadow-md shrink-0">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-1.5 ${
                      darkMode ? "text-orange-200" : "text-orange-900"
                    }`}>
                      Treat Everyone with Respect
                    </h4>
                    <ul className={`text-sm space-y-1 ${
                      darkMode ? "text-orange-300/80" : "text-orange-700/90"
                    }`}>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <span>Be kind, patient, and understanding with all learners</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <span>Embrace cultural differences and celebrate diversity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <span>Offer constructive feedback, never criticism</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* No Abusive Language */}
              <div className={`group p-4 rounded-xl border transition-all ${
                darkMode 
                  ? "bg-orange-900/10 border-orange-800/30 hover:border-orange-700/50 hover:bg-orange-900/20" 
                  : "bg-white border-orange-200 hover:border-orange-300 hover:shadow-md"
              }`}>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 to-red-600 shadow-md shrink-0">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-1.5 ${
                      darkMode ? "text-orange-200" : "text-orange-900"
                    }`}>
                      Zero Tolerance for Abuse
                    </h4>
                    <ul className={`text-sm space-y-1 ${
                      darkMode ? "text-orange-300/80" : "text-orange-700/90"
                    }`}>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <span>No hate speech, slurs, or discrimination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <span>No harassment, bullying, or threats</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <span>No inappropriate or explicit content</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Safe Environment */}
              <div className={`group p-4 rounded-xl border transition-all ${
                darkMode 
                  ? "bg-orange-900/10 border-orange-800/30 hover:border-orange-700/50 hover:bg-orange-900/20" 
                  : "bg-white border-orange-200 hover:border-orange-300 hover:shadow-md"
              }`}>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 to-red-600 shadow-md shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-1.5 ${
                      darkMode ? "text-orange-200" : "text-orange-900"
                    }`}>
                      Foster a Safe Environment
                    </h4>
                    <ul className={`text-sm space-y-1 ${
                      darkMode ? "text-orange-300/80" : "text-orange-700/90"
                    }`}>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <span>Focus on language learning and cultural exchange</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <span>Respect personal boundaries and privacy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <span>Report violations immediately</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consequences Warning */}
          <div className={`p-4 rounded-xl border-2 ${
            darkMode 
              ? "bg-red-950/30 border-red-800/40" 
              : "bg-red-50 border-red-200"
          }`}>
            <div className="flex items-start gap-3">
              <div className={`p-1.5 rounded-lg ${
                darkMode ? "bg-red-900/50" : "bg-red-100"
              }`}>
                <AlertTriangle className={`w-4 h-4 ${darkMode ? "text-red-400" : "text-red-600"}`} />
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold text-sm mb-1 ${
                  darkMode ? "text-red-400" : "text-red-700"
                }`}>
                  Consequences of Violations
                </h4>
                <p className={`text-sm ${
                  darkMode ? "text-red-300/80" : "text-red-600/90"
                }`}>
                  Violations may result in warnings, temporary suspension, or permanent ban. 
                  We investigate all reports thoroughly.
                </p>
              </div>
            </div>
          </div>

          {/* Your Commitment */}
          <div className={`p-5 rounded-2xl border-2 ${
            darkMode 
              ? "bg-linear-to-br from-orange-900/30 via-red-900/20 to-orange-900/30 border-orange-700/50" 
              : "bg-linear-to-br from-orange-100/80 via-red-50 to-orange-100/80 border-orange-400/50"
          }`}>
            <h4 className={`font-bold mb-3 text-center text-base ${
              darkMode ? "text-orange-200" : "text-orange-900"
            }`}>
              By clicking "I Accept", I pledge to:
            </h4>
            <div className="space-y-2">
              {[
                "Uphold the VartaLang Code of Conduct at all times",
                "Use respectful language and maintain a positive attitude",
                "Report violations to keep our community safe",
                "Contribute to a welcoming environment for all learners"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${
                    darkMode ? "text-orange-400" : "text-orange-600"
                  }`} />
                  <span className={`text-sm ${
                    darkMode ? "text-orange-200/90" : "text-orange-800"
                  }`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {!hasScrolled && (
            <div className={`text-center text-xs font-medium animate-bounce ${
              darkMode ? "text-orange-400/70" : "text-orange-600/70"
            }`}>
              ↓ Scroll to read all guidelines ↓
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-6 pt-4 border-t ${
          darkMode ? "border-orange-800/30 bg-[#2a1f1a]/50" : "border-orange-200/60 bg-orange-50/30"
        }`}>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all border-2 ${
                darkMode 
                  ? "bg-orange-900/20 text-orange-300 border-orange-800/50 hover:bg-orange-900/30 hover:border-orange-700" 
                  : "bg-white text-orange-700 border-orange-300 hover:bg-orange-50 hover:border-orange-400"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={onAccept}
              disabled={!hasScrolled}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                hasScrolled
                  ? "bg-linear-to-r from-orange-500 via-red-500 to-orange-600 text-white hover:from-orange-600 hover:via-red-600 hover:to-orange-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed opacity-60"
              }`}
            >
              {hasScrolled ? "I Accept & Continue" : "I Accept"}
            </button>
          </div>
          {!hasScrolled && (
            <p className={`text-xs text-center mt-2 font-medium ${
              darkMode ? "text-orange-400/60" : "text-orange-600/60"
            }`}>
              Please scroll through all guidelines to continue
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${darkMode ? 'rgba(249, 115, 22, 0.1)' : 'rgba(249, 115, 22, 0.05)'};
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #dc2626);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ea580c, #b91c1c);
        }
      `}</style>
    </div>
  );
}


