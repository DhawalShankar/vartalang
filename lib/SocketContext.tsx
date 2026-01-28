"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  userId: string | null;  // ← ADDED
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  userId: null,  // ← ADDED
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);  // ← ADDED

  useEffect(() => {
    if (typeof window === "undefined") {
      console.log("Server-side rendering, skipping socket");
      return;
    }

    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (!token || !storedUserId) {
      console.log("❌ No token or userId found, skipping socket connection");
      return;
    }

    // ✅ FIXED: Save userId to state
    setUserId(storedUserId);

    console.log("🔌 Initializing Socket.IO connection...");
    console.log("📍 API URL:", API_URL);
    console.log("👤 User ID:", storedUserId);

    const socketInstance = io(API_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      auth: {
        token,
        userId: storedUserId
      },
      withCredentials: true,
      autoConnect: true
    });

    socketInstance.on("connect", () => {
      console.log("✅ Socket connected! ID:", socketInstance.id);
      setIsConnected(true);
      socketInstance.emit("user_online", { userId: storedUserId, token });
    });

    socketInstance.on("connected", (data) => {
      console.log("✅ Server confirmed connection:", data);
    });

    socketInstance.on("auth_error", (error) => {
      console.error("❌ Socket auth error:", error);
      setIsConnected(false);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected. Reason:", reason);
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error.message);
      setIsConnected(false);
    });

    socketInstance.on("user_status", (data) => {
      console.log("👤 User status update:", data);
    });

    setSocket(socketInstance);

    return () => {
      console.log("🔌 Cleaning up socket connection");
      if (socketInstance.connected) {
        socketInstance.emit("user_offline", { userId: storedUserId });
      }
      socketInstance.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, userId }}>
      {children}
    </SocketContext.Provider>
  );
};