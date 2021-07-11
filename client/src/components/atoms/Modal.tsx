import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import modalState from '@store/modal';

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #00000090;
  z-index: 2000;
`;

const ModalContent = styled.div`
  z-index: 3000;
`;

const Modal: React.FC = ({ children }) => {
  const setModal = useSetRecoilState(modalState);

  const closeModal = () => {
    setModal('');
  };

  return (
    <ModalContainer>
      <ModalBackground onClick={closeModal} />
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  );
};

export default Modal;
