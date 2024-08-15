'use client'

import { getUser } from '@/actions/user_actions';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<{
  socket: Socket | null;
  notifications: { [key: string]: number };
} | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchUserAndConnectSocket = async () => {
      // Fetch user data
      const fetchedUser = await getUser();

      const socket = io(process.env.NEXT_PUBLIC_CHAT_API_BASE_URL!, {
        transports: ['websocket'],
        withCredentials: true,
      });

      if (socket && fetchedUser) {
        socket.emit('student_joining_room', { userEmail: fetchedUser.user.email });

        // Listen for notifications
        socket.on('notification', ({ room, messageCount }) => {
          setNotifications(prev => ({
            ...prev,
            [room]: messageCount
          }));
        });
      }

      setSocketInstance(socket);

      // Cleanup on component unmount
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    };

    fetchUserAndConnectSocket();
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketInstance, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
