// components/modals/CodeOfConductModal.tsx

"use client";

import { X, Shield, Heart, Users, MessageCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { useDarkMode } from "@/lib/DarkModeContext";

interface CodeOfConductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CodeOfConductModal({ isOpen, onClose }: CodeOfConductModalProps) {
  const { darkMode } = useDarkMode();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center p-4">
      <div 
        className={`w-full max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden ${
          darkMode ? "bg-[#2a1f1a] border border-orange-800/30" : "bg-white border border-orange-200"
        }`}
      >
        {/* Header */}
        <div className={`sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between ${
          darkMode ? "bg-[#2a1f1a] border-orange-800/30" : "bg-white border-orange-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${
              darkMode ? "bg-orange-900/30" : "bg-orange-100"
            }`}>
              <Shield className={`w-5 h-5 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
            </div>
            <h2 className={`text-xl font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
              Code of Conduct
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-all ${
              darkMode ? "hover:bg-orange-900/30 text-orange-300" : "hover:bg-orange-100 text-orange-700"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-6">
          <div className={`mb-6 p-4 rounded-xl border ${
            darkMode ? "bg-orange-900/10 border-orange-800/30" : "bg-orange-50 border-orange-200"
          }`}>
            <p className={`text-sm ${darkMode ? "text-orange-200/90" : "text-orange-900"}`}>
              VartaLang is built on respect, inclusivity, and the shared joy of language learning. Our Code of Conduct ensures a safe and welcoming space for every member of our community.
            </p>
          </div>

          <h3 className={`text-lg font-semibold mt-6 mb-4 flex items-center gap-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            <Heart className="w-5 h-5 text-red-500" />
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className={`p-4 rounded-xl border ${
              darkMode ? "bg-orange-900/5 border-orange-800/20" : "bg-white border-orange-100"
            }`}>
              <h4 className={`font-semibold mb-2 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                Respect
              </h4>
              <p className={`text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
                Treat every community member with dignity and kindness, regardless of background, language, or learning level.
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${
              darkMode ? "bg-orange-900/5 border-orange-800/20" : "bg-white border-orange-100"
            }`}>
              <h4 className={`font-semibold mb-2 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                Inclusivity
              </h4>
              <p className={`text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
                We celebrate India's linguistic diversity. All languages, dialects, and accents are equally valued.
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${
              darkMode ? "bg-orange-900/5 border-orange-800/20" : "bg-white border-orange-100"
            }`}>
              <h4 className={`font-semibold mb-2 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                Support
              </h4>
              <p className={`text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
                Help each other learn and grow. Encourage fellow learners and celebrate their progress.
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${
              darkMode ? "bg-orange-900/5 border-orange-800/20" : "bg-white border-orange-100"
            }`}>
              <h4 className={`font-semibold mb-2 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                Authenticity
              </h4>
              <p className={`text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
                Be genuine in your interactions. Share real experiences and honest feedback.
              </p>
            </div>
          </div>

          <h3 className={`text-lg font-semibold mt-6 mb-3 flex items-center gap-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            <CheckCircle className="w-5 h-5 text-green-500" />
            Expected Behavior
          </h3>
          <ul className={`space-y-2 mb-6 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>Be respectful and courteous</strong> in all communications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>Use appropriate language</strong> - avoid profanity, hate speech, or offensive content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>Be patient with learners</strong> at all levels - everyone starts somewhere</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>Provide constructive feedback</strong> that helps others improve</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>Respect privacy</strong> - don't share others' personal information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>Report concerns</strong> - help us maintain a safe community</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>Honor commitments</strong> - be reliable in your language exchange partnerships</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>Celebrate diversity</strong> - embrace different cultures, regions, and perspectives</span>
            </li>
          </ul>

          <h3 className={`text-lg font-semibold mt-6 mb-3 flex items-center gap-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Prohibited Behavior
          </h3>
          <ul className={`space-y-2 mb-6 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span><strong>Harassment or bullying</strong> of any kind, including unwelcome advances or intimidation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span><strong>Discrimination</strong> based on gender, caste, religion, region, language, disability, or any other characteristic</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span><strong>Hate speech</strong> or content that promotes violence or hatred</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span><strong>Sexual content or advances</strong> - VartaLang is for language learning only</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span><strong>Spam or commercial solicitation</strong> without permission</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span><strong>Impersonation</strong> or misrepresentation of identity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span><strong>Sharing illegal content</strong> or engaging in illegal activities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span><strong>Doxxing</strong> or sharing others' private information without consent</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span><strong>Trolling or deliberately disruptive behavior</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span><strong>Exploiting or scamming</strong> other community members</span>
            </li>
          </ul>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            Language Learning Etiquette
          </h3>
          <div className={`p-4 rounded-xl border ${
            darkMode ? "bg-orange-900/10 border-orange-800/30" : "bg-orange-50 border-orange-200"
          }`}>
            <ul className={`space-y-2 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
              <li>• <strong>Correct gently:</strong> Help others improve without being condescending</li>
              <li>• <strong>Speak clearly:</strong> Adjust your pace for your partner's level</li>
              <li>• <strong>Be encouraging:</strong> Praise effort and progress, not just perfection</li>
              <li>• <strong>Share the conversation:</strong> Balance teaching and learning time</li>
              <li>• <strong>Stay focused:</strong> Keep conversations relevant to language learning</li>
              <li>• <strong>Be reliable:</strong> Show up for scheduled sessions or give advance notice</li>
            </ul>
          </div>

          <h3 className={`text-lg font-semibold mt-6 mb-3 flex items-center gap-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            <MessageCircle className="w-5 h-5 text-blue-500" />
            Reporting & Enforcement
          </h3>
          <p className={`text-sm mb-3 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            If you experience or witness behavior that violates this Code of Conduct:
          </p>
          <ul className={`list-decimal list-inside space-y-2 mb-4 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            <li><strong>Use the in-app report feature</strong> - available in all chats and profiles</li>
            <li><strong>Block the user immediately</strong> if you feel unsafe</li>
            <li><strong>Contact us directly</strong> at vartalang@gmail.com for serious concerns</li>
            <li><strong>Provide context</strong> - screenshots or specific details help us investigate</li>
          </ul>

          <div className={`p-4 rounded-xl border ${
            darkMode ? "bg-red-900/20 border-red-800/30" : "bg-red-50 border-red-200"
          }`}>
            <h4 className={`font-semibold mb-2 ${darkMode ? "text-red-300" : "text-red-800"}`}>
              Consequences of Violations
            </h4>
            <ul className={`space-y-1 text-sm ${darkMode ? "text-red-200/80" : "text-red-700"}`}>
              <li>• <strong>First offense:</strong> Warning and temporary restriction</li>
              <li>• <strong>Repeated violations:</strong> Suspension of account features</li>
              <li>• <strong>Severe violations:</strong> Immediate and permanent ban</li>
              <li>• <strong>Illegal activity:</strong> Report to appropriate authorities</li>
            </ul>
          </div>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            Building Together
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            VartaLang is more than a platform - it's a community. Every member plays a role in creating a positive, inclusive space where Indians from all walks of life can connect through language.
          </p>
          <p className={`text-sm mb-6 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            By following this Code of Conduct, you help us build a community where:
          </p>
          <ul className={`list-disc list-inside space-y-1 mb-6 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            <li>Everyone feels welcome and valued</li>
            <li>Learning happens safely and joyfully</li>
            <li>Cultural and linguistic diversity is celebrated</li>
            <li>Meaningful connections are formed across India</li>
            <li>Tradition meets opportunity for all Indians</li>
          </ul>

          <div className={`mt-8 p-5 rounded-xl ${
            darkMode ? "bg-linear-to-br from-orange-900/30 to-red-900/20 border border-orange-800/30" : "bg-linear-to-br from-orange-50 to-red-50 border border-orange-200"
          }`}>
            <p className={`text-sm font-medium text-center ${darkMode ? "text-orange-200" : "text-orange-900"}`}>
              Thank you for being a part of VartaLang and helping us create a respectful, inclusive community for language learners across India. 🇮🇳
            </p>
          </div>

          <p className={`text-xs text-center mt-4 ${darkMode ? "text-orange-300/50" : "text-gray-500"}`}>
            Last Updated: February 13, 2026
          </p>
        </div>
      </div>
    </div>
  );
}