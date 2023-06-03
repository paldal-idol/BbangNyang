import { useEffect, useRef } from "react";

import { MessageType } from "@/store";

import Message from "./Message";

type MessagesProps = {
  messages: MessageType[];
};

const Messages = ({ messages }: MessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current === null) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <>
      {messages.map((message, i) => (
        <Message key={i} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};
export default Messages;
