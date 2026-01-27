"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, Bell, User } from "lucide-react";
import { useDarkMode } from "@/lib/DarkModeContext";
import { useAuth } from "@/lib/AuthContext";
import { useSocket } from "@/lib/SocketContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  
  const { darkMode, setDarkMode } = useDarkMode();
  const { isLoggedIn } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    if (isLoggedIn) {
      fetchUnreadCount();
      fetchNotifications();
    }
  }, [isLoggedIn]);

  // Listen for real-time notifications
  useEffect(() => {
    if (!socket) return;

    socket.on("new_notification", (data) => {
      console.log("New notification received:", data);
      setUnreadCount(prev => prev + 1);
      fetchNotifications();
    });

    socket.on("match_accepted", (data) => {
      console.log("Match accepted:", data);
      fetchNotifications();
    });

    return () => {
      socket.off("new_notification");
      socket.off("match_accepted");
    };
  }, [socket]);

  const fetchUnreadCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUnreadCount(data.count);
    } catch (error) {
      console.error("Fetch unread count error:", error);
    }
  };

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error("Fetch notifications error:", error);
    }
  };

  const handleAcceptMatch = async (matchId: string, notificationId: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/matches/${matchId}/accept`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to accept match");

      const data = await res.json();
      
      // Remove notification
      setNotifications(notifications.filter(n => n._id !== notificationId));
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      alert("Match accepted! You can now chat.");
      window.location.href = `/chats?chat=${data.chatId}`;
    } catch (error) {
      console.error("Accept match error:", error);
      alert("Failed to accept match");
    }
  };

  const handleRejectMatch = async (matchId: string, notificationId: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/matches/${matchId}/reject`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to reject match");

      // Remove notification
      setNotifications(notifications.filter(n => n._id !== notificationId));
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      alert("Match rejected");
    } catch (error) {
      console.error("Reject match error:", error);
      alert("Failed to reject match");
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 transition-opacity`}>
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
                  <div className="relative">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className={`p-2 rounded-full transition-all relative ${
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
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                      <div className={`absolute top-12 right-0 w-80 max-h-96 overflow-y-auto rounded-2xl shadow-2xl border ${
                        darkMode ? "bg-orange-900/95 border-orange-800/30 backdrop-blur-sm" : "bg-white border-orange-200"
                      }`}>
                        <div className={`p-4 border-b ${darkMode ? "border-orange-800/30" : "border-orange-200"}`}>
                          <h3 className={`font-bold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                            Notifications
                          </h3>
                        </div>
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center">
                            <Bell className={`w-12 h-12 mx-auto mb-2 ${darkMode ? "text-orange-400/50" : "text-orange-600/50"}`} />
                            <p className={`text-sm ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                              No notifications
                            </p>
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div key={notif._id} className={`p-4 border-b ${darkMode ? "border-orange-800/30" : "border-orange-200"}`}>
                              {notif.type === 'match_request' && (
                                <>
                                  <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-semibold text-sm">
                                      {notif.sender.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                      <p className={`text-sm font-medium ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                                        {notif.sender.name} wants to match with you!
                                      </p>
                                      <p className={`text-xs ${darkMode ? "text-orange-300/70" : "text-orange-600/70"}`}>
                                        Knows: {notif.sender.languagesKnow[0]?.language}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleAcceptMatch(notif.matchId._id, notif._id)}
                                      className="flex-1 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-all"
                                    >
                                      Accept
                                    </button>
                                    <button
                                      onClick={() => handleRejectMatch(notif.matchId._id, notif._id)}
                                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                                        darkMode 
                                          ? "bg-orange-900/30 text-orange-300 hover:bg-orange-900/50" 
                                          : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                      }`}
                                    >
                                      Decline
                                    </button>
                                  </div>
                                </>
                              )}
                              {notif.type === 'match_accepted' && (
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                                    ✓
                                  </div>
                                  <div>
                                    <p className={`text-sm font-medium ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                                      {notif.sender.name} accepted your match!
                                    </p>
                                    <Link 
                                      href="/chats"
                                      className="text-xs text-orange-500 hover:underline"
                                    >
                                      Start chatting →
                                    </Link>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>

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
                    Learn
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
                    href="/creators"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-center transition-all ${
                      darkMode
                        ? "text-orange-200 hover:bg-orange-900/40"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    Creators
                  </Link>
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