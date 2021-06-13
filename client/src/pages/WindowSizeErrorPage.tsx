import React from 'react';
import styled from 'styled-components';
import color from '@theme/color';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${color.background.main};
  z-index: 1000;
`;

const Text = styled.p`
  margin: -20% 10% 0%;
  font-size: 2rem;
`;

const WindowSizeErrorPage: React.FC = () => {
  return (
    <Container>
      <Text>화면 크기는 최소 1600px 이상이어야 합니다😅</Text>
    </Container>
  );
};

export default WindowSizeErrorPage;
