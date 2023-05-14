import { useState } from "react";

import styled from "@emotion/styled";

import { Button } from "@common";
import color from "@/theme/color";

const ModalContainer = styled.div`
  position: fixed;
`;

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #00000090;
  z-index: 4;
`;

const ModalContent = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
`;

const CodeInput = styled.input`
  width: 230px;
  height: 60px;
  font-size: 18px;
  text-align: center;
  margin: 5px;
  box-sizing: border-box;
  border: 0px solid black;
`;

type CreateModalType = {
  handleClose: VoidFunction;
  joinRoom: (code: string) => void;
  createRoom: VoidFunction;
};

function CreateModal({ handleClose, joinRoom, createRoom }: CreateModalType) {
  const [onEnterRoom, setOnEnterRoom] = useState(false);

  const openEnterRoom = () => setOnEnterRoom(true);
  const closeEnterRoom = () => setOnEnterRoom(false);

  function JoinRoomModalContent() {
    const [code, setCode] = useState("");

    const handleJoinRoom = () => joinRoom(code);

    return (
      <ModalContent>
        <CodeInput
          placeholder="입장코드"
          onChange={(event) => {
            setCode(event.target.value);
          }}
        />
        <Button backgroundColor={color.button.orange} onClick={handleJoinRoom}>
          입장하기
        </Button>
        <Button
          backgroundColor={color.button.darkGray}
          onClick={closeEnterRoom}
        >
          돌아가기
        </Button>
      </ModalContent>
    );
  }

  function RoomModalContent() {
    return (
      <ModalContent>
        <Button backgroundColor={color.button.orange} onClick={createRoom}>
          방 생성하기
        </Button>
        <Button backgroundColor={color.button.orange} onClick={openEnterRoom}>
          입장하기
        </Button>
        <Button backgroundColor={color.button.darkGray} onClick={handleClose}>
          돌아가기
        </Button>
      </ModalContent>
    );
  }

  return (
    <ModalContainer>
      <ModalBackground onClick={handleClose} />
      {onEnterRoom ? <JoinRoomModalContent /> : <RoomModalContent />}
    </ModalContainer>
  );
}

export default CreateModal;
