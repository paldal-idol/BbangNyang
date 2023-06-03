import { useEffect } from "react";
import { socket } from "@/utils/socket";

type ListenerType = (...args: any[]) => void;

export default function useSocketEvent(event: string, listener: ListenerType) {
  useEffect(() => {
    socket.on(event, listener);

    return () => {
      socket.off(event, listener);
    };
  }, []);
}
