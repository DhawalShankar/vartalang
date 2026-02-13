// components/notifications/NotificationDropdown.tsx
// FIXED VERSION - Properly handles match accept/reject

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell, MessageCircle, Loader2, X } from "lucide-react";
import { useDarkMode } from "@/lib/DarkModeContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const POLLING_INTERVAL = 30000; // 30 seconds

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

  // ✅ Initial fetch and polling setup
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Initial fetch
    fetchUnreadCount();
    fetchNotifications();

    // Setup polling
    const interval = setInterval(() => {
      fetchUnreadCount();
      if (showDropdown) {
        fetchNotifications();
      }
    }, POLLING_INTERVAL);

    console.log(`🔄 Notification polling started (every ${POLLING_INTERVAL/1000}s)`);

    return () => {
      clearInterval(interval);
      console.log("🛑 Notification polling stopped");
    };
  }, [showDropdown]);

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

  // ✅ Prevent body scroll when dropdown is open on mobile
  useEffect(() => {
    if (showDropdown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showDropdown]);

  const fetchUnreadCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          console.error("❌ Unauthorized - token may be invalid");
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      
      const data = await res.json();
      setUnreadCount(data.count);
      setError(null);
    } catch (error) {
      console.error("❌ Fetch unread count error:", error);
    }
  };

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsFetching(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Session expired. Please login again.");
        }
        throw new Error(`Failed to fetch notifications (${res.status})`);
      }
      
      const data = await res.json();
      setNotifications(data.notifications || []);
      console.log(`📥 Fetched ${data.notifications?.length || 0} notifications`);
    } catch (error) {
      console.error("❌ Fetch notifications error:", error);
      setError(error instanceof Error ? error.message : "Failed to load notifications");
    } finally {
      setIsFetching(false);
    }
  };

  const handleNotificationClick = async (notificationId: string, chatId?: string, matchId?: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      const res = await fetch(`${API_URL}/notifications/${notificationId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete notification");

      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      setUnreadCount(prev => Math.max(0, prev - 1));
      setShowDropdown(false);

      if (chatId) {
        router.push(`/chats?chat=${chatId}`);
      } else if (matchId) {
        router.push(`/matches`);
      }
    } catch (error) {
      console.error("❌ Delete notification error:", error);
      fetchNotifications();
      fetchUnreadCount();
    }
  };

  // ✅ FIXED: Proper match action handler with better error handling and logging
  const handleMatchAction = async (notificationId: string, matchId: string | undefined, action: 'accept' | 'reject') => {
    const token = localStorage.getItem("token");
    
    // ✅ Validate inputs first
    if (!token) {
      console.error("❌ No token found");
      alert("Please login again");
      return;
    }

    if (!matchId) {
      console.error("❌ No matchId provided");
      alert("Invalid match request");
      return;
    }

    if (processingMatchId === matchId) {
      console.log("⏳ Already processing this match");
      return;
    }

    setProcessingMatchId(matchId);
    setIsLoading(true);

    try {
      const url = `${API_URL}/matches/${matchId}/${action}`;
      console.log(`🔄 ${action === 'accept' ? 'Accepting' : 'Rejecting'} match...`);
      console.log(`📍 Request URL: ${url}`);
      console.log(`🎫 Match ID: ${matchId}`);
      console.log(`📋 Notification ID: ${notificationId}`);

      const response = await fetch(url, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      console.log(`📥 Response status: ${response.status}`);
      
      // ✅ Get response text first to handle both JSON and non-JSON responses
      const responseText = await response.text();
      console.log(`📄 Response body: ${responseText}`);

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

      // ✅ Parse response
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("❌ Failed to parse response JSON:", e);
        data = { message: responseText };
      }

      console.log(`✅ Match ${action}ed successfully:`, data);

      // ✅ Remove notification from list immediately
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      // ✅ Show success message
      const successMessage = action === 'accept' 
        ? "Match accepted! Redirecting to chat..." 
        : "Match request rejected";
      
      // ✅ If accepted, redirect to chat
      if (action === 'accept') {
        if (data.chatId) {
          console.log(`💬 Redirecting to chat: ${data.chatId}`);
          setShowDropdown(false);
          setTimeout(() => {
            router.push(`/chats?chat=${data.chatId}`);
          }, 500);
        } else {
          console.warn("⚠️ No chatId in response, staying on notifications");
          alert(successMessage);
        }
      } else {
        // ✅ If rejected, just show success and refresh
        console.log(`✅ Match rejected successfully`);
        setTimeout(() => {
          fetchUnreadCount();
          fetchNotifications();
        }, 500);
      }

    } catch (error) {
      console.error(`❌ ${action} match error:`, error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : `Failed to ${action} match request`;
      
      alert(errorMessage);
      
      // ✅ Refresh notifications on error
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
      console.log("🧹 Clearing all notifications...");
      
      const response = await fetch(`${API_URL}/notifications/messages/all`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Failed to clear notifications (${response.status})`);
      }

      const data = await response.json();
      console.log(`✅ Cleared ${data.count} notifications`);
      console.log(`✅ Auto-rejected ${data.rejectedMatches || 0} pending matches`);
      
      setNotifications([]);
      setUnreadCount(0);
      setShowDropdown(false);
      setError(null);
      
      alert(`Cleared ${data.count} notifications and rejected ${data.rejectedMatches || 0} pending matches`);
      
      setTimeout(() => {
        fetchUnreadCount();
        fetchNotifications();
      }, 100);
    } catch (error) {
      console.error("❌ Clear all error:", error);
      setError("Failed to clear notifications");
      alert("Failed to clear notifications");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Bell Icon Button */}
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
          <Bell
            className={`w-4 h-4 ${
              darkMode ? "text-orange-300" : "text-orange-700"
            }`}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Mobile Overlay */}
      {showDropdown && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setShowDropdown(false)}
        />
      )}

      {/* Dropdown - Mobile First */}
      {showDropdown && (
        <div
          className={`
            fixed md:absolute
            inset-x-4 md:inset-x-auto
            top-20 md:top-auto
            bottom-4 md:bottom-auto
            md:right-0 md:left-auto
            md:mt-3
            w-auto md:w-96
            max-h-none md:max-h-96
            overflow-y-auto
            rounded-2xl
            shadow-2xl
            border
            z-50
            ${darkMode
              ? "bg-[#2a1f1a]/95 border-orange-800/30 backdrop-blur-sm"
              : "bg-white border-orange-200"
            }
          `}
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
                className={`font-bold flex items-center gap-2 ${
                  darkMode ? "text-orange-100" : "text-orange-900"
                }`}
              >
                Notifications
                {isFetching && (
                  <Loader2 className="w-3 h-3 animate-spin text-orange-500" />
                )}
              </h3>
              
              <div className="flex items-center gap-2">
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
                
                {/* Close button - Mobile only */}
                <button
                  onClick={() => setShowDropdown(false)}
                  className={`md:hidden p-1 rounded-full transition-all ${
                    darkMode
                      ? "hover:bg-orange-900/30"
                      : "hover:bg-orange-100"
                  }`}
                >
                  <X className={`w-4 h-4 ${darkMode ? "text-orange-300" : "text-orange-700"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="p-4 bg-red-500/10 border-b border-red-500/20">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

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
            <div className="divide-y divide-orange-800/30 md:divide-orange-200">
              {notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`
                    ${!notif.read
                      ? darkMode
                        ? "bg-orange-900/20"
                        : "bg-orange-50/50"
                      : ""
                    }
                  `}
                >
                  <button
                    onClick={() => {
                      if (notif.type !== 'match_request') {
                        handleNotificationClick(notif._id, notif.chatId, notif.matchId);
                      }
                    }}
                    className={`w-full text-left transition-opacity p-4 ${
                      notif.type !== 'match_request' ? 'hover:opacity-80 active:opacity-60 cursor-pointer' : 'cursor-default'
                    }`}
                    disabled={isLoading || notif.type === 'match_request'}
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
                            <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 animate-pulse"></div>
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

                        {/* Match Request with Action Buttons */}
                        {notif.type === "match_request" && (
                          <>
                            <p
                              className={`text-sm mb-3 ${
                                darkMode ? "text-orange-200/80" : "text-orange-800"
                              }`}
                            >
                              Sent you a match request
                            </p>
                            {/* ✅ Debug info - remove in production */}
                            <p className="text-xs text-gray-500 mb-2">
                              Match ID: {notif.matchId || 'Missing!'}
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMatchAction(notif._id, notif.matchId, 'accept');
                                }}
                                disabled={isLoading || processingMatchId === notif.matchId}
                                className="flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-semibold bg-linear-to-r from-orange-500 to-red-600 text-white hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {processingMatchId === notif.matchId ? "..." : "Accept"}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMatchAction(notif._id, notif.matchId, 'reject');
                                }}
                                disabled={isLoading || processingMatchId === notif.matchId}
                                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${
                                  darkMode 
                                    ? "bg-orange-900/30 text-orange-200 hover:bg-orange-900/50" 
                                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                }`}
                              >
                                {processingMatchId === notif.matchId ? "..." : "Reject"}
                              </button>
                            </div>
                          </>
                        )}

                        {/* Match Accepted */}
                        {notif.type === "match_accepted" && (
                          <p
                            className={`text-sm ${
                              darkMode ? "text-orange-200/80" : "text-orange-800"
                            }`}
                          >
                            Accepted your match request! 🎉
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
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}