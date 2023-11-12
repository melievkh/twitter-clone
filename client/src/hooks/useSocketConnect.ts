import { useEffect, useRef } from "react";
import io from "socket.io-client";

const defaultSocketUrl = "http://localhost:4003";
const defaultSocketOptions = {};

const useSocketSetUp = (
  url = defaultSocketUrl,
  options = defaultSocketOptions,
) => {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = io(url, options);
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
  }, [url, options]);

  return socketRef.current;
};

export default useSocketSetUp;
