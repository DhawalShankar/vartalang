"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // ✅ Check if we're in browser (client-side only)
    if (typeof window === "undefined") {
      console.log("Server-side rendering, skipping socket");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.log("❌ No token or userId found, skipping socket connection");
      return;
    }

    console.log("🔌 Initializing Socket.IO connection...");
    console.log("📍 API URL:", API_URL);
    console.log("👤 User ID:", userId);

    // Initialize Socket.IO connection
    const socketInstance = io(API_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      auth: {
        token,
        userId
      },
      // ✅ Important: Add these for better connection
      withCredentials: true,
      autoConnect: true
    });

    // Connection successful
    socketInstance.on("connect", () => {
      console.log("✅ Socket connected! ID:", socketInstance.id);
      setIsConnected(true);
      
      // Inform server that user is online
      socketInstance.emit("user_online", { userId, token });
    });

    // Server confirmed connection
    socketInstance.on("connected", (data) => {
      console.log("✅ Server confirmed connection:", data);
    });

    // Authentication error
    socketInstance.on("auth_error", (error) => {
      console.error("❌ Socket auth error:", error);
      setIsConnected(false);
    });

    // Disconnection
    socketInstance.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected. Reason:", reason);
      setIsConnected(false);
    });

    // Connection error
    socketInstance.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error.message);
      setIsConnected(false);
    });

    // User status updates (online/offline)
    socketInstance.on("user_status", (data) => {
      console.log("👤 User status update:", data);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      console.log("🔌 Cleaning up socket connection");
      if (socketInstance.connected) {
        socketInstance.emit("user_offline", { userId });
      }
      socketInstance.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, []); // ✅ Empty dependency array - only run once

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};