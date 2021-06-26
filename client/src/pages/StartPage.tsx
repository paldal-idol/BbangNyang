import React from 'react';
import styled from 'styled-components';
import Bakery from '@organisms/Bakery';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StartPage: React.FC = () => {
  return (
    <Container>
      <Bakery />
    </Container>
  );
};

export default StartPage;
