import React from 'react';
import AllowDiceAgain from '@organisms/AllowDiceAgain';
import Board from '@organisms/Board';

const BoardGamePage: React.FC = () => {
  return (
    <>
      <p>보드게임 페이지입니다.</p>
      {/* <AllowDiceAgain /> */}
      <Board />
    </>
  );
};

export default BoardGamePage;
