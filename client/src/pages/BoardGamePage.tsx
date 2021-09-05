import React from 'react';
import styled from 'styled-components';
import Dice from '@organisms/Dice';
import Card from '@organisms/Card';
import Board from '@organisms/Board';
import GameInfo from '@organisms/GameInfo';
import GameChat from '@organisms/GameChat';

const GameContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const BoardContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const GameInfoContainer = styled.div`
  width: 400px;
  height: 100%;
  border-left: 1px solid black;
`;

const BoardGamePage: React.FC = () => {
  return (
    <GameContainer>
      <BoardContainer>
        <Board />
        <Dice />
        <Card />
      </BoardContainer>
      <GameInfoContainer>
        <GameInfo />
        <GameChat />
      </GameInfoContainer>
    </GameContainer>
  );
};

export default BoardGamePage;
