import React, { useState, useEffect } from 'react';
import AllowDiceAgain from '@organisms/AllowDiceAgain';
import SelectGameOrder from '@organisms/SelectGameOrder';
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

import { useRecoilState } from 'recoil';
import userState from '@store/user';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BoardGamePage: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const [startCount, setStartCount] = useState(5);
  const [isGame, setIsGame] = useState(false);
  let startTimer;
  useEffect(() => {
    if (user.isGame) {
      gameStart();
    }
  }, [user]);

  useEffect(() => {
    if (startCount === 0) {
      setIsGame(true);
    }
  }, [startCount]);

  const gameStart = () => {
    startTimer = setInterval(() => {
      setStartCount((prev) => prev - 1);
      if (startCount < 0) {
        clearInterval(startTimer);
      }
    }, 1000);
  };
  return (
    <>
      {!user.isGame && (
        <Container>
          <SelectGameOrder />
        </Container>
      )}
      {user.isGame && isGame ? (
        <GameContainer>
          {/* <AllowDiceAgain /> */}
          {/* <Dice />
              <Card /> */}
          <BoardContainer>
            <Board />
          </BoardContainer>
          <GameInfoContainer>
            <GameInfo />
            <GameChat />
          </GameInfoContainer>
        </GameContainer>
      ) : user.isGame ? (
        <p>곧 게임이 시작됩니다!</p>
      ) : null}
    </>
  );
};

export default BoardGamePage;
