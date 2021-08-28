import React from 'react';
import AllowDiceAgain from '@organisms/AllowDiceAgain';
import Dice from '@organisms/Dice';
import Board from '@organisms/Board';

const BoardGamePage: React.FC = () => {
  return (
    <>
      {/* <AllowDiceAgain /> */}
      <Dice />
      <Board />
    </>
  );
};

export default BoardGamePage;
