import { useState } from "react";
import styled from "@emotion/styled";

import { BakeryBackground, BakeryDoor, BakeryTitle } from "@/components";
import { Modals } from "@common";
import { CreateModal } from "@/components/modal";
import color from "@/theme/color";
import { useModals } from "@/hooks";
import { useNavigate } from "react-router-dom";

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

  const joinRoom = (code: string) => {
    console.log("로직 처리...");
    navigate(`/room/${code}`);
  };

  const createRoom = () => {
    console.log("로직 처리...");
    navigate("/room/1");
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
