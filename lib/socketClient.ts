import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const createChatSocket = (token: string) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL!, {
      auth: { token },
      autoConnect: false,
    });
  }
  return socket;
};

export const destroyChatSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
