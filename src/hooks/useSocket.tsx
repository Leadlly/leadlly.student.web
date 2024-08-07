import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const useSocket = (): Socket | null => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_CHAT_API_BASE_URL!, {
      transports: ['websocket'], 
      withCredentials: true, 
    });

    setSocketInstance(socket);

    // Cleanup the socket connection on component unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, []); 
  
  return socketInstance;
};

export default useSocket;
