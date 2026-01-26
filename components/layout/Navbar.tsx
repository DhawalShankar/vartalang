"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, Bell, User } from "lucide-react";
import { useDarkMode } from "@/lib/DarkModeContext";
import { useAuth } from "@/lib/AuthContext";
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();

  const { isLoggedIn} = useAuth();
  const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  
  return (
    <nav  className={`fixed top-0 left-0 right-0 z-50 py-4 transition-opacity`}>
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div
          className={`backdrop-blur-xl rounded-full border transition-all ${
            darkMode
              ? "bg-[#2a1f1a]/80 border-orange-900/30 shadow-xl shadow-orange-500/5"
              : "bg-white/80 border-orange-100 shadow-lg shadow-orange-200/20"
          }`}
        >
          <div className="flex justify-between items-center px-5 h-14">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2.5">
             
                <img
                  src="/logo.png"
                  alt="Vartalang Logo"
                  className="w-17 h-auto"
                />
              

              <span
                className={`text-base font-bold ${
                  darkMode ? "text-orange-100" : "text-gray-800"
                }`}
              >
                VartaLang
              </span>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-6">
              {isLoggedIn ? (
                <>
                  {/* Core Links */}
                  {[
                    { name: "Learn", href: "/learn" },
                    { name: "Chats", href: "/chats" },
                    { name: "Matches", href: "/matches" }, 
                    { name: "Creators", href: "/creators" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-sm font-semibold transition-colors ${
                        darkMode
                          ? "text-orange-200 hover:text-orange-100"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Notification */}
                  <button
                    className={`p-2 rounded-full transition-all ${
                      darkMode
                        ? "bg-orange-900/30 hover:bg-orange-900/50"
                        : "bg-orange-50 hover:bg-orange-100"
                    }`}
                  >
                    <Bell
                      className={`w-4 h-4 ${
                        darkMode ? "text-orange-300" : "text-orange-700"
                      }`}
                    />
                  </button>

                  {/* Profile */}
                  <Link href="/profile">
                    <button
                      className={`p-2 rounded-full transition-all ${
                        darkMode
                          ? "bg-orange-900/30 hover:bg-orange-900/50"
                          : "bg-orange-50 hover:bg-orange-100"
                      }`}
                    >
                      <User
                        className={`w-4 h-4 ${
                          darkMode ? "text-orange-300" : "text-orange-700"
                        }`}
                      />
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className={`text-sm font-medium ${
                      darkMode
                        ? "text-orange-200 hover:text-orange-100"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-5 py-2 rounded-full text-sm font-semibold bg-linear-to-r from-orange-500 to-red-600 text-white hover:scale-105 transition-all"
                  >
                    Join Now
                  </Link>
                </>
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  darkMode
                    ? "bg-orange-900/30"
                    : "bg-orange-50 hover:bg-orange-100"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-orange-300" />
                ) : (
                  <Moon className="w-4 h-4 text-orange-700" />
                )}
              </button>
            </div>

            {/* MOBILE BUTTONS */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-1.5 rounded-full ${
                  darkMode ? "bg-orange-900/30" : "bg-orange-50"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-orange-300" />
                ) : (
                  <Moon className="w-4 h-4 text-orange-700" />
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={darkMode ? "text-orange-100" : "text-gray-800"}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {mobileMenuOpen && (
          <div
            className={`mt-3 rounded-2xl border backdrop-blur-xl p-4 ${
              darkMode
                ? "bg-[#2a1f1a]/90 border-orange-900/30"
                : "bg-white/90 border-orange-100 text-gray-800/90"
            }`}
          >
            <div className="flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link className="mobile-link" href="/learn">
                    Learn
                  </Link>
                  <Link className="mobile-link" href="/chats">
                    Chats
                  </Link>
                  <Link className="mobile-link" href="/matches">
                    Matches
                  </Link>
                  <Link className="mobile-link" href="/creators">
                    Creators
                  </Link>
                </>
              ) : (
                <>
                  <Link className="mobile-link" href="/auth/login">
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-center bg-linear-to-r from-orange-500 to-red-600 text-white"
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .mobile-link {
          padding: 10px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          transition: all 0.2s;
          color: ${darkMode ? "#fed7aa" : "#374151"};
        }
        .mobile-link:hover {
          background: ${darkMode
            ? "rgba(124,45,18,0.4)"
            : "rgba(255,237,213,0.8)"};
        }
      `}</style>
    </nav>
  );
}
