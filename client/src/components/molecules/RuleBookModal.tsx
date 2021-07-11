import React from 'react';
import styled from 'styled-components';
import Modal from '@atoms/Modal';
import { useSetRecoilState } from 'recoil';
import modalState from '@store/modal';
import RuleBook from '@organisms/RuleBook';

const Content = styled.div`
  width: 600px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
`;


const CloseButton = styled.button``;

const RuleBookModal: React.FC = () => {

  const setModal = useSetRecoilState(modalState);

  const closeModal = () => {
    setModal('');
  };

  return (
    <Modal>
      <Content>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <RuleBook/>
      </Content>
    </Modal>
  );
};

export default RuleBookModal;
