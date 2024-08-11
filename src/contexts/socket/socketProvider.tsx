'use client'

import { getUser } from '@/actions/user_actions';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

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
      }

      setSocketInstance(socket);

      // Cleanup on component unmount
      return () => {
        socket.disconnect();
      };
    };

    fetchUserAndConnectSocket();
  }, []);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): Socket | null => {
  return useContext(SocketContext);
};
