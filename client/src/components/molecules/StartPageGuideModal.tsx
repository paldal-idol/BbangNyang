import React from 'react';
import styled from 'styled-components';
import Modal from '@atoms/Modal';
import color from '@theme/color';

interface PositionProps {
  top: number;
  left: number;
}

const DescriptionContainer = styled.div<PositionProps>`
  position: absolute;
  margin-top: ${(props) => props.top + 'px'};
  margin-left: ${(props) => props.left + 'px'};
`;

const Description = styled.div`
  width: 80px;
  background-color: white;
  padding: 10px 20px;
  margin-left: 100px;
  text-align: center;
`;

const DescriptionBorder = styled.div`
  width: 160px;
  height: 24px;
  border-right: 2px dashed white;
  border-bottom: 2px dashed white;
`;

const StartPageGuideModal: React.FC = () => {
  return (
    <Modal>
      <DescriptionContainer top={10} left={190}>
        <Description>방 생성</Description>
        <DescriptionBorder />
      </DescriptionContainer>
      <DescriptionContainer top={100} left={230}>
        <Description>방 입장</Description>
        <DescriptionBorder />
      </DescriptionContainer>
    </Modal>
  );
};

export default StartPageGuideModal;
