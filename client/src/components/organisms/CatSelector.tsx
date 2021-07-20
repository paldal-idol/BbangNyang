import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import modalState from '@store/modal';

interface ButtonProps {
  isOpen: boolean;
}

const SelectCharacter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const CharacterImg = styled.img`
  width: 400px;
`;

const SelectCharacterButton = styled.button<ButtonProps>``;

const CatSelector: React.FC = () => {
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
    <>
      <SelectCharacter>
        <CharacterImg alt="캐릭터" />
        <SelectCharacterButton isOpen={isOpen} onClick={selectCharacter}>
          캐릭터 선택
        </SelectCharacterButton>
      </SelectCharacter>
    </>
  );
};

export default CatSelector;
