"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useDarkMode } from "@/lib/DarkModeContext";

export default function Footer() {
  const { darkMode } = useDarkMode(); // Use context

  return (
    <footer className={`py-12 px-4 border-t ${
      darkMode ? "border-orange-900/30 bg-[#1a1410]" : "border-orange-100 bg-white/50"
    } backdrop-blur-xl`}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              darkMode
                ? "bg-linear-to-br from-orange-500 to-red-700"
                : "bg-linear-to-br from-orange-500 to-red-600"
            }`}>
              <span className="text-white text-sm font-bold">V</span>
            </div>
            <span className={`font-bold ${darkMode ? "text-orange-100" : "text-gray-800"}`}>
              VartaLang
            </span>
          </Link>

          <div className="flex gap-6 text-sm">
            {["Instagram", "Twitter", "Discord"].map((social) => (
              <a key={social} href="#" className={`font-medium transition-all hover:scale-110 ${
                darkMode ? "text-orange-300 hover:text-orange-200" : "text-gray-600 hover:text-gray-900"
              }`}>
                {social}
              </a>
            ))}
          </div>
        </div>

        <div className={`pt-6 border-t text-center ${darkMode ? "border-orange-900/30" : "border-orange-100"}`}>
          <p className={`text-xs font-medium flex items-center justify-center gap-1 ${
            darkMode ? "text-orange-300/80" : "text-gray-600"
          }`}>
            Built with <Heart className="w-3 h-3 fill-current text-red-500" /> for language learners across India
          </p>
          <p className={`text-xs mt-1 ${darkMode ? "text-orange-400/60" : "text-gray-500"}`}>
            © 2026 VartaLang • India's Language Bridge
          </p>
        </div>
      </div>
    </footer>
  );
}