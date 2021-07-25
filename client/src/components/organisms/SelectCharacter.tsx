import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import modalState from '@store/modal';

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
  height: 200px;
  border: 1px solid red;
`;

const SelectCharacterButton = styled.button<ButtonProps>``;

const SelectCharacter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);

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
      <CharacterImg alt="character" />
      <SelectCharacterButton isOpen={isOpen} onClick={selectCharacter}>
        캐릭터 선택
      </SelectCharacterButton>
    </Container>
  );
};

export default SelectCharacter;
