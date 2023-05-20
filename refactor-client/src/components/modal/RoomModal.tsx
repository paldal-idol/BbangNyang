import { useCallback, useState } from "react";

import styled from "@emotion/styled";

import { Button } from "@common";
import color from "@/theme/color";
import { useInput } from "@/hooks";

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

type RoomModalProps = {
  onClose: VoidFunction;
  onJoinRoom: (code: string) => void;
  onCreateRoom: VoidFunction;
};

function RoomModal({ onClose, onJoinRoom, onCreateRoom }: RoomModalProps) {
  const { value: code, onChange: handleChangeCode } = useInput("");
  const [onEnterRoom, setOnEnterRoom] = useState(false);

  const handleJoinRoom = () => onJoinRoom(code);
  const openEnterRoom = useCallback(() => setOnEnterRoom(true), []);
  const closeEnterRoom = useCallback(() => setOnEnterRoom(false), []);

  const onSubmit = onEnterRoom ? handleJoinRoom : openEnterRoom;
  const submitLabel = onEnterRoom ? "입장하기" : "생성하기";
  const onCancel = onEnterRoom ? closeEnterRoom : onClose;

  return (
    <ModalContainer>
      <ModalBackground onClick={onClose} />
      <ModalContent>
        {onEnterRoom ? (
          <CodeInput placeholder="입장코드" onChange={handleChangeCode} />
        ) : (
          <Button backgroundColor={color.button.orange} onClick={onCreateRoom}>
            방 생성하기
          </Button>
        )}
        <Button backgroundColor={color.button.orange} onClick={onSubmit}>
          {submitLabel}
        </Button>
        <Button backgroundColor={color.button.darkGray} onClick={onCancel}>
          돌아가기
        </Button>
      </ModalContent>
    </ModalContainer>
  );
}

export default RoomModal;
