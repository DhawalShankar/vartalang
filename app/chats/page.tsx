"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
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
  Mic
} from "lucide-react";
import { useDarkMode } from '@/lib/DarkModeContext';

function ChatsContent() {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userParam = searchParams.get('user');
  
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<number[]>([]);

  // Mock data
  const chats = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "PS",
      lastMessage: "That's a great way to practice!",
      timestamp: "2m ago",
      unread: 2,
      typing: false,
      teaching: "Hindi",
      learning: "English"
    },
    {
      id: 2,
      name: "Arjun Patel",
      avatar: "AP",
      lastMessage: "Can we schedule a session tomorrow?",
      timestamp: "1h ago",
      unread: 0,
      typing: true,
      teaching: "Gujarati",
      learning: "Spanish"
    },
    {
      id: 3,
      name: "Lakshmi Iyer",
      avatar: "LI",
      lastMessage: "धन्यवाद for the lesson!",
      timestamp: "3h ago",
      unread: 1,
      typing: false,
      teaching: "Tamil",
      learning: "Hindi"
    },
    {
      id: 4,
      name: "Rahul Kumar",
      avatar: "RK",
      lastMessage: "See you in the next session",
      timestamp: "5h ago",
      unread: 0,
      typing: false,
      teaching: "English",
      learning: "French"
    },
    {
      id: 5,
      name: "Anjali Desai",
      avatar: "AD",
      lastMessage: "Your pronunciation is improving!",
      timestamp: "1d ago",
      unread: 0,
      typing: false,
      teaching: "Marathi",
      learning: "English"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "them",
      text: "Hi! Ready for our language exchange session?",
      timestamp: "10:30 AM",
      status: "read"
    },
    {
      id: 2,
      sender: "me",
      text: "Yes! I've been practicing the phrases you taught me last time.",
      timestamp: "10:32 AM",
      status: "read"
    },
    {
      id: 3,
      sender: "them",
      text: "That's wonderful! Let's start with some conversation practice.",
      timestamp: "10:33 AM",
      status: "read"
    },
    {
      id: 4,
      sender: "me",
      text: "Sounds good. Can we focus on verb conjugations today?",
      timestamp: "10:35 AM",
      status: "delivered"
    },
    {
      id: 5,
      sender: "them",
      text: "That's a great way to practice!",
      timestamp: "10:36 AM",
      status: "read"
    }
  ];

  useEffect(() => {
    if (userParam) {
      setSelectedChat(parseInt(userParam));
    }
  }, [userParam]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending:", messageInput);
      setMessageInput("");
    }
  };

  const handleChatClick = (chatId: number) => {
    setSelectedChat(chatId);
    router.push(`/chats?user=${chatId}`);
  };

  const handleBack = () => {
    setSelectedChat(null);
    router.push('/chats');
  };

  const handleBlockUser = () => {
    if (selectedChat && !blockedUsers.includes(selectedChat)) {
      setBlockedUsers([...blockedUsers, selectedChat]);
      setShowBlockMenu(false);
      alert(`User blocked. You won't receive messages from this user.`);
    }
  };

  const handleUnblockUser = () => {
    if (selectedChat) {
      setBlockedUsers(blockedUsers.filter(id => id !== selectedChat));
      setShowBlockMenu(false);
      alert(`User unblocked.`);
    }
  };

  const selectedChatData = chats.find(chat => chat.id === selectedChat);
  const isBlocked = selectedChat ? blockedUsers.includes(selectedChat) : false;

  // Mobile view - show only chat window when user is selected
  const showOnlyChat = selectedChat !== null;

  return (
    <div className={`pt-20 min-h-screen ${darkMode ? "bg-[#1a1410]" : "bg-[#FFF9F5]"}`}>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid md:grid-cols-3 gap-4 h-[calc(100vh-120px)]">
          
          {/* Chat List Sidebar - Hidden on mobile when chat is selected */}
          <div className={`${showOnlyChat ? 'hidden md:block' : 'block'} rounded-3xl overflow-hidden ${darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200 shadow-lg"}`}>
            
            {/* Search */}
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

            {/* Chat List */}
            <div className="overflow-y-auto h-[calc(100%-140px)]">
              {chats.map((chat) => (
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
                        {chat.avatar}
                      </div>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold truncate ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                          {chat.name}
                        </h3>
                        <span className={`text-xs ${darkMode ? "text-orange-300/70" : "text-orange-600/70"}`}>
                          {chat.timestamp}
                        </span>
                      </div>
                      {chat.typing ? (
                        <p className={`text-sm italic ${darkMode ? "text-orange-400" : "text-orange-600"}`}>
                          typing...
                        </p>
                      ) : (
                        <p className={`text-sm truncate ${darkMode ? "text-orange-200/70" : "text-orange-700/70"}`}>
                          {chat.lastMessage}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? "bg-orange-800/30 text-orange-300" : "bg-orange-200 text-orange-800"}`}>
                          Teaching: {chat.teaching}
                        </span>
                      </div>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                        <span className="text-xs text-white font-semibold">{chat.unread}</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window - Full screen on mobile when chat is selected */}
          <div className={`${showOnlyChat ? 'block' : 'hidden md:block'} md:col-span-2 rounded-3xl overflow-hidden flex flex-col ${darkMode ? "bg-orange-900/10 border border-orange-800/30" : "bg-white border border-orange-200 shadow-lg"}`}>
            
            {selectedChatData ? (
              <>
                {/* Chat Header */}
                <div className={`p-4 border-b flex items-center justify-between ${darkMode ? "border-orange-800/30" : "border-orange-200"}`}>
                  <div className="flex items-center gap-3">
                    {/* Back button - visible on mobile */}
                    <button
                      onClick={handleBack}
                      className={`md:hidden p-2 rounded-lg transition-all ${darkMode ? "hover:bg-orange-900/30 text-orange-300" : "hover:bg-orange-100 text-orange-600"}`}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-semibold">
                        {selectedChatData.avatar}
                      </div>
                    </div>
                    <div>
                      <h3 className={`font-semibold ${darkMode ? "text-orange-100" : "text-orange-900"}`}>
                        {selectedChatData.name}
                      </h3>
                      {selectedChatData.typing && (
                        <p className={`text-xs italic ${darkMode ? "text-orange-400" : "text-orange-600"}`}>
                          typing...
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <button 
                      onClick={() => setShowBlockMenu(!showBlockMenu)}
                      className={`p-2 rounded-lg transition-all ${darkMode ? "hover:bg-orange-900/30 text-orange-300" : "hover:bg-orange-100 text-orange-600"}`}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {/* Block/Unblock Menu */}
                    {showBlockMenu && (
                      <div className={`absolute top-12 right-0 rounded-xl shadow-xl border z-10 min-w-50 ${
                        darkMode ? "bg-orange-900/20 border-orange-800/30 backdrop-blur-sm" : "bg-white border-orange-200"
                      }`}>
                        {isBlocked ? (
                          <button
                            onClick={handleUnblockUser}
                            className={`w-full px-4 py-3 text-left flex items-center gap-2 rounded-xl transition-all ${
                              darkMode ? "hover:bg-orange-900/30 text-green-400" : "hover:bg-green-50 text-green-700"
                            }`}
                          >
                            <Shield className="w-4 h-4" />
                            <span className="text-sm font-medium">Unblock User</span>
                          </button>
                        ) : (
                          <button
                            onClick={handleBlockUser}
                            className={`w-full px-4 py-3 text-left flex items-center gap-2 rounded-xl transition-all ${
                              darkMode ? "hover:bg-orange-900/30 text-red-400" : "hover:bg-red-50 text-red-700"
                            }`}
                          >
                            <Ban className="w-4 h-4" />
                            <span className="text-sm font-medium">Block User</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Blocked User Notice */}
                {isBlocked && (
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
                <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${darkMode ? "bg-[#1a1410]/50" : "bg-orange-50/30"}`}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] ${msg.sender === "me" ? "items-end" : "items-start"} flex flex-col`}>
                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            msg.sender === "me"
                              ? "bg-linear-to-r from-orange-500 to-red-600 text-white"
                              : darkMode 
                                ? "bg-orange-900/30 text-orange-100" 
                                : "bg-white text-orange-950 border border-orange-200"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <div className="flex items-center gap-1 mt-1 px-2">
                          <span className={`text-xs ${darkMode ? "text-orange-300/50" : "text-orange-600/50"}`}>
                            {msg.timestamp}
                          </span>
                          {msg.sender === "me" && (
                            msg.status === "read" ? (
                              <CheckCheck className="w-3 h-3 text-blue-400" />
                            ) : (
                              <Check className={`w-3 h-3 ${darkMode ? "text-orange-300/50" : "text-orange-600/50"}`} />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className={`p-4 border-t ${darkMode ? "border-orange-800/30" : "border-orange-200"}`}>
                  {isBlocked ? (
                    <div className={`text-center py-3 rounded-xl ${
                      darkMode ? "bg-orange-900/20 text-orange-300" : "bg-orange-100 text-orange-700"
                    }`}>
                      <p className="text-sm">Unblock this user to send messages</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button className={`p-2 rounded-lg transition-all ${darkMode ? "hover:bg-orange-900/30 text-orange-400" : "hover:bg-orange-100 text-orange-600"}`}>
                        <Mic className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className={`flex-1 px-4 py-2 rounded-xl border focus:outline-none ${
                          darkMode 
                            ? "bg-orange-900/20 border-orange-800/30 text-orange-100 placeholder:text-orange-400/50 focus:border-orange-600" 
                            : "bg-orange-50 border-orange-300 text-orange-950 placeholder:text-orange-400 focus:border-orange-500"
                        }`}
                      />
                      
                      <button
                        onClick={handleSendMessage}
                        className="p-2 rounded-lg bg-linear-to-r from-orange-500 to-red-600 text-white hover:scale-105 transition-all"
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