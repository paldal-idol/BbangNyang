import styled from "@emotion/styled";

import { ChatInput, Messages } from "@common";
import { messageStore } from "@/store";
import { useInput } from "@/hooks";
import { socket } from "@/utils/socket";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
`;

const ScrollContainer = styled.div`
  padding: 5% 0;
  width: 100%;
  height: 30vh;
  min-height: 440px;
  max-height: 500px;
  overflow-y: scroll;
`;

const RoomChat = () => {
  const { id: roomCode } = useParams();
  const { messages, addMessage } = messageStore((state) => state);
  const { value: message, onChange, setValue: setMessage } = useInput("");

  const sendMessage = (text: string) => {
    if (!text) {
      return;
    }
    socket.emit("send", { message, roomCode });
    setMessage("");
  };

  useEffect(() => {
    socket.on("message", addMessage);
    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <Container>
      <ScrollContainer>
        <Messages messages={messages} />
      </ScrollContainer>
      <ChatInput value={message} onChange={onChange} onSubmit={sendMessage} />
    </Container>
  );
};
export default RoomChat;
