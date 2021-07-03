import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import modalState from '@store/modal';

const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #00000090;
  z-index: 2000;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
`;

const Modal: React.FC = ({ children }) => {
  const setModal = useSetRecoilState(modalState);

  const closeModal = () => {
    setModal('');
  };

  return (
    <>
      <ModalBackground onClick={closeModal} />
      <ModalContent>{children}</ModalContent>
    </>
  );
};

export default Modal;
