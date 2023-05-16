import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { createRoomCode, validRoomCode } from "@/api";
import { Modals } from "@common";
import { BakeryBackground, BakeryDoor, BakeryTitle } from "@/components";
import { RoomModal } from "@/components/modal";
import color from "@/theme/color";
import { useModals } from "@/hooks";

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

const ROOM_MODAL = "ROOM_MODAL";

function RootPage() {
  const navigate = useNavigate();
  const { checkModalOpened, openModal, closeModal } = useModals();
  const isOpen = checkModalOpened(ROOM_MODAL);

  const handleClose = () => {
    closeModal(ROOM_MODAL);
  };

  const joinRoom = async (code: string) => {
    const status = await validRoomCode(code);
    if (status) {
      navigate(`/room/${code}`);
    } else {
      alert("존재하지 않는 방입니다.");
    }
  };

  const createRoom = async () => {
    const code = await createRoomCode();

    navigate(`/room/${code}`);
  };

  const handleClick = () => {
    openModal(
      ROOM_MODAL,
      <RoomModal
        onClose={handleClose}
        onJoinRoom={joinRoom}
        onCreateRoom={createRoom}
      />
    );
  };

  return (
    <Container>
      <BakeryBackground />
      <BakeryDoor isOpen={isOpen} handleClick={handleClick} />
      <TitleBlock>
        <BakeryTitle />
      </TitleBlock>
      <Modals />
    </Container>
  );
}

export default RootPage;
