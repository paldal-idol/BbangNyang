import { useState } from "react";

import styled from "@emotion/styled";

import { Button } from "@common";
import color from "@/theme/color";

import { CatImages } from "@/utils/cat";

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
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  padding: 1rem;
  background: ${color.background.main};
  border-radius: 10px;
`;

const CatContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 640px;
  height: 450px;
`;

const CatImg = styled.img<imageProps>`
  width: 150px;
  cursor: pointer;
  outline: ${(props) => (props.isSelected ? "1px solid orange" : "none")};
  border-radius: 10px;
  opacity: ${(props) => (props.disabled ? "100%" : "40%")};
`;

interface imageProps {
  disabled: boolean;
  isSelected: boolean;
}

type NameModalProps = {
  character?: number;
  characters: number[];
  onClose: VoidFunction;
  onChangeCharacter: (character: number) => void;
};

export const CHARACTER_MODAL_TYPE = "CHARACTER_MODAL";

export function CharacterModal({
  characters,
  character: defaultCharacter,
  onClose,
  onChangeCharacter,
}: NameModalProps) {
  const [character, setCharacter] = useState<number>(defaultCharacter || 0);

  const isDisabledCharacter = (character: number) =>
    !characters.includes(character);

  const handleChangeCharacter = () => {
    onChangeCharacter(character);
    onClose();
  };
  return (
    <ModalContainer>
      <ModalBackground onClick={onClose} />
      <ModalContent>
        <CatContainer>
          {CatImages.map((cats, index) => (
            <CatImg
              src={cats}
              key={index}
              isSelected={character === index}
              disabled={isDisabledCharacter(index)}
              onClick={() => isDisabledCharacter(index) && setCharacter(index)}
            />
          ))}
        </CatContainer>
        <Button
          backgroundColor={color.button.orange}
          onClick={handleChangeCharacter}
        >
          결정하기
        </Button>
      </ModalContent>
    </ModalContainer>
  );
}
