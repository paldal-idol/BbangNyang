import { useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { createRoomCode, validRoomCode } from "@/api";
import { Modals } from "@common";
import { BakeryBackground, BakeryDoor, BakeryTitle } from "@/components";
import { CreateModal } from "@/components/modal";
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

function RootPage() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModals();
  const [isOpen, setIsOpen] = useState(false);

  const openDoor = () => setIsOpen(true);
  const closeDoor = () => setIsOpen(false);

  const handleClose = () => {
    closeModal("createRoom");
    closeDoor();
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
      "createRoom",
      <CreateModal
        handleClose={handleClose}
        joinRoom={joinRoom}
        createRoom={createRoom}
      />
    );
    openDoor();
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
