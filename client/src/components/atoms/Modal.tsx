import React from 'react';
import styled from 'styled-components';

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
  const closeModal = () => {
    // TODO: Recoil 활용하여 구현하기
    alert('click!');
  };
  return (
    <>
      <ModalBackground onClick={closeModal} />
      <ModalContent>{children}</ModalContent>
    </>
  );
};

export default Modal;
