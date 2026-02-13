// components/modals/PrivacyModal.tsx

"use client";

import { X } from "lucide-react";
import { useDarkMode } from "@/lib/DarkModeContext";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
            Privacy Policy
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

          <p className={`text-sm mb-6 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            VartaLang ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our language learning platform.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            1. Information We Collect
          </h3>
          
          <h4 className={`text-base font-semibold mt-4 mb-2 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
            1.1 Information You Provide
          </h4>
          <ul className={`list-disc list-inside space-y-1 mb-4 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            <li><strong>Account Information:</strong> Name, email address, password, phone number</li>
            <li><strong>Profile Information:</strong> Languages you know, languages you want to learn, fluency levels, bio, profile picture</li>
            <li><strong>Communication Data:</strong> Messages sent through our chat system</li>
            <li><strong>Payment Information:</strong> Billing details for premium features (processed securely through third-party providers)</li>
          </ul>

          <h4 className={`text-base font-semibold mt-4 mb-2 ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
            1.2 Automatically Collected Information
          </h4>
          <ul className={`list-disc list-inside space-y-1 mb-4 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
            <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform</li>
            <li><strong>Location Data:</strong> Approximate location based on IP address</li>
            <li><strong>Cookies:</strong> We use cookies to improve user experience and analytics</li>
          </ul>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            2. How We Use Your Information
          </h3>
          <ul className={`list-disc list-inside space-y-1 mb-4 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            <li>To create and manage your account</li>
            <li>To match you with suitable language learning partners using our AI algorithm</li>
            <li>To facilitate communication between users</li>
            <li>To provide customer support and respond to inquiries</li>
            <li>To improve our services and develop new features</li>
            <li>To send important updates, notifications, and promotional content (you can opt out)</li>
            <li>To detect and prevent fraud, abuse, and security incidents</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            3. How We Share Your Information
          </h3>
          <p className={`text-sm mb-2 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            We do not sell your personal information. We may share information in the following circumstances:
          </p>
          <ul className={`list-disc list-inside space-y-1 mb-4 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            <li><strong>With Other Users:</strong> Your profile information (name, languages, bio) is visible to matched users</li>
            <li><strong>With Service Providers:</strong> Third-party companies that help us operate our platform (hosting, analytics, payment processing)</li>
            <li><strong>For Legal Reasons:</strong> When required by law or to protect our rights and safety</li>
            <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
          </ul>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            4. Data Security
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            We implement industry-standard security measures to protect your data:
          </p>
          <ul className={`list-disc list-inside space-y-1 mb-4 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            <li>Encryption of data in transit and at rest</li>
            <li>Secure authentication and password hashing</li>
            <li>Regular security audits and updates</li>
            <li>Limited employee access to personal data</li>
            <li>Monitoring for suspicious activity</li>
          </ul>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            5. Data Retention
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            We retain your personal information for as long as your account is active or as needed to provide services. When you delete your account, we delete or anonymize your data within 30 days, except where we must retain it for legal compliance.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            6. Your Rights and Choices
          </h3>
          <p className={`text-sm mb-2 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            You have the following rights regarding your personal data:
          </p>
          <ul className={`list-disc list-inside space-y-1 mb-4 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
            <li><strong>Deletion:</strong> Request deletion of your account and data</li>
            <li><strong>Portability:</strong> Receive your data in a portable format</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            <li><strong>Restriction:</strong> Request limited processing of your data</li>
          </ul>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            To exercise these rights, contact us at vartalang@gmail.com.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            7. Children's Privacy
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            VartaLang is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            8. International Data Transfers
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            Your information may be transferred to and processed in countries other than India. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            9. Third-Party Links
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any information.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            10. Changes to This Privacy Policy
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a notice on our platform. Your continued use after changes indicates acceptance of the updated policy.
          </p>

          <h3 className={`text-lg font-semibold mt-6 mb-3 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
            11. Contact Us
          </h3>
          <p className={`text-sm mb-2 ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
          </p>
          <ul className={`list-none space-y-1 mb-6 text-sm ${darkMode ? "text-orange-200/80" : "text-gray-700"}`}>
            <li><strong>Email:</strong> vartalang@gmail.com</li>
            <li><strong>WhatsApp:</strong> +91 7388270331</li>
            <li><strong>Address:</strong> Kanpur, Uttar Pradesh, India</li>
          </ul>

          <div className={`mt-8 p-4 rounded-xl ${
            darkMode ? "bg-orange-900/20 border border-orange-800/30" : "bg-orange-50 border border-orange-200"
          }`}>
            <p className={`text-sm font-medium ${darkMode ? "text-orange-200" : "text-orange-900"}`}>
              Your privacy is important to us. We are committed to protecting your personal information and being transparent about how we use it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}