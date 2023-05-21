import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { createRoomCode, validRoomCode } from "@/api";
import { Modals } from "@common";
import { BakeryBackground, BakeryDoor, BakeryTitle } from "@/components";
import { RoomModal, ROOM_MODAL_TYPE } from "@/components/modal";
import color from "@/theme/color";
import { useModal } from "@/hooks";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${color.background.main};
`;

const TitleBlock = styled.div`
  margin-left: 0px;
  margin-bottom: 450px;
`;

function RootPage() {
  const navigate = useNavigate();
  const {
    isOpened: isRoomModalOpened,
    open: openRoomModal,
    close: closeRoomModal,
  } = useModal(ROOM_MODAL_TYPE);

  const joinRoom = async (code: string) => {
    const status = await validRoomCode(code);
    if (status) {
      closeRoomModal();
      navigate(`/room/${code}`);
    } else {
      alert("존재하지 않는 방입니다.");
    }
  };

  const createRoom = async () => {
    const code = await createRoomCode();
    closeRoomModal();
    navigate(`/room/${code}`);
  };

  const handleClick = () => {
    openRoomModal(
      <RoomModal
        onClose={closeRoomModal}
        onJoinRoom={joinRoom}
        onCreateRoom={createRoom}
      />
    );
  };

  return (
    <Container>
      <BakeryBackground />
      <BakeryDoor isOpen={isRoomModalOpened} handleClick={handleClick} />
      <TitleBlock>
        <BakeryTitle />
      </TitleBlock>
      <Modals />
    </Container>
  );
}

export default RootPage;
