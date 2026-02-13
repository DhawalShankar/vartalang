// components/notifications/NotificationDropdown.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell, MessageCircle } from "lucide-react";
import { useDarkMode } from "@/lib/DarkModeContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Notification {
  _id: string;
  type: string;
  sender?: {
    name: string;
    languagesKnow?: any[];
    primaryLanguageToLearn?: string;
  };
  message?: string;
  chatId?: string;
  matchId?: string;
  read: boolean;
  createdAt: string;
}

interface NotificationDropdownProps {
  /** Whether to show the bell icon (true for desktop, false for mobile where it's separate) */
  showBellIcon?: boolean;
  /** Custom class for positioning/styling */
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
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { darkMode } = useDarkMode();

  // ✅ Fetch notifications and count on mount
  useEffect(() => {
    fetchUnreadCount();
    fetchNotifications();

    // Poll every 30 seconds
    const interval = setInterval(() => {
      fetchUnreadCount();
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Close dropdown on outside click
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
      
      if (!res.ok) throw new Error("Failed to fetch count");
      
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
      
      if (!res.ok) throw new Error("Failed to fetch notifications");
      
      const data = await res.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error("Fetch notifications error:", error);
    }
  };

  const handleNotificationClick = async (notificationId: string, chatId?: string, matchId?: string) => {
    const token = localStorage.getItem("token");
    
    try {
      // Delete notification
      await fetch(`${API_URL}/notifications/${notificationId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update UI
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      setUnreadCount(prev => Math.max(0, prev - 1));
      setShowDropdown(false);

      // Navigate based on notification type
      if (chatId) {
        router.push(`/chats?chat=${chatId}`);
      } else if (matchId) {
        router.push(`/matches`);
      }
    } catch (error) {
      console.error("Delete notification error:", error);
    }
  };

  const handleMatchAction = async (notificationId: string, matchId: string, action: 'accept' | 'reject') => {
    const token = localStorage.getItem("token");
    if (!token || isLoading) return;

    setIsLoading(true);

    try {
      console.log(`🤝 ${action === 'accept' ? 'Accepting' : 'Rejecting'} match ${matchId}...`);

      // Call backend API
      const response = await fetch(`${API_URL}/matches/${matchId}/${action}`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} match`);
      }

      const data = await response.json();
      console.log(`✅ Match ${action}ed:`, data);

      // Remove notification from UI
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      setUnreadCount(prev => Math.max(0, prev - 1));

      // Show success message and refresh
      if (action === 'accept') {
        // Navigate to chat
        if (data.chatId) {
          router.push(`/chats?chat=${data.chatId}`);
        } else {
          router.push('/matches');
        }
      }

      // Close dropdown
      setShowDropdown(false);

    } catch (error) {
      console.error(`❌ ${action} match error:`, error);
      alert(`Failed to ${action} match request. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token || isLoading) return;

    setIsLoading(true);
    
    try {
      console.log("🧹 Clearing all notifications...");
      
      const response = await fetch(`${API_URL}/notifications/messages/all`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ Cleared ${data.count} notifications`);
      
      // Update UI
      setNotifications([]);
      setUnreadCount(0);
      setShowDropdown(false);
      
      // Refresh from server
      setTimeout(() => {
        fetchUnreadCount();
        fetchNotifications();
      }, 100);
    } catch (error) {
      console.error("❌ Clear all error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Bell Icon Button */}
      {showBellIcon && (
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`p-2 rounded-full transition-all relative ${
            darkMode
              ? "bg-orange-900/30 hover:bg-orange-900/50"
              : "bg-orange-50 hover:bg-orange-100"
          }`}
          aria-label="Notifications"
        >
          <Bell
            className={`w-4 h-4 ${
              darkMode ? "text-orange-300" : "text-orange-700"
            }`}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Dropdown */}
      {showDropdown && (
        <div
          className={`absolute right-0 md:right-auto mt-3 w-[calc(100vw-2rem)] md:w-96 max-h-[80vh] md:max-h-96 overflow-y-auto rounded-2xl shadow-2xl border z-50 ${
            darkMode
              ? "bg-[#2a1f1a]/95 border-orange-800/30 backdrop-blur-sm"
              : "bg-white border-orange-200"
          }`}
        >
          {/* Header */}
          <div
            className={`p-4 border-b sticky top-0 z-10 ${
              darkMode
                ? "border-orange-800/30 bg-[#2a1f1a]/95"
                : "border-orange-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3
                className={`font-bold ${
                  darkMode ? "text-orange-100" : "text-orange-900"
                }`}
              >
                Notifications
              </h3>
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  disabled={isLoading}
                  className={`text-xs ${
                    darkMode
                      ? "text-orange-400 hover:text-orange-300"
                      : "text-orange-600 hover:text-orange-700"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? "Clearing..." : "Clear all"}
                </button>
              )}
            </div>
          </div>

          {/* Notification List */}
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <MessageCircle
                className={`w-12 h-12 mx-auto mb-2 ${
                  darkMode ? "text-orange-400/50" : "text-orange-600/50"
                }`}
              />
              <p
                className={`text-sm ${
                  darkMode ? "text-orange-200/70" : "text-orange-700/70"
                }`}
              >
                No new notifications
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                className={`border-b last:border-b-0 ${
                  darkMode ? "border-orange-800/30" : "border-orange-200"
                } ${
                  !notif.read
                    ? darkMode
                      ? "bg-orange-900/20"
                      : "bg-orange-50/50"
                    : ""
                }`}
              >
                <button
                  onClick={() => {
                    // Only navigate for non-match_request notifications
                    if (notif.type !== 'match_request') {
                      handleNotificationClick(notif._id, notif.chatId, notif.matchId);
                    }
                  }}
                  className="w-full text-left hover:opacity-80 transition-opacity p-4"
                  disabled={notif.type === 'match_request'}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                      {notif.sender?.name?.slice(0, 2).toUpperCase() || "??"}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p
                          className={`text-sm font-semibold truncate ${
                            darkMode ? "text-orange-100" : "text-orange-900"
                          }`}
                        >
                          {notif.sender?.name || "Someone"}
                        </p>
                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
                        )}
                      </div>

                      {/* Message Preview */}
                      {notif.type === "new_message" && (
                        <p
                          className={`text-sm line-clamp-2 ${
                            darkMode ? "text-orange-200/80" : "text-orange-800"
                          }`}
                        >
                          {notif.message || "Sent you a message"}
                        </p>
                      )}

                      {notif.type === "match_request" && (
                        <>
                          <p
                            className={`text-sm mb-2 ${
                              darkMode ? "text-orange-200/80" : "text-orange-800"
                            }`}
                          >
                            Sent you a match request
                          </p>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                await handleMatchAction(notif._id, notif.matchId!, 'accept');
                              }}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-linear-to-r from-orange-500 to-red-600 text-white hover:scale-105 transition-all"
                            >
                              Accept
                            </button>
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                await handleMatchAction(notif._id, notif.matchId!, 'reject');
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                darkMode 
                                  ? "bg-orange-900/30 text-orange-200 hover:bg-orange-900/50" 
                                  : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                              }`}
                            >
                              Reject
                            </button>
                          </div>
                        </>
                      )}

                      {notif.type === "match_accepted" && (
                        <p
                          className={`text-sm ${
                            darkMode ? "text-orange-200/80" : "text-orange-800"
                          }`}
                        >
                          Accepted your match request!
                        </p>
                      )}

                      {/* Timestamp */}
                      <p
                        className={`text-xs mt-1 ${
                          darkMode
                            ? "text-orange-300/50"
                            : "text-orange-600/50"
                        }`}
                      >
                        {new Date(notif.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}