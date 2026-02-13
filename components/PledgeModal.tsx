"use client";
import { useState } from "react";
import { X, Shield, Heart, Users, MessageCircle } from "lucide-react";
import { useDarkMode } from '@/lib/DarkModeContext';

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div 
        className={`rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-slideUp ${
          darkMode 
            ? "bg-linear-to-br from-orange-900/95 to-red-900/95 border border-orange-800/30" 
            : "bg-linear-to-br from-white to-orange-50/50 border border-orange-200"
        }`}
      >
        {/* Header */}
        <div className={`p-6 border-b ${darkMode ? "border-orange-800/30" : "border-orange-200"}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-linear-to-br from-orange-500 to-red-600">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className={`text-2xl font-bold ${darkMode ? "text-orange-50" : "text-orange-950"}`}>
                  VartaLang Community Pledge
                </h2>
              </div>
              <p className={`text-sm ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                Welcome! Before you start chatting, please review and accept our community guidelines.
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-all ${
                darkMode 
                  ? "hover:bg-orange-900/30 text-orange-300" 
                  : "hover:bg-orange-100 text-orange-600"
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div 
          className={`flex-1 overflow-y-auto p-6 space-y-6 ${
            darkMode ? "text-orange-100" : "text-orange-900"
          }`}
          onScroll={handleScroll}
        >
          {/* Introduction */}
          <div className={`p-4 rounded-2xl ${
            darkMode ? "bg-orange-900/30" : "bg-orange-100"
          }`}>
            <p className={`text-sm leading-relaxed ${
              darkMode ? "text-orange-200" : "text-orange-800"
            }`}>
              VartaLang is a platform dedicated to fostering meaningful language learning through 
              respectful and supportive conversations. By using our chat feature, you agree to uphold 
              our community standards and contribute to a safe, inclusive environment for all learners.
            </p>
          </div>

          {/* Code of Conduct */}
          <div>
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
              darkMode ? "text-orange-100" : "text-orange-950"
            }`}>
              <MessageCircle className="w-5 h-5 text-orange-500" />
              Code of Conduct
            </h3>
            
            <div className="space-y-4">
              {/* Respect */}
              <div className={`p-4 rounded-xl border ${
                darkMode 
                  ? "bg-orange-900/20 border-orange-800/30" 
                  : "bg-white border-orange-200"
              }`}>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 to-red-600 shrink-0">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-2 ${
                      darkMode ? "text-orange-100" : "text-orange-900"
                    }`}>
                      Treat Everyone with Respect
                    </h4>
                    <ul className={`text-sm space-y-1 list-disc list-inside ${
                      darkMode ? "text-orange-200/80" : "text-orange-700"
                    }`}>
                      <li>Be kind, patient, and understanding with all language learners</li>
                      <li>Embrace cultural differences and celebrate diversity</li>
                      <li>Offer constructive feedback, never criticism or mockery</li>
                      <li>Remember that everyone is at a different stage in their learning journey</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* No Abusive Language */}
              <div className={`p-4 rounded-xl border ${
                darkMode 
                  ? "bg-orange-900/20 border-orange-800/30" 
                  : "bg-white border-orange-200"
              }`}>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 to-red-600 shrink-0">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-2 ${
                      darkMode ? "text-orange-100" : "text-orange-900"
                    }`}>
                      Zero Tolerance for Abusive Language
                    </h4>
                    <ul className={`text-sm space-y-1 list-disc list-inside ${
                      darkMode ? "text-orange-200/80" : "text-orange-700"
                    }`}>
                      <li>No hate speech, slurs, or discriminatory language of any kind</li>
                      <li>No harassment, bullying, or threatening behavior</li>
                      <li>No sexually explicit or inappropriate content</li>
                      <li>No spam, solicitation, or unsolicited advertising</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Safe Environment */}
              <div className={`p-4 rounded-xl border ${
                darkMode 
                  ? "bg-orange-900/20 border-orange-800/30" 
                  : "bg-white border-orange-200"
              }`}>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 to-red-600 shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-2 ${
                      darkMode ? "text-orange-100" : "text-orange-900"
                    }`}>
                      Foster a Safe Learning Environment
                    </h4>
                    <ul className={`text-sm space-y-1 list-disc list-inside ${
                      darkMode ? "text-orange-200/80" : "text-orange-700"
                    }`}>
                      <li>Keep conversations focused on language learning and cultural exchange</li>
                      <li>Respect personal boundaries and privacy</li>
                      <li>Report any violations of this code immediately using the report feature</li>
                      <li>Support and encourage fellow learners in their language journey</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consequences */}
          <div className={`p-4 rounded-xl border-2 ${
            darkMode 
              ? "bg-red-900/20 border-red-800/30" 
              : "bg-red-50 border-red-200"
          }`}>
            <h4 className={`font-semibold mb-2 flex items-center gap-2 ${
              darkMode ? "text-red-400" : "text-red-700"
            }`}>
              <Shield className="w-4 h-4" />
              Consequences of Violations
            </h4>
            <p className={`text-sm ${
              darkMode ? "text-red-300/80" : "text-red-600"
            }`}>
              Violations of this Code of Conduct may result in temporary suspension, permanent ban, 
              or other actions as deemed appropriate. We take the safety of our community seriously 
              and will investigate all reports thoroughly.
            </p>
          </div>

          {/* Your Commitment */}
          <div className={`p-5 rounded-2xl border-2 ${
            darkMode 
              ? "bg-linear-to-br from-orange-900/40 to-red-900/40 border-orange-700" 
              : "bg-linear-to-br from-orange-100 to-red-100 border-orange-300"
          }`}>
            <h4 className={`font-bold mb-3 text-center ${
              darkMode ? "text-orange-100" : "text-orange-900"
            }`}>
              By clicking "I Accept", I pledge to:
            </h4>
            <ul className={`text-sm space-y-2 ${
              darkMode ? "text-orange-200" : "text-orange-800"
            }`}>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold mt-0.5">✓</span>
                <span>Uphold the VartaLang Code of Conduct at all times</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold mt-0.5">✓</span>
                <span>Use respectful language and maintain a positive attitude</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold mt-0.5">✓</span>
                <span>Report any violations I encounter to help keep our community safe</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold mt-0.5">✓</span>
                <span>Contribute to a welcoming environment for all language learners</span>
              </li>
            </ul>
          </div>

          {!hasScrolled && (
            <div className={`text-center text-xs ${
              darkMode ? "text-orange-400/70" : "text-orange-600/70"
            }`}>
              ↓ Scroll down to read all guidelines ↓
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${darkMode ? "border-orange-800/30" : "border-orange-200"}`}>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                darkMode 
                  ? "bg-orange-900/20 text-orange-300 border border-orange-800/30 hover:bg-orange-900/30" 
                  : "bg-orange-100 text-orange-700 border border-orange-300 hover:bg-orange-200"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={onAccept}
              disabled={!hasScrolled}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                hasScrolled
                  ? "bg-linear-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              I Accept
            </button>
          </div>
          {!hasScrolled && (
            <p className={`text-xs text-center mt-2 ${
              darkMode ? "text-orange-400/70" : "text-orange-600/70"
            }`}>
              Please read all guidelines before accepting
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
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}