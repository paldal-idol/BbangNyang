import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import {
  GameSetButton,
  GameStartButton,
  RoomChat,
  RoomUsers,
} from "@components/Room";

import color from "@theme/color";
import { useModal, useSocketEvent } from "@/hooks";
import { NAME_MODAL_TYPE, NameModal } from "@/components/modal";
import { Modals } from "@/components/common";
import { RoomType, roomStore, userStore } from "@/store";
import { socket } from "@/utils/socket";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  // position: absolute;
  gap: 2rem;
  flex-direction: column;
  background: ${color.background.main};
`;

const Wrapper = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  // border-bottom: 1px solid gray;
  height: 60px;
  font-size: 28px;
`;

const Content = styled.section`
  text-align: center;
  display: flex;
  min-height: 600px;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

const Chat = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid gray;
  box-shadow: 0px 0px 6px #00000029;
`;

const Footer = styled.div`
  padding: 20px;
  // border-top: 1px solid gray;
  display: flex;
  justify-content: space-between;
`;

const CodeText = styled.p`
  &:hover {
    color: ${color.button.darkYellow};
    cursor: pointer;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  }
`;

type UserType = {
  id: string;
  name: string;
  roomCode: string;
  isReady: boolean;
  character: number;
};

function RoomPage() {
  const navigate = useNavigate();
  const { id: roomCode } = useParams();
  const { user, initUserInfo } = userStore((state) => state);
  const { room, setRoom } = roomStore((state) => state);

  const hostId = room.users[0]?.id || "";
  const filteredReadyList = room.users.filter((user) => user.isReady);
  const isAllReady = filteredReadyList.length === room.users.length - 1;

  const { open: openNameModal, close: closeNameModal } =
    useModal(NAME_MODAL_TYPE);

  const onCopy = () => {
    alert("방 코드가 복사되었습니다.");
    const textArea = document.createElement("textarea") as HTMLTextAreaElement;
    document.body.appendChild(textArea);
    textArea.value = roomCode as string;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  const createName = (name: string) => {
    socket.emit("join", { name, roomCode }, (message: string, user: UserType) =>
      user ? initUserInfo(user) : alert(message)
    );
  };

  const changeReadyStatus = (readyState: boolean) => {
    socket.emit(
      "ready",
      { readyState, roomCode },
      (message: string, user: UserType) =>
        user ? initUserInfo(user) : alert(message)
    );
  };

  const startGame = () => {
    socket.emit("gameStart", { roomCode });
  };

  const handleOpenNameModal = () => {
    openNameModal(
      <NameModal
        isPreventClose={true}
        onClose={closeNameModal}
        onCreateName={createName}
      />
    );
  };

  useSocketEvent("roomData", (room) => setRoom(room));
  useSocketEvent("gameStart", () => navigate(`/game/${roomCode}`));

  useEffect(() => {
    if (user.name === "") {
      handleOpenNameModal();
    }
  }, []);

  return (
    <Container>
      <Header>
        <p>CODE:</p>
        <CodeText onClick={onCopy}>{roomCode}</CodeText>
      </Header>
      <Content>
        <RoomUsers user={user} room={room} hostId={hostId} />
        <Wrapper>
          <Chat>
            <h2>채팅</h2>
            <RoomChat />
          </Chat>
          {hostId === user.id ? (
            <GameStartButton isAllReady={isAllReady} onClick={startGame} />
          ) : (
            <GameSetButton
              isReady={user.isReady}
              onClick={() => changeReadyStatus(!user.isReady)}
            />
          )}
        </Wrapper>
      </Content>
      <Footer></Footer>
      <Modals />
    </Container>
  );
}

export default RoomPage;
