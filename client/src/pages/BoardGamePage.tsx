import React, { useState, useEffect } from 'react';
import socket from '@store/socket';
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
import usersState from '@store/users';

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
  const [users, setUsers] = useRecoilState(usersState);
  const [startCount, setStartCount] = useState(5);
  const [isGame, setIsGame] = useState(false);
  let startTimer;
  useEffect(() => {
    if (user.isGame) {
      socket.emit('getUsers', (users: any[]) => {
        setUsers(users);
      });
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
      {!isGame && (
        <Container>
          <SelectGameOrder />
        </Container>
      )}
      {user.isGame && !isGame && <p>곧 게임이 시작됩니다!</p>}
      {user.isGame && isGame && (
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
      )}
    </>
  );
};

export default BoardGamePage;
