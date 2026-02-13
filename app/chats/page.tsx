"use client";
import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import PledgeModal from "@/components/PledgeModal";
import { 
  MessageCircle, 
  Search, 
  Send, 
  MoreVertical,
  Check,
  CheckCheck,
  ArrowLeft,
  Ban,
  Shield,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { useDarkMode } from '@/lib/DarkModeContext';
import { createChatSocket, destroyChatSocket } from '@/lib/socketClient';
import type { Socket } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface User {
  _id: string;
  name: string;
  email: string;
  languagesKnow: Array<{ language: string; fluency: string }>;
  primaryLanguageToLearn: string;
}

interface Message {
  _id: string;
  sender: string;
  text: string;
  timestamp: string;
  read: boolean;
}

interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  isBlocked: boolean;
}

interface ChatDetail {
  id: string;
  user: User;
  messages: Message[];
  isBlocked: boolean;
}

function ChatsContent() {
  const { darkMode } = useDarkMode();
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const chatParam = searchParams.get('chat');
  
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatDetail, setCurrentChatDetail] = useState<ChatDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [showPledgeModal, setShowPledgeModal] = useState(false);
  const [hasPledged, setHasPledged] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;

  // ✅ Clear all chat notifications on page load
  useEffect(() => {
    const clearAllChatNotifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${API_URL}/notifications/clear-all-chat`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          console.log("✅ Cleared all chat notifications on page load");
        }
      } catch (error) {
        console.error("Clear chat notifications error:", error);
      }
    };

    clearAllChatNotifications();
  }, []);

  useEffect(() => {
  // Check if user has already accepted the pledge
  const pledgeAccepted = localStorage.getItem("pledgeAccepted");
  if (pledgeAccepted === "true") {
    setHasPledged(true);
  }
  }, []);

  const fetchChats = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/chats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch chats");

      const data = await res.json();
      setChats(data.chats);
      setLoading(false);
      console.log(`✅ Fetched ${data.chats.length} chats`);
      return data.chats;
    } catch (error) {
      console.error("Fetch chats error:", error);
      setLoading(false);
      return [];
    }
  }, [router]);

  // ✅ FIX: useCallback with stable reference
  const handleReceiveMessage = useCallback((data: any) => {
    console.log("📨 Received message:", data);
    const { chatId, message } = data;

    // Skip own messages
    if (message.sender === currentUserId) {
      console.log("⏭️ Skipping own message");
      return;
    }

    // ✅ Add message to current chat if it's open
    setCurrentChatDetail(prev => {
      if (!prev || prev.id !== chatId) {
        console.log("⏭️ Message not for current chat");
        return prev;
      }

      // Duplicate check
      if (prev.messages.some(m => m._id === message._id)) {
        console.log("⏭️ Duplicate message, skipping");
        return prev;
      }

      console.log("✅ Adding message to current chat");
      
      // ✅ Mark as read immediately if chat is open
      if (selectedChat === chatId && socketRef.current) {
        setTimeout(() => {
          const token = localStorage.getItem("token");
          fetch(`${API_URL}/chats/${chatId}/read`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(res => {
            if (res.ok) {
              socketRef.current?.emit("mark_read", { chatId });
              fetchChats(); // Update sidebar to remove unread count
            }
          }).catch(err => console.error("Mark as read error:", err));
        }, 500);
      }

      return {
        ...prev,
        messages: [...prev.messages, message],
      };
    });

    // Only fetch chats if message is not for current open chat
    if (selectedChat !== chatId) {
      fetchChats();
    }
  }, [currentUserId, selectedChat, fetchChats]);

  const handleMessagesRead = useCallback((data: any) => {
    console.log("👁️ Messages marked as read:", data);
    const { chatId } = data;

    setCurrentChatDetail(prev => {
      if (!prev || prev.id !== chatId) return prev;
      
      return {
        ...prev,
        messages: prev.messages.map(m =>
          m.sender === currentUserId ? { ...m, read: true } : m
        ),
      };
    });
  }, [currentUserId]);

  const handleUserBlocked = useCallback(() => {
    console.log("🚫 User blocked event");
    fetchChats();
    if (selectedChat) fetchChatMessages(selectedChat);
  }, [selectedChat, fetchChats]);

  const handleUserUnblocked = useCallback(() => {
    console.log("✅ User unblocked event");
    fetchChats();
    if (selectedChat) fetchChatMessages(selectedChat);
  }, [selectedChat, fetchChats]);

  // ✅ Socket setup
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    console.log("🔌 Setting up socket connection...");
    const socket = createChatSocket(token);
    socketRef.current = socket;

    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Socket connected!");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    });

    socket.on("receive_message", handleReceiveMessage);
    socket.on("messages_read", handleMessagesRead);
    socket.on("user_blocked", handleUserBlocked);
    socket.on("user_unblocked", handleUserUnblocked);

    return () => {
      console.log("🧹 Cleaning up socket...");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");
      socket.off("messages_read");
      socket.off("user_blocked");
      socket.off("user_unblocked");
      destroyChatSocket();
    };
  }, [handleReceiveMessage, handleMessagesRead, handleUserBlocked, handleUserUnblocked]);

  // ✅ Chat room join/leave
  useEffect(() => {
    if (!selectedChat || !socketRef.current || !isConnected) return;

    console.log(`🚪 Joining chat room: chat_${selectedChat}`);
    socketRef.current.emit("join_chat", `chat_${selectedChat}`);

    return () => {
      if (socketRef.current && isConnected) {
        console.log(`👋 Leaving chat room: chat_${selectedChat}`);
        socketRef.current.emit("leave_chat", `chat_${selectedChat}`);
      }
    };
  }, [selectedChat, isConnected]);

  // ✅ Mark messages as read when chat is open
  useEffect(() => {
    if (!selectedChat || !isConnected) return;

    const markAsRead = async () => {
      const token = localStorage.getItem("token");
      
      try {
        const res = await fetch(`${API_URL}/chats/${selectedChat}/read`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          console.log(`✅ Marked messages as read for chat ${selectedChat}`);
          // Emit socket event to notify the sender
          if (socketRef.current) {
            socketRef.current.emit("mark_read", { chatId: selectedChat });
          }
          // Refresh chat list to update unread count
          fetchChats();
        }
      } catch (error) {
        console.error("Mark as read error:", error);
      }
    };

    // Small delay to ensure messages are loaded
    const timer = setTimeout(markAsRead, 500);
    return () => clearTimeout(timer);
  }, [selectedChat, isConnected, fetchChats]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChatDetail?.messages]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // ✅ NEW CODE WITH PLEDGE CHECK
useEffect(() => {
  const openChatFromUrl = async () => {
    if (!chatParam) return;
    
    console.log(`🎯 Opening chat from URL: ${chatParam}`);
    
    // ✅ CHECK PLEDGE FIRST!
    if (!hasPledged) {
      console.log("⚠️ User hasn't pledged yet, showing modal");
      setShowPledgeModal(true);
      sessionStorage.setItem("pendingChatId", chatParam);
      return;
    }
    
    // If pledged, proceed normally
    await fetchChats();
    setSelectedChat(chatParam);
    await fetchChatMessages(chatParam);
  };
  
  if (chatParam && !loading) {
    openChatFromUrl();
  }
  }, [chatParam, loading, hasPledged, fetchChats]); // ✅ Add hasPledged to dependencies
  const deleteNotificationsForChat = async (chatId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/notifications/chat/${chatId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        console.log(`✅ Deleted notifications for chat ${chatId}`);
      }
    } catch (error) {
      console.error("Delete chat notifications error:", error);
    }
  };

  const fetchChatMessages = async (chatId: string) => {
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`${API_URL}/chats/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch messages");

      const data = await res.json();
      setCurrentChatDetail(data.chat);
      
      await deleteNotificationsForChat(chatId);
      
      if (socketRef.current && isConnected) {
        console.log(`📍 Joining chat room: chat_${chatId}`);
        socketRef.current.emit("join_chat", `chat_${chatId}`);
      } else {
        console.warn("⚠️ Cannot join chat room - socket not connected");
      }
    } catch (error) {
      console.error("Fetch messages error:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChat || sending) return;

    const tempMessageId = `temp-${Date.now()}`;
    const tempMessage: Message = {
      _id: tempMessageId,
      sender: currentUserId || '',
      text: messageInput.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    // ✅ Optimistic update
    setCurrentChatDetail(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        messages: [...prev.messages, tempMessage]
      };
    });

    const messageText = messageInput;
    setMessageInput("");
    setSending(true);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/chats/${selectedChat}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: messageText }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const data = await res.json();
      
      console.log("✅ Message sent successfully:", data.messageData);
      
      // ✅ Replace temp message with real one
      setCurrentChatDetail(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: prev.messages.map(msg => 
            msg._id === tempMessageId ? {
              _id: data.messageData._id,
              sender: data.messageData.sender.toString(),
              text: data.messageData.text,
              timestamp: data.messageData.timestamp,
              read: data.messageData.read
            } : msg
          )
        };
      });

      await fetchChats();
    } catch (error) {
      console.error("Send message error:", error);
      
      // ✅ Remove temp message on error
      setCurrentChatDetail(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: prev.messages.filter(msg => msg._id !== tempMessageId)
        };
      });
      
      setMessageInput(messageText);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

 const handleChatClick = (chatId: string) => {
  // Check if user has pledged before opening chat
  if (!hasPledged) {
    setShowPledgeModal(true);
    // Store the chatId to open after pledge is accepted
    sessionStorage.setItem("pendingChatId", chatId);
    return;
  }
  
  setSelectedChat(chatId);
  router.push(`/chats?chat=${chatId}`, { scroll: false });
  fetchChatMessages(chatId);
  };
  const handlePledgeAccept = () => {
  // Store pledge acceptance in localStorage
  localStorage.setItem("pledgeAccepted", "true");
  setHasPledged(true);
  setShowPledgeModal(false);
  
  // Open the pending chat if there is one
      const pendingChatId = sessionStorage.getItem("pendingChatId");
      if (pendingChatId) {
        setSelectedChat(pendingChatId);
        router.push(`/chats?chat=${pendingChatId}`, { scroll: false });
        fetchChatMessages(pendingChatId);
        sessionStorage.removeItem("pendingChatId");
      }
    };

    const handlePledgeClose = () => {
      setShowPledgeModal(false);
      sessionStorage.removeItem("pendingChatId");
    };

  const handleBack = () => {
    setSelectedChat(null);
    setCurrentChatDetail(null);
    router.push('/chats', { scroll: false });
  };

  const handleBlockUser = async () => {
    if (!selectedChat) return;

    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`${API_URL}/chats/${selectedChat}/block`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to block user");

      alert("User blocked successfully");
      setShowMenu(false);
      await fetchChatMessages(selectedChat);
      await fetchChats();
    } catch (error) {
      console.error("Block user error:", error);
      alert("Failed to block user");
    }
  };

  const handleUnblockUser = async () => {
    if (!selectedChat) return;

    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`${API_URL}/chats/${selectedChat}/unblock`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to unblock user");

      alert("User unblocked successfully");
      setShowMenu(false);
      await fetchChatMessages(selectedChat);
      await fetchChats();
    } catch (error) {
      console.error("Unblock user error:", error);
      alert("Failed to unblock user");
    }
  };

  const handleDeleteChat = async () => {
    if (!selectedChat) return;

    if (!confirm("Are you sure you want to delete this chat? This cannot be undone.")) {
      return;
    }

    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`${API_URL}/chats/${selectedChat}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete chat");

      alert("Chat deleted successfully");
      setShowMenu(false);
      handleBack();
      await fetchChats();
    } catch (error) {
      console.error("Delete chat error:", error);
      alert("Failed to delete chat");
    }
  };

  const handleReportUser = async () => {
    if (!selectedChat || !reportReason.trim()) {
      alert("Please provide a reason for reporting");
      return;
    }

    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`${API_URL}/chats/${selectedChat}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason: reportReason }),
      });

      if (!res.ok) throw new Error("Failed to report user");

      alert("Report submitted successfully. We'll review it shortly.");
      setShowReportDialog(false);
      setReportReason("");
      setShowMenu(false);
      await handleBlockUser();
    } catch (error) {
      console.error("Report user error:", error);
      alert("Failed to submit report");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTimestamp = (timestamp: Date | string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const filteredChats = chats.filter(chat =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  if (loading) {
    return (
      <div className={`pt-20 min-h-screen ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={darkMode ? 'text-orange-200' : 'text-gray-700'}>Loading chats...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-20 min-h-screen ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"}`}>
      <Navbar />
      
      {/* ✅ Connection Status Indicator */}
      <div className="fixed bottom-4 right-4 z-50">
        <div 
          className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-lg transition-all cursor-help ${
            isConnected 
              ? "bg-green-500 text-white" 
              : "bg-red-500 text-white animate-pulse"
          }`}
          title={isConnected 
            ? "Real-time messaging active" 
            : "Reconnecting... Messages will be delayed"
          }
        >
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-white" : "bg-white/70"}`} />
            {isConnected ? "Connected" : "Reconnecting..."}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid md:grid-cols-3 gap-4 h-[calc(100vh-120px)]">
          
          {/* Chat List Sidebar */}
          <div className={`${selectedChat ? 'hidden' : 'block'} md:block  rounded-3xl overflow-hidden ${darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200 shadow-lg"}`}>
            
            <div className={`p-4 border-b ${darkMode ? 'border-orange-800/30' : 'border-orange-200'}`}>
              <h2 className={`text-xl font-bold mb-3 ${darkMode ? "text-orange-50" : "text-orange-950"}`}>
                Messages
              </h2>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-xl border focus:outline-none ${
                    darkMode 
                      ? "bg-orange-900/20 border-orange-800/30 text-orange-100 placeholder:text-orange-400/50 focus:border-orange-600" 
                      : "bg-orange-50 border-orange-300 text-orange-950 placeholder:text-orange-400 focus:border-orange-500"
                  }`}
                />
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100%-140px)]">
              {filteredChats.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageCircle className={`w-12 h-12 mx-auto mb-3 ${darkMode ? "text-orange-400/50" : "text-orange-600/50"}`} />
                  <p className={`text-sm ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                    No conversations yet
                  </p>
                </div>
              ) : (
                filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleChatClick(chat.id)}
                    className={`w-full p-4 border-b transition-all ${
                      selectedChat === chat.id
                        ? darkMode 
                          ? "bg-orange-500/20 border-orange-700/50" 
                          : "bg-orange-100 border-orange-300"
                        : darkMode 
                          ? "hover:bg-orange-900/20 border-orange-800/30" 
                          : "hover:bg-orange-50 border-orange-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-semibold">
                          {getInitials(chat.user.name)}
                        </div>
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-semibold truncate ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                            {chat.user.name}
                          </h3>
                          <span className={`text-xs ${darkMode ? "text-orange-300/70" : "text-orange-600/70"}`}>
                            {formatTimestamp(chat.timestamp)}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                          {chat.lastMessage || 'No messages yet'}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? "bg-orange-800/30 text-orange-300" : "bg-orange-200 text-orange-800"}`}>
                            Teaches: {chat.user.languagesKnow[0]?.language || 'N/A'}
                          </span>
                          {chat.isBlocked && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700"}`}>
                              Blocked
                            </span>
                          )}
                        </div>
                      </div>
                      {chat.unread > 0 && selectedChat !== chat.id && (
                        <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                          <span className="text-xs text-white font-semibold">{chat.unread}</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Window */}
          <div className={`${selectedChat ? 'block' : 'hidden'} md:block md:col-span-2 rounded-3xl overflow-hidden flex flex-col ${darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200 shadow-lg"}`}>
            
            {currentChatDetail ? (
              <>
                {/* Chat Header */}
                <div className={`sticky top-0 z-10 p-4 border-b flex items-center justify-between ${darkMode ? "bg-orange-900/10 border-orange-800/30 backdrop-blur-sm" : "bg-white border-orange-200 backdrop-blur-sm"}`}>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleBack}
                      className={`md:hidden p-2 rounded-lg transition-all ${darkMode ? "hover:bg-orange-900/30 text-orange-300" : "hover:bg-orange-100 text-orange-600"}`}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-semibold">
                        {getInitials(currentChatDetail.user.name)}
                      </div>
                    </div>
                    <div>
                      <h3 className={`font-semibold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                        {currentChatDetail.user.name}
                      </h3>
                      <p className={`text-xs ${darkMode ? "text-orange-300/70" : "text-orange-600/70"}`}>
                        Teaches: {currentChatDetail.user.languagesKnow[0]?.language || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <button 
                      onClick={() => setShowMenu(!showMenu)}
                      className={`p-2 rounded-lg transition-all ${darkMode ? "hover:bg-orange-900/30 text-orange-300" : "hover:bg-orange-100 text-orange-600"}`}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {showMenu && (
                      <div className={`absolute top-12 right-0 rounded-xl shadow-xl border z-10 min-w-50 ${
                        darkMode ? "bg-orange-900/95 border-orange-800/30 backdrop-blur-sm" : "bg-white border-orange-200"
                      }`}>
                        {currentChatDetail.isBlocked ? (
                          <button
                            onClick={handleUnblockUser}
                            className={`w-full px-4 py-3 text-left flex items-center gap-2 rounded-t-xl transition-all ${
                              darkMode ? "hover:bg-orange-900/50 text-green-400" : "hover:bg-green-50 text-green-700"
                            }`}
                          >
                            <Shield className="w-4 h-4" />
                            <span className="text-sm font-medium">Unblock User</span>
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={handleBlockUser}
                              className={`w-full px-4 py-3 text-left flex items-center gap-2 rounded-t-xl transition-all ${
                                darkMode ? "hover:bg-orange-900/50 text-orange-300" : "hover:bg-orange-50 text-orange-700"
                              }`}
                            >
                              <Ban className="w-4 h-4" />
                              <span className="text-sm font-medium">Block User</span>
                            </button>
                            <button
                              onClick={() => {
                                setShowReportDialog(true);
                                setShowMenu(false);
                              }}
                              className={`w-full px-4 py-3 text-left flex items-center gap-2 transition-all ${
                                darkMode ? "hover:bg-orange-900/50 text-yellow-400" : "hover:bg-yellow-50 text-yellow-700"
                              }`}
                            >
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm font-medium">Report & Block</span>
                            </button>
                          </>
                        )}
                        <button
                          onClick={handleDeleteChat}
                          className={`w-full px-4 py-3 text-left flex items-center gap-2 rounded-b-xl transition-all border-t ${
                            darkMode ? "hover:bg-orange-900/50 text-red-400 border-orange-800/30" : "hover:bg-red-50 text-red-700 border-orange-200"
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Delete Chat</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {currentChatDetail.isBlocked && (
                  <div className={`p-3 text-center border-b ${
                    darkMode ? "bg-red-900/20 border-red-800/30 text-red-400" : "bg-red-50 border-red-200 text-red-700"
                  }`}>
                    <div className="flex items-center justify-center gap-2">
                      <Ban className="w-4 h-4" />
                      <span className="text-sm font-medium">You have blocked this user</span>
                    </div>
                  </div>
                )}

                {/* Messages */}
                <div 
                  className={`flex-1 p-4 space-y-4 overflow-y-auto ${darkMode ? "bg-[#1a1410]/50" : "bg-orange-50/30"}`}
                  style={{ maxHeight: 'calc(100dvh - 280px)' }}
                >
                  {currentChatDetail.messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className={`text-sm ${darkMode ? "text-orange-300/70" : "text-orange-600/70"}`}>
                        No messages yet. Say hello!
                      </p>
                    </div>
                  ) : (
                    currentChatDetail.messages.map((msg) => {
                      const isMe = msg.sender.toString() === currentUserId?.toString();
                      
                      return (
                        <div
                          key={msg._id}
                          className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[70%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                            {!isMe && (
                              <span className={`text-xs mb-1 px-2 font-medium ${darkMode ? "text-orange-300" : "text-orange-700"}`}>
                                {currentChatDetail.user.name}
                              </span>
                            )}
                            
                            <div
                              className={`px-4 py-2 rounded-2xl ${
                                isMe
                                  ? "bg-linear-to-r from-orange-500 to-red-600 text-white"
                                  : darkMode 
                                    ? "bg-orange-900/30 text-orange-100" 
                                    : "bg-white text-orange-950 border border-orange-200"
                              }`}
                            >
                              <p className="text-sm wrap-break-word">{msg.text}</p>
                            </div>
                            
                            <div className="flex items-center gap-1 mt-1 px-2">
                              <span className={`text-xs ${darkMode ? "text-orange-300/50" : "text-orange-600/50"}`}>
                                {formatTimestamp(msg.timestamp)}
                              </span>
                              {isMe && (
                                msg.read ? (
                                  <CheckCheck className="w-3 h-3 text-blue-400" />
                                ) : (
                                  <Check className={`w-3 h-3 ${darkMode ? "text-orange-300/50" : "text-orange-600/50"}`} />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className={`p-4 border-t ${darkMode ? "border-orange-800/30" : "border-orange-200"}`}>
                  {currentChatDetail.isBlocked ? (
                    <div className={`text-center py-3 rounded-xl ${
                      darkMode ? "bg-orange-900/20 text-orange-300" : "bg-orange-100 text-orange-700"
                    }`}>
                      <p className="text-sm">Unblock this user to send messages</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                        disabled={sending}
                        className={`flex-1 px-4 py-2 rounded-xl border focus:outline-none ${
                          darkMode 
                            ? "bg-orange-900/20 border-orange-800/30 text-orange-100 placeholder:text-orange-400/50 focus:border-orange-600" 
                            : "bg-orange-50 border-orange-300 text-orange-950 placeholder:text-orange-400 focus:border-orange-500"
                        }`}
                      />
                      
                      <button
                        onClick={handleSendMessage}
                        disabled={sending || !messageInput.trim()}
                        className="p-2 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center p-8">
                  <MessageCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-orange-400/50" : "text-orange-600/50"}`} />
                  <p className={`text-lg font-semibold ${darkMode ? "text-orange-200" : "text-orange-800"}`}>
                    Select a conversation
                  </p>
                  <p className={`text-sm ${darkMode ? "text-orange-300/70" : "text-orange-600/70"}`}>
                    Choose a chat to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Report Dialog */}
      {showReportDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl p-6 max-w-md w-full ${
            darkMode ? "bg-orange-900/95 border border-orange-800/30" : "bg-white border border-orange-200"
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
              Report User
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
              Please describe why you're reporting this user. This will be sent to vartalang@gmail.com and the user will be automatically blocked.
            </p>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Reason for reporting..."
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border outline-none resize-none mb-4 ${
                darkMode 
                  ? "bg-orange-900/20 border-orange-800/30 text-orange-100 placeholder:text-orange-400/50" 
                  : "bg-orange-50 border-orange-300 text-orange-950 placeholder:text-orange-400"
              }`}
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowReportDialog(false);
                  setReportReason("");
                }}
                className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                  darkMode 
                    ? "bg-orange-900/20 text-orange-300 border border-orange-800/30 hover:bg-orange-900/30" 
                    : "bg-orange-100 text-orange-700 border border-orange-300 hover:bg-orange-200"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleReportUser}
                disabled={!reportReason.trim()}
                className="flex-1 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Report & Block
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Pledge Modal */}
      <PledgeModal 
        isOpen={showPledgeModal}
        onAccept={handlePledgeAccept}
        onClose={handlePledgeClose}
      />
    </div>
  );
}

export default function ChatsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FFF9F5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-700">Loading chats...</p>
        </div>
      </div>
    }>
      <ChatsContent />
    </Suspense>
  );
}