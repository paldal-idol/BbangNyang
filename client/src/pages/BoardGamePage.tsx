import React from 'react';
import styled from 'styled-components';
import Dice from '@organisms/Dice';
import Card from '@organisms/Card';
import Board from '@organisms/Board';
import GameInfo from '@organisms/GameInfo';

const GameContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const BoardContainer = styled.div`
  flex: 1;
`;

const GameInfoContainer = styled.div`
  width: 400px;
  border-left: 1px solid black;
`;

const BoardGamePage: React.FC = () => {
  return (
    <GameContainer>
      {/* <AllowDiceAgain /> */}
      <Dice />
      <Card />
      <BoardContainer>
        <Board />
      </BoardContainer>
      <GameInfoContainer>
        <GameInfo />
      </GameInfoContainer>
    </GameContainer>
  );
};

export default BoardGamePage;
