import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import modalState from '@store/modal';
import Modal from '@atoms/Modal';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
`;

const Text = styled.p``;

const CodeInput = styled.input``;

const EntryButton = styled.button``;

const CloseButton = styled.button``;

const EntryCodeModal: React.FC = () => {
  const setModal = useSetRecoilState(modalState);

  const closeModal = () => {
    setModal('');
  };

  return (
    <Modal>
      <Content>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <Text>방 코드를 입력해주세요.</Text>
        <CodeInput />
        <EntryButton>입장</EntryButton>
      </Content>
    </Modal>
  );
};

export default EntryCodeModal;
