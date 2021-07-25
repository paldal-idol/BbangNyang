import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import modalState from '@store/modal';

import { CatImages } from '@utils/cat';
import color from '@theme/color';

interface ButtonProps {
  isOpen: boolean;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const CharacterImg = styled.img`
  width: 200px;
`;

const SelectCharacterButton = styled.button<ButtonProps>`
  font-size: 14px;
  font-weight: bold;
  border: 0px;
  border-radius: 25px;
  cursor: pointer;
  background-color: transparent;
  margin-top: -24px;

  &:hover {
    color: ${color.button.orange};
  }
`;

const SelectCharacter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);

  const selectedCatIndex = 0; //TODO : 랜덤 생성 및 상태 로직 짜기

  const selectCharacter = () => {
    setIsOpen(true);
    setModal('SelectCharacterModal');
  };

  useEffect(() => {
    if (modal !== 'SelectCharacterModal') {
      setIsOpen(false);
    }
  }, [modal]);

  return (
    <Container>
      <CharacterImg alt="character" src={CatImages[selectedCatIndex]} />
      <SelectCharacterButton isOpen={isOpen} onClick={selectCharacter}>
        캐릭터 변경
      </SelectCharacterButton>
    </Container>
  );
};

export default SelectCharacter;
