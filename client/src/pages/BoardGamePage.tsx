import React, { useState, useEffect } from 'react';
import AllowDiceAgain from '@organisms/AllowDiceAgain';
import Board from '@organisms/Board';
import SelectGameOrder from '@organisms/SelectGameOrder';
import styled from 'styled-components';

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
    <Container>
      {!user.isGame && <SelectGameOrder />}
      {/* <AllowDiceAgain /> */}

      {user.isGame && isGame ? (
        <Board />
      ) : user.isGame ? (
        <p>곧 게임이 시작됩니다! {startCount}초 전</p>
      ) : null}
    </Container>
  );
};

export default BoardGamePage;
