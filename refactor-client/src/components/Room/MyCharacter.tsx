import { useState } from "react";

import styled from "@emotion/styled";

import color from "@theme/color";
import { useModals } from "@/hooks";

import { Modals, Button } from "@common";
import Character from "./Character";

const MyCharacterBlock = styled.div`
  max-width: 260px;
  max-height: 360px;
  position: relative;
`;

const CharacterMenuBlock = styled.div<CharacterMenuBlockType>`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  visibility: ${(props) => (props.hover ? "visible" : "hidden")};
  background: ${(props) => (props.hover ? "#00000090" : "none")};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

type CharacterMenuBlockType = {
  hover: boolean;
};

type UserType = {
  character: number;
  name: string;
};

type MyCharacterProps = {
  user: UserType;
};

function MyCharacter({ user }: MyCharacterProps) {
  const { openModal, closeModal } = useModals();
  const [hover, setHover] = useState(false);

  const handleOpenNameModal = () => {
    openModal("createRoom", <p>dd</p>);
  };

  const handleOpenCharacterModal = () => {
    openModal("createRoom", <p>dd</p>);
  };

  return (
    <MyCharacterBlock
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Character user={user} />
      <CharacterMenuBlock hover={hover}>
        <Button
          backgroundColor={color.button.orange}
          onClick={handleOpenNameModal}
        >
          이름 변경
        </Button>
        <Button
          backgroundColor={color.button.orange}
          onClick={handleOpenCharacterModal}
        >
          캐릭터 변경
        </Button>
      </CharacterMenuBlock>
      <Modals />
    </MyCharacterBlock>
  );
}

export default MyCharacter;
