import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2979ff;
  border-radius: 4px 4px 0 0;
  height: 60px;
  width: 100%;
`;
const LeftInnerContainer = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  margin-left: 5%;
  color: white;
`;
const RightInnerContainer = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: flex-end;
  margin-right: 5%;
`;

const InfoBar = ({ room }) => (
  <Container>
    <LeftInnerContainer>
      <h3>{room}</h3>
    </LeftInnerContainer>
    <RightInnerContainer>
      <a href="/"></a>
    </RightInnerContainer>
  </Container>
);

export default InfoBar;
