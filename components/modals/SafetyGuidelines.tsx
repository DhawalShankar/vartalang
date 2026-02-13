// components/modals/SafetyGuidelinesModal.tsx

"use client";

import { X, Shield, Eye, Lock, AlertCircle, Phone, FileText } from "lucide-react";
import { useDarkMode } from "@/lib/DarkModeContext";

interface SafetyGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SafetyGuidelinesModal({ isOpen, onClose }: SafetyGuidelinesModalProps) {
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
              darkMode ? "bg-green-900/30" : "bg-green-100"
            }`}>
              <Shield className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`} />
            </div>
            <h2 className={`text-xl font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
              Safety Guidelines
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
            darkMode ? "bg-green-900/10 border-green-800/30" : "bg-green-50 border-green-200"
          }`}>
            <p className={`text-sm ${darkMode ? "text-green-200/90" : "text-green-900"}`}>
              Your safety is our top priority. Follow these guidelines to have a secure and positive experience on VartaLang.
            </p>
          </div>

          <h3 className={`text-lg font-semibold mt-6 mb-3 flex items-center gap-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            <Lock className="w-5 h-5 text-blue-500" />
            Protect Your Personal Information
          </h3>
          <div className={`p-4 rounded-xl border mb-6 ${
            darkMode ? "bg-orange-900/10 border-orange-800/30" : "bg-orange-50 border-orange-200"
          }`}>
            <h4 className={`font-semibold mb-2 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
              ✓ Do Share:
            </h4>
            <ul className={`list-disc list-inside space-y-1 mb-4 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
              <li>Your first name and general location (city/state)</li>
              <li>Languages you know and want to learn</li>
              <li>Your learning goals and interests</li>
              <li>Public social media handles (if comfortable)</li>
            </ul>

            <h4 className={`font-semibold mb-2 ${darkMode ? "text-red-300" : "text-red-700"}`}>
              ✗ Never Share:
            </h4>
            <ul className={`list-disc list-inside space-y-1 text-sm ${darkMode ? "text-red-200/80" : "text-red-700"}`}>
              <li>Full name, exact address, or home location</li>
              <li>Phone number, email, or other contact details</li>
              <li>Financial information (bank accounts, UPI IDs, credit cards)</li>
              <li>Government IDs (Aadhaar, PAN, Passport)</li>
              <li>Workplace details or school name</li>
              <li>Daily routine or travel plans</li>
              <li>Photos of children or family members</li>
            </ul>
          </div>

          <h3 className={`text-lg font-semibold mt-6 mb-3 flex items-center gap-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            <Eye className="w-5 h-5 text-purple-500" />
            Recognize Red Flags
          </h3>
          <div className={`p-4 rounded-xl border mb-6 ${
            darkMode ? "bg-red-900/20 border-red-800/30" : "bg-red-50 border-red-200"
          }`}>
            <p className={`text-sm mb-3 ${darkMode ? "text-red-200/80" : "text-red-700"}`}>
              <strong>Be cautious if someone:</strong>
            </p>
            <ul className={`space-y-2 text-sm ${darkMode ? "text-red-200/80" : "text-red-700"}`}>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠</span>
                <span>Asks for personal information too quickly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠</span>
                <span>Sends unwanted romantic or sexual messages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠</span>
                <span>Requests money or financial help</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠</span>
                <span>Pressures you to move to another messaging platform</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠</span>
                <span>Shares inappropriate photos or asks for yours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠</span>
                <span>Becomes aggressive or threatening</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠</span>
                <span>Has inconsistent stories or fake profile details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠</span>
                <span>Offers "too good to be true" opportunities</span>
              </li>
            </ul>
          </div>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            Meeting in Person (If You Choose To)
          </h3>
          <div className={`p-4 rounded-xl border mb-6 ${
            darkMode ? "bg-yellow-900/20 border-yellow-800/30" : "bg-yellow-50 border-yellow-200"
          }`}>
            <p className={`text-sm mb-3 font-medium ${darkMode ? "text-yellow-200" : "text-yellow-900"}`}>
              While VartaLang is primarily for online language exchange, if you decide to meet someone in person:
            </p>
            <ul className={`list-disc list-inside space-y-1 text-sm ${darkMode ? "text-yellow-200/80" : "text-yellow-800"}`}>
              <li>Meet in a public place (café, library, park)</li>
              <li>Tell a friend or family member where you're going</li>
              <li>Share your live location with someone you trust</li>
              <li>Bring a friend, especially for the first meeting</li>
              <li>Meet during daylight hours</li>
              <li>Keep your phone charged and accessible</li>
              <li>Trust your instincts - if something feels off, leave</li>
              <li>Avoid isolated locations or someone's home</li>
            </ul>
          </div>

          <h3 className={`text-lg font-semibold mt-6 mb-3 flex items-center gap-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Common Scams to Avoid
          </h3>
          <div className="space-y-3 mb-6">
            <div className={`p-3 rounded-lg border ${
              darkMode ? "bg-orange-900/10 border-orange-800/20" : "bg-white border-orange-100"
            }`}>
              <h4 className={`font-semibold text-sm mb-1 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                Romance Scams
              </h4>
              <p className={`text-xs ${darkMode ? "text-orange-200/70" : "text-gray-600"}`}>
                Someone builds an emotional connection then asks for money for "emergencies"
              </p>
            </div>
            <div className={`p-3 rounded-lg border ${
              darkMode ? "bg-orange-900/10 border-orange-800/20" : "bg-white border-orange-100"
            }`}>
              <h4 className={`font-semibold text-sm mb-1 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                Job Scams
              </h4>
              <p className={`text-xs ${darkMode ? "text-orange-200/70" : "text-gray-600"}`}>
                Fake job offers requiring upfront payment or personal documents
              </p>
            </div>
            <div className={`p-3 rounded-lg border ${
              darkMode ? "bg-orange-900/10 border-orange-800/20" : "bg-white border-orange-100"
            }`}>
              <h4 className={`font-semibold text-sm mb-1 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                Phishing
              </h4>
              <p className={`text-xs ${darkMode ? "text-orange-200/70" : "text-gray-600"}`}>
                Links that steal your login credentials or install malware
              </p>
            </div>
            <div className={`p-3 rounded-lg border ${
              darkMode ? "bg-orange-900/10 border-orange-800/20" : "bg-white border-orange-100"
            }`}>
              <h4 className={`font-semibold text-sm mb-1 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                Investment Schemes
              </h4>
              <p className={`text-xs ${darkMode ? "text-orange-200/70" : "text-gray-600"}`}>
                "Guaranteed returns" on cryptocurrency, trading, or MLM schemes
              </p>
            </div>
          </div>

          <h3 className={`text-lg font-semibold mt-6 mb-3 flex items-center gap-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            <Phone className="w-5 h-5 text-red-500" />
            If You Feel Unsafe
          </h3>
          <div className={`p-4 rounded-xl border ${
            darkMode ? "bg-red-900/20 border-red-800/30" : "bg-red-50 border-red-200"
          }`}>
            <p className={`text-sm font-semibold mb-3 ${darkMode ? "text-red-300" : "text-red-800"}`}>
              Take immediate action:
            </p>
            <ol className={`list-decimal list-inside space-y-2 text-sm ${darkMode ? "text-red-200/80" : "text-red-700"}`}>
              <li><strong>Block the user</strong> - available in all chat windows</li>
              <li><strong>Report them</strong> - use the in-app report feature</li>
              <li><strong>Save evidence</strong> - take screenshots of concerning messages</li>
              <li><strong>Contact us</strong> - email vartalang@gmail.com immediately</li>
              <li><strong>Contact authorities</strong> - for serious threats or illegal activity:
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Cyber Crime Helpline: 1930</li>
                  <li>Women's Helpline: 1091</li>
                  <li>National Emergency: 112</li>
                  <li>Report online: cybercrime.gov.in</li>
                </ul>
              </li>
            </ol>
          </div>

          <h3 className={`text-lg font-semibold mt-6 mb-3 flex items-center gap-2 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            <FileText className="w-5 h-5 text-blue-500" />
            Platform Safety Features
          </h3>
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <div className={`p-3 rounded-lg border ${
              darkMode ? "bg-orange-900/10 border-orange-800/20" : "bg-white border-orange-100"
            }`}>
              <h4 className={`font-semibold text-sm mb-1 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                Block Feature
              </h4>
              <p className={`text-xs ${darkMode ? "text-orange-200/70" : "text-gray-600"}`}>
                Instantly stop all communication with someone
              </p>
            </div>
            <div className={`p-3 rounded-lg border ${
              darkMode ? "bg-orange-900/10 border-orange-800/20" : "bg-white border-orange-100"
            }`}>
              <h4 className={`font-semibold text-sm mb-1 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                Report System
              </h4>
              <p className={`text-xs ${darkMode ? "text-orange-200/70" : "text-gray-600"}`}>
                Anonymous reporting with detailed investigation
              </p>
            </div>
            <div className={`p-3 rounded-lg border ${
              darkMode ? "bg-orange-900/10 border-orange-800/20" : "bg-white border-orange-100"
            }`}>
              <h4 className={`font-semibold text-sm mb-1 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                Profile Verification
              </h4>
              <p className={`text-xs ${darkMode ? "text-orange-200/70" : "text-gray-600"}`}>
                Verified badges for authentic user accounts
              </p>
            </div>
            <div className={`p-3 rounded-lg border ${
              darkMode ? "bg-orange-900/10 border-orange-800/20" : "bg-white border-orange-100"
            }`}>
              <h4 className={`font-semibold text-sm mb-1 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                Privacy Controls
              </h4>
              <p className={`text-xs ${darkMode ? "text-orange-200/70" : "text-gray-600"}`}>
                Control who can see your profile and contact you
              </p>
            </div>
          </div>

          <div className={`mt-8 p-5 rounded-xl ${
            darkMode ? "bg-linear-to-br from-green-900/30 to-blue-900/20 border border-green-800/30" : "bg-linear-to-br from-green-50 to-blue-50 border border-green-200"
          }`}>
            <p className={`text-sm font-medium text-center mb-2 ${darkMode ? "text-green-200" : "text-green-900"}`}>
              Remember: Trust your instincts
            </p>
            <p className={`text-sm text-center ${darkMode ? "text-green-200/80" : "text-green-800"}`}>
              If something feels wrong, it probably is. Your safety matters more than being polite. Don't hesitate to block, report, or walk away from any situation that makes you uncomfortable.
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