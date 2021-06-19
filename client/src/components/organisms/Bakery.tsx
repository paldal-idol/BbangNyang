import React from 'react';
import styled from 'styled-components';
import Title from '@atoms/BbangNyangTitle';
import BakeryDoor from '@atoms/BakeryDoor';
import BakeryBackground from '@atoms/BakeryImage';

const Container = styled.div`
  position: absolute;
  margin-left: -80px;
  margin-bottom: 900px;
`;

const Bakery: React.FC = () => {
  return (
    <>
      <BakeryBackground />
      <BakeryDoor />
      <Container>
        <Title />
      </Container>
    </>
  );
};

export default Bakery;
