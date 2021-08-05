import React from 'react';
import styled from 'styled-components';
import Modal from '@atoms/Modal';
import { useSetRecoilState } from 'recoil';
import modalState from '@store/modal';
import RuleBook from '@molecules/RuleBook';

const Content = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
const CloseButton = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  background-color: gray;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
`;

const RuleBookModal: React.FC = () => {

  const setModal = useSetRecoilState(modalState);

  const closeModal = () => {
    setModal('');
  };

  return (
    <Modal>
      <Content>
        <ButtonContainer>
          <CloseButton onClick={closeModal}>X</CloseButton>
        </ButtonContainer>
        <RuleBook/>
      </Content>
    </Modal>
  );
};

export default RuleBookModal;
