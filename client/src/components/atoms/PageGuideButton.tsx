import * as React from 'react';
import modalState from '@store/modal';
import { useRecoilState } from 'recoil';
import RoundSquareButton from './RoundSquareButton';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
`;

const PageGuideButton: React.FC = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const openModal = () => {
    setModal('BakeryGuide');
  };

  return (
    <ButtonContainer>
      <RoundSquareButton variant="yellow" size="lg" onClick={openModal}>
        ?
      </RoundSquareButton>
    </ButtonContainer>
  );
};

export default PageGuideButton;
