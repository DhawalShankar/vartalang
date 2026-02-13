// components/layout/Footer.tsx

"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, Mail, MapPin, Instagram, Twitter, MessageCircle, Shield } from "lucide-react";
import { useDarkMode } from "@/lib/DarkModeContext";
import TermsModal from "@/components/modals/TermsofService";
import PrivacyModal from "@/components/modals/PrivacyPolicy";
import CodeOfConductModal from "@/components/modals/CodeofConduct";
import SafetyGuidelinesModal from "@/components/modals/SafetyGuidelines";

export default function Footer() {
  const { darkMode } = useDarkMode();
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCodeOfConduct, setShowCodeOfConduct] = useState(false);
  const [showSafety, setShowSafety] = useState(false);

  const footerLinks: Array<{
    title: string;
    links: Array<{ name: string; href?: string; onClick?: () => void }>;
  }> = [
    {
      title: "Product",
      links: [
        { name: "For Teachers", href: "/teachers" },
        { name: "Jobs Board", href: "/jobs" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Story", href: "/about" },
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Code of Conduct", onClick: () => setShowCodeOfConduct(true) },
        { name: "Safety Guidelines", onClick: () => setShowSafety(true) },
      ]
    },
  ];

  const socials = [
    { name: "Instagram", href: "https://instagram.com/vartalang", icon: Instagram },
    { name: "Twitter", href: "https://x.com/vartalang", icon: Twitter },
    { name: "WhatsApp", href: "https://wa.me/7388270331", icon: MessageCircle },
  ];

  return (
    <>
      <footer className={`relative overflow-hidden border-t ${
        darkMode ? "border-orange-900/30 bg-[#1a1410]" : "border-orange-100 bg-white"
      }`}>
        {/* Subtle Background Gradient */}
        <div className={`absolute inset-0 pointer-events-none ${
          darkMode 
            ? 'bg-linear-to-b from-orange-900/5 to-transparent' 
            : 'bg-linear-to-b from-orange-50/30 to-transparent'
        }`}></div>

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <img
                  src="/logo.png"
                  alt="VartaLang Logo"
                  className="h-20"
                />
                <span className={`text-xl font-bold ${darkMode ? "text-orange-100" : "text-gray-900"}`}>
                  VartaLang
                </span>
              </Link>
              <p className={`text-sm leading-relaxed mb-6 max-w-sm ${
                darkMode ? "text-orange-200/70" : "text-gray-600"
              }`}>
                India's inclusive language learning ecosystem. Connecting learners with creators, tradition with opportunity—for every Indian.
                <br /> Images shown are for representation purposes only. 
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:scale-110 ${
                      darkMode
                        ? "bg-orange-900/20 border-orange-800/40 text-orange-300 hover:bg-orange-900/30"
                        : "bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100"
                    }`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {footerLinks.map((section, i) => (
              <div key={i}>
                <h4 className={`text-sm font-semibold mb-4 ${
                  darkMode ? "text-orange-200" : "text-gray-900"
                }`}>
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          className={`text-sm transition-colors ${
                            darkMode
                              ? "text-orange-300/70 hover:text-orange-200"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <button
                          onClick={link.onClick}
                          className={`text-sm transition-colors text-left ${
                            darkMode
                              ? "text-orange-300/70 hover:text-orange-200"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {link.name}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className={`py-6 mb-6 border-y ${darkMode ? "border-orange-900/30" : "border-orange-100"}`}>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              <a
                href="mailto:vartalang@gmail.com"
                className={`flex items-center gap-2 text-sm transition-colors ${
                  darkMode
                    ? "text-orange-300/70 hover:text-orange-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Mail className="w-4 h-4" />
                vartalang@gmail.com
              </a>
              <div className={`flex items-center gap-2 text-sm ${
                darkMode ? "text-orange-300/70" : "text-gray-600"
              }`}>
                <MapPin className="w-4 h-4" />
                Kanpur, Uttar Pradesh, India
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-xs font-medium flex items-center gap-1.5 ${
              darkMode ? "text-orange-300/80" : "text-gray-600"
            }`}>
              Built with <Heart className="w-3.5 h-3.5 fill-current text-red-500" /> for language learners across India
            </p>
            
            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowTerms(true)}
                className={`text-xs transition-colors ${
                  darkMode
                    ? "text-orange-400/60 hover:text-orange-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Terms of Service
              </button>
              <button
                onClick={() => setShowPrivacy(true)}
                className={`text-xs transition-colors ${
                  darkMode
                    ? "text-orange-400/60 hover:text-orange-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Privacy Policy
              </button>
              <p className={`text-xs ${darkMode ? "text-orange-400/60" : "text-gray-500"}`}>
                © 2026 VartaLang
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* All Modals */}
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <CodeOfConductModal isOpen={showCodeOfConduct} onClose={() => setShowCodeOfConduct(false)} />
      <SafetyGuidelinesModal isOpen={showSafety} onClose={() => setShowSafety(false)} />
    </>
  );
}