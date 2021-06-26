import React from 'react';
import styled from 'styled-components';
import Modal from '@atoms/Modal';
import RuleBook from '@organisms/RuleBook';

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

const CloseButton = styled.button``;

const RuleBookModal: React.FC = () => {
  return (
    <Modal>
      <Content>
        <CloseButton>X</CloseButton>
        <RuleBook/>
      </Content>
    </Modal>
  );
};

export default RuleBookModal;
