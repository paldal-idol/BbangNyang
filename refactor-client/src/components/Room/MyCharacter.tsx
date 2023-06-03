import { useState } from "react";

import styled from "@emotion/styled";

import color from "@theme/color";
import { useModal } from "@/hooks";

import { Button } from "@common";
import Character from "./Character";
import { type UserType, roomStore, userStore } from "@/store";
import {
  CHARACTER_MODAL_TYPE,
  CharacterModal,
  NAME_MODAL_TYPE,
  NameModal,
} from "@components/modal";
import { socket } from "@/utils/socket";
import { useParams } from "react-router-dom";

const MyCharacterBlock = styled.div`
  max-width: 260px;
  max-height: 360px;
  position: relative;
`;

const CharacterMenuBlock = styled.div<CharacterMenuBlockType>`
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

type MyCharacterProps = {
  user: UserType;
  isHost: boolean;
};

function MyCharacter({ user, isHost }: MyCharacterProps) {
  const { id: roomCode } = useParams();
  const [hover, setHover] = useState(false);
  const { initUserInfo } = userStore((state) => state);
  const { room } = roomStore((state) => state);

  const { open: openNameModal, close: closeNameModal } =
    useModal(NAME_MODAL_TYPE);
  const { open: openCharacterModal, close: closeCharacterModal } =
    useModal(CHARACTER_MODAL_TYPE);

  const changeName = (name: string) => {
    socket.emit(
      "changeName",
      { name, roomCode },
      (message: string, user: UserType) =>
        user ? initUserInfo(user) : alert(message)
    );
  };

  const changeCharacter = (character: number) => {
    socket.emit(
      "changeCharacter",
      { character, roomCode },
      (message: string, user: UserType) =>
        user ? initUserInfo(user) : alert(message)
    );
  };

  const handleOpenNameModal = () => {
    openNameModal(
      <NameModal
        name={user.name}
        onClose={closeNameModal}
        onCreateName={changeName}
      />
    );
  };

  const handleOpenCharacterModal = () => {
    openCharacterModal(
      <CharacterModal
        characters={room.users.map((user) => user.character)}
        onClose={closeCharacterModal}
        onChangeCharacter={changeCharacter}
      />
    );
  };

  return (
    <MyCharacterBlock
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Character user={user} isHost={isHost} />
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
    </MyCharacterBlock>
  );
}

export default MyCharacter;
