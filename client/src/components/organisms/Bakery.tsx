import React from 'react';
import styled from 'styled-components';
import Title from '@atoms/BbangNyangTitle';
import Image from '@atoms/BakeryImage';

const Container = styled.div`
  position: absolute;
  margin-left: -110px;
  margin-bottom: 760px;
`;

const Bakery: React.FC = () => {
  return (
    <>
      <Container>
        <Title />
      </Container>
      <Image />
    </>
  );
};

export default Bakery;
