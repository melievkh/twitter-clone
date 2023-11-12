import { useEffect, useRef } from "react";
import io from "socket.io-client";

const defaultSocketUrl = "http://localhost:4003";

const useSocketSetUp = () => {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = io(defaultSocketUrl);
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected!");
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
      console.log("Socket disconnected!");
    });

    // Disconnect socket when the component is unmounted
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return socketRef.current;
};

export default useSocketSetUp;
