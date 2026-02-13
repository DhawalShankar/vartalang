// components/notifications/NotificationDropdown.tsx
// ✅ NAVBAR STYLE DROPDOWN - EXACTLY LIKE MOBILE MENU

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell, MessageCircle, Loader2 } from "lucide-react";
import { useDarkMode } from "@/lib/DarkModeContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const POLLING_INTERVAL = 30000;

interface Notification {
  _id: string;
  type: string;
  sender?: {
    _id?: string;
    name: string;
    languagesKnow?: any[];
    primaryLanguageToLearn?: string;
  };
  message?: string;
  chatId?: any;
  matchId?: any;
  read: boolean;
  createdAt: string;
}

interface NotificationDropdownProps {
  showBellIcon?: boolean;
  className?: string;
}

export default function NotificationDropdown({ 
  showBellIcon = true,
  className = ""
}: NotificationDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingMatchId, setProcessingMatchId] = useState<string | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { darkMode } = useDarkMode();

  const extractId = (value: any): string | undefined => {
    if (!value) return undefined;
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value._id) {
      return typeof value._id === 'string' ? value._id : value._id.toString();
    }
    return undefined;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchUnreadCount();
    fetchNotifications();

    const interval = setInterval(() => {
      fetchUnreadCount();
      if (showDropdown) {
        fetchNotifications();
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [showDropdown]);

  useEffect(() => {
    if (!showDropdown) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const fetchUnreadCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      setUnreadCount(data.count);
    } catch (error) {
      console.error("❌ Fetch unread count error:", error);
    }
  };

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsFetching(true);

    try {
      const res = await fetch(`${API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      console.log("📥 Fetched notifications:", data.notifications);
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("❌ Fetch notifications error:", error);
      setError("Failed to load notifications");
    } finally {
      setIsFetching(false);
    }
  };

  const handleNotificationClick = async (notificationId: string, chatId?: any, matchId?: any) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const actualChatId = extractId(chatId);
    const actualMatchId = extractId(matchId);
    
    try {
      const res = await fetch(`${API_URL}/notifications/${notificationId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete notification");

      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      setUnreadCount(prev => Math.max(0, prev - 1));
      setShowDropdown(false);

      if (actualChatId) {
        router.push(`/chats?chat=${actualChatId}`);
      } else if (actualMatchId) {
        router.push(`/matches`);
      }
    } catch (error) {
      console.error("❌ Delete notification error:", error);
    }
  };

  const handleMatchAction = async (e: React.MouseEvent, notificationId: string, matchId: any, action: 'accept' | 'reject') => {
    console.log("🎯 BUTTON CLICKED!", action);
    e.preventDefault();
    e.stopPropagation();
    
    const token = localStorage.getItem("token");
    const actualMatchId = extractId(matchId);
    
    console.log("Match ID:", actualMatchId);
    console.log("Token exists:", !!token);
    
    if (!token) {
      alert("Please login again");
      return;
    }

    if (!actualMatchId) {
      console.error("No match ID found:", matchId);
      alert("Invalid match request");
      return;
    }

    if (processingMatchId === actualMatchId) {
      console.log("Already processing");
      return;
    }

    setProcessingMatchId(actualMatchId);
    setIsLoading(true);

    try {
      const url = `${API_URL}/matches/${actualMatchId}/${action}`;
      console.log("📍 Calling:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      console.log("📥 Response status:", response.status);
      
      const responseText = await response.text();
      console.log("📄 Response:", responseText);

      if (!response.ok) {
        let errorMessage = `Failed to ${action} match`;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          errorMessage = responseText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        data = { message: responseText };
      }

      console.log("✅ Success:", data);

      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      if (action === 'accept') {
        const actualChatId = extractId(data.chatId);
        if (actualChatId) {
          setShowDropdown(false);
          setTimeout(() => {
            router.push(`/chats?chat=${actualChatId}`);
          }, 500);
        } else {
          alert("Match accepted!");
        }
      } else {
        setTimeout(() => {
          fetchUnreadCount();
          fetchNotifications();
        }, 500);
      }

    } catch (error) {
      console.error("❌ Error:", error);
      alert(error instanceof Error ? error.message : `Failed to ${action} match`);
      
      setTimeout(() => {
        fetchNotifications();
        fetchUnreadCount();
      }, 500);
    } finally {
      setIsLoading(false);
      setProcessingMatchId(null);
    }
  };

  const clearAllNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token || isLoading) return;

    if (!confirm("This will reject all pending match requests. Continue?")) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/notifications/messages/all`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Failed to clear notifications (${response.status})`);
      }

      const data = await response.json();
      
      setNotifications([]);
      setUnreadCount(0);
      setShowDropdown(false);
      
      alert(`Cleared ${data.count} notifications`);
      
      setTimeout(() => {
        fetchUnreadCount();
        fetchNotifications();
      }, 100);
    } catch (error) {
      console.error("❌ Clear all error:", error);
      alert("Failed to clear notifications");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {showBellIcon && (
        <button
          onClick={() => {
            setShowDropdown(!showDropdown);
            if (!showDropdown) {
              fetchNotifications();
            }
          }}
          className={`p-2 rounded-full transition-all relative ${
            darkMode
              ? "bg-orange-900/30 hover:bg-orange-900/50"
              : "bg-orange-50 hover:bg-orange-100"
          }`}
          aria-label="Notifications"
        >
          <Bell className={`w-4 h-4 ${darkMode ? "text-orange-300" : "text-orange-700"}`} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      )}

      {/* ✅ DROPDOWN - EXACTLY LIKE NAVBAR MOBILE MENU */}
      {showDropdown && (
        <div
          className={`fixed left-0 right-0 top-18 z-40 px-4 md:absolute md:left-auto md:right-0 md:top-full md:mt-2 md:w-96 md:px-0 ${
            darkMode ? "" : ""
          }`}
        >
          <div
            className={`rounded-2xl border backdrop-blur-xl overflow-hidden max-h-[calc(100vh-100px)] md:max-h-96 ${
              darkMode
                ? "bg-[#2a1f1a]/90 border-orange-900/30"
                : "bg-white/90 border-orange-100"
            }`}
          >
            {/* ✅ HEADER */}
            <div className={`p-4 border-b ${darkMode ? "border-orange-900/30" : "border-orange-100"}`}>
              <div className="flex items-center justify-between">
                <h3 className={`font-bold text-base flex items-center gap-2 ${darkMode ? "text-orange-100" : "text-gray-900"}`}>
                  Notifications
                  {isFetching && <Loader2 className="w-4 h-4 animate-spin text-orange-500" />}
                </h3>
                
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    disabled={isLoading}
                    className={`text-sm ${
                      darkMode ? "text-orange-400 hover:text-orange-300" : "text-orange-600 hover:text-orange-700"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isLoading ? "Clearing..." : "Clear all"}
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border-b border-red-500/20">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            {/* ✅ SCROLLABLE CONTENT */}
            <div className="overflow-y-auto max-h-[calc(100vh-180px)] md:max-h-80">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageCircle className={`w-12 h-12 mx-auto mb-3 ${darkMode ? "text-orange-400/50" : "text-orange-600/50"}`} />
                  <p className={`text-sm ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                    No new notifications
                  </p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {notifications.map((notif) => {
                    const actualMatchId = extractId(notif.matchId);
                    const actualChatId = extractId(notif.chatId);
                    
                    // ✅ Match request
                    if (notif.type === 'match_request') {
                      return (
                        <div
                          key={notif._id}
                          className={`p-4 border-b transition-all ${
                            darkMode 
                              ? "border-orange-900/30 hover:bg-orange-900/20" 
                              : "border-orange-100 hover:bg-orange-50"
                          } ${!notif.read ? (darkMode ? "bg-orange-900/10" : "bg-orange-50/50") : ""}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                              {notif.sender?.name?.slice(0, 2).toUpperCase() || "??"}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className={`text-sm font-semibold truncate ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                                  {notif.sender?.name || "Someone"}
                                </p>
                                {!notif.read && (
                                  <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 animate-pulse"></div>
                                )}
                              </div>

                              <p className={`text-sm mb-3 ${darkMode ? "text-orange-200/80" : "text-orange-800"}`}>
                                Sent you a match request
                              </p>

                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => handleMatchAction(e, notif._id, notif.matchId, 'accept')}
                                  disabled={isLoading || processingMatchId === actualMatchId}
                                  className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold bg-linear-to-r from-orange-500 to-red-600 text-white hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {processingMatchId === actualMatchId ? "..." : "Accept"}
                                </button>
                                <button
                                  onClick={(e) => handleMatchAction(e, notif._id, notif.matchId, 'reject')}
                                  disabled={isLoading || processingMatchId === actualMatchId}
                                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${
                                    darkMode 
                                      ? "bg-orange-900/30 text-orange-200 hover:bg-orange-900/50" 
                                      : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                  }`}
                                >
                                  {processingMatchId === actualMatchId ? "..." : "Reject"}
                                </button>
                              </div>

                              <p className={`text-xs mt-2 ${darkMode ? "text-orange-300/50" : "text-orange-600/50"}`}>
                                {new Date(notif.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // ✅ Other notifications
                    return (
                      <button
                        key={notif._id}
                        onClick={() => handleNotificationClick(notif._id, actualChatId, actualMatchId)}
                        className={`w-full text-left p-4 border-b transition-all active:scale-[0.98] ${
                          darkMode 
                            ? "border-orange-900/30 hover:bg-orange-900/20" 
                            : "border-orange-100 hover:bg-orange-50"
                        } ${!notif.read ? (darkMode ? "bg-orange-900/10" : "bg-orange-50/50") : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                            {notif.sender?.name?.slice(0, 2).toUpperCase() || "??"}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className={`text-sm font-semibold truncate ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                                {notif.sender?.name || "Someone"}
                              </p>
                              {!notif.read && (
                                <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 animate-pulse"></div>
                              )}
                            </div>

                            {notif.type === "new_message" && (
                              <p className={`text-sm line-clamp-2 ${darkMode ? "text-orange-200/80" : "text-orange-800"}`}>
                                {notif.message || "Sent you a message"}
                              </p>
                            )}

                            {notif.type === "match_accepted" && (
                              <p className={`text-sm ${darkMode ? "text-orange-200/80" : "text-orange-800"}`}>
                                Accepted your match request! 🎉
                              </p>
                            )}

                            <p className={`text-xs mt-1 ${darkMode ? "text-orange-300/50" : "text-orange-600/50"}`}>
                              {new Date(notif.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}