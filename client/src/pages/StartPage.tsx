import React, { useEffect } from 'react';
import styled from 'styled-components';
import Bakery from '@organisms/Bakery';
import PageGuideButton from '@atoms/PageGuideButton';
import SocketIO from '@store/socket';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StartPage: React.FC = () => {
  useEffect(() => {
    SocketIO.init();
  }, []);

  return (
    <Container>
      <Bakery />
      <PageGuideButton />
    </Container>
  );
};

export default StartPage;
