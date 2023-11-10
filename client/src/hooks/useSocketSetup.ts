import { useEffect } from "react";
import socket from "socket";

const useSocketSetup = () => {
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("socket connected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useSocketSetup;
