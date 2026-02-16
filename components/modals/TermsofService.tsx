// components/modals/TermsModal.tsx

"use client";

import { X } from "lucide-react";
import { useDarkMode } from "@/lib/DarkModeContext";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
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
          <h2 className={`text-xl font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            Terms of Service
          </h2>
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
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/70" : "text-gray-600"}`}>
            Last Updated: February 13, 2026
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            1. Acceptance of Terms
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            By accessing and using VartaLang, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            2. User Responsibilities
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to:
          </p>
          <ul className={`list-disc list-inside space-y-1 mb-4 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            <li>Provide accurate and complete registration information</li>
            <li>Keep your password secure and confidential</li>
            <li>Notify us immediately of any unauthorized account access</li>
            <li>Be responsible for all activities under your account</li>
          </ul>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            3. Code of Conduct
          </h3>
          <p className={`text-sm mb-2 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            Users must:
          </p>
          <ul className={`list-disc list-inside space-y-1 mb-4 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            <li>Treat all community members with respect and dignity</li>
            <li>Not engage in harassment, hate speech, or discriminatory behavior</li>
            <li>Not share inappropriate, offensive, or illegal content</li>
            <li>Not impersonate others or misrepresent their identity</li>
            <li>Not spam or engage in unauthorized commercial solicitation</li>
            <li>Respect intellectual property rights</li>
            <li>Not attempt to hack, disrupt, or compromise platform security</li>
          </ul>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            4. Intellectual Property
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            All content on VartaLang, including text, graphics, logos, images, audio clips, and software, is the property of VartaLang or its content suppliers and is protected by Indian and international copyright laws.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            5. User-Generated Content
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            By posting content on VartaLang, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and display your content for the purpose of operating and improving our services. You retain ownership of your content.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            6. Language Learning Services
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            VartaLang provides a platform to connect language learners with teachers and native speakers. We do not guarantee specific learning outcomes. The quality of learning depends on individual effort and engagement.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            7. Matching System
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            Our AI-powered matching system connects users based on language preferences and learning goals. While we strive for quality matches, we cannot guarantee compatibility or success of every match.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            8. Safety and Reporting
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            If you experience or witness inappropriate behavior, please report it immediately using our in-app reporting features. We take all reports seriously and will investigate promptly.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            9. Termination
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful behavior. Users may also delete their accounts at any time from profile settings.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            10. Limitation of Liability
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            VartaLang is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.
          </p>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
          VartaLang does not participate in or manage any stage of the hiring process. We function solely as a job discovery platform, enabling users to connect directly with recruiters. We do not offer any assurance of interview selection or employment outcomes.
          </p>
          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            11. Changes to Terms
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            We may update these terms from time to time. Continued use of VartaLang after changes constitutes acceptance of the updated terms. We will notify users of significant changes.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            12. Governing Law
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Kanpur, Uttar Pradesh.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            13. Contact Us
          </h3>
          <p className={`text-sm mb-6 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            For questions about these terms, please contact us at vartalang@gmail.com or via WhatsApp at +91 7388270331.
          </p>

          <div className={`mt-8 p-4 rounded-xl ${
            darkMode ? "bg-orange-900/20 border border-orange-800/30" : "bg-orange-50 border border-orange-200"
          }`}>
            <p className={`text-sm font-medium ${darkMode ? "text-orange-200" : "text-orange-900"}`}>
              By using VartaLang, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}