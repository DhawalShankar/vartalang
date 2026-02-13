// components/layout/Navbar.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, User, GraduationCap } from "lucide-react";
import { useDarkMode } from "@/lib/DarkModeContext";
import { useAuth } from "@/lib/AuthContext";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<'learner' | 'teacher' | null>(null);
  
  const pathname = usePathname();
  const { darkMode, setDarkMode } = useDarkMode();
  const { isLoggedIn } = useAuth();

  // ✅ Fetch user profile to get role
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    } else {
      setUserRole(null);
    }
  }, [isLoggedIn]);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error("Failed to fetch profile");
      
      const data = await res.json();
      setUserRole(data.user.primaryRole);
    } catch (error) {
      console.error("Fetch profile error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 transition-opacity">
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
                  {[
                    { name: "Learn and Practice", href: "/learn" },
                    { name: "Matches", href: "/matches" },
                    { name: "Chats", href: "/chats" },
                    { name: "Jobs", href: "/jobs" },
                    { name: "About", href: "/about" },
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

                  {/* ✅ Conditionally show Teachers link - Only for teachers */}
                  {userRole === 'teacher' && (
                    <Link
                      href="/teachers"
                      className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                        darkMode
                          ? "text-orange-200 hover:text-orange-100"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      Teachers
                    </Link>
                  )}

                  {/* ✅ Notification Dropdown Component */}
                  <NotificationDropdown showBellIcon={true} />

                  {/* Profile Button */}
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
              {isLoggedIn && (
                <NotificationDropdown showBellIcon={true} />
              )}
              
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

        {/* MOBILE DROPDOWN MENU */}
        {mobileMenuOpen && (
          <div
            className={`mt-3 rounded-2xl border backdrop-blur-xl p-4 ${
              darkMode
                ? "bg-[#2a1f1a]/90 border-orange-900/30"
                : "bg-white/90 border-orange-100"
            }`}
          >
            <div className="flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/learn"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-center transition-all ${
                      darkMode
                        ? "text-orange-200 hover:bg-orange-900/40"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    Learn and Practice
                  </Link>
                  <Link
                    href="/matches"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-center transition-all ${
                      darkMode
                        ? "text-orange-200 hover:bg-orange-900/40"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    Matches
                  </Link>
                  <Link
                    href="/chats"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-center transition-all ${
                      darkMode
                        ? "text-orange-200 hover:bg-orange-900/40"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    Chats
                  </Link>
                  <Link
                    href="/jobs"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-center transition-all ${
                      darkMode
                        ? "text-orange-200 hover:bg-orange-900/40"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    Jobs
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-center transition-all ${
                      darkMode
                        ? "text-orange-200 hover:bg-orange-900/40"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    About
                  </Link>

                  {/* ✅ Conditionally show Teachers link in mobile - Only for teachers */}
                  {userRole === 'teacher' && (
                    <Link
                      href="/teachers"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-center transition-all flex items-center justify-center gap-2 ${
                        darkMode
                          ? "text-orange-200 hover:bg-orange-900/40"
                          : "text-gray-700 hover:bg-orange-50"
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      Teachers
                    </Link>
                  )}

                  <div className="h-px bg-linear-to-r from-transparent via-orange-500/30 to-transparent my-2"></div>
                  
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-center transition-all flex items-center justify-center gap-2 ${
                      darkMode
                        ? "text-orange-200 hover:bg-orange-900/40"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-center transition-all ${
                      darkMode
                        ? "text-orange-200 hover:bg-orange-900/40"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-center bg-linear-to-r from-orange-500 to-red-600 text-white"
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}