import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import Dice from '@organisms/Dice';
import diceState from '@store/dice';

const BoardContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  margin-top: 500px;
  margin-left: 1100px;
  z-index: 2;
  top: 500;
  left: 800;
`;

const DiceButton = styled.button`
  position: absolute;
  z-index: 1;
  top: 500;
  left: 800;
`;

const AllowDiceAgain = () => {
  const [diceNum, setDiceNum] = useState(0);
  let diceValue = useRecoilValue(diceState);
  const [diceActive, setDiceActive] = useState(false);

  const active = () => {
    setDiceNum(0);
    setDiceActive(true);
  };

  useEffect(() => {
    console.log(diceValue);
    if (0 < diceValue && diceValue < 8) {
      setDiceNum(diceNum + 1);
      setTimeout(function () {
        if (diceNum >= 3) {
          setDiceActive(false);
        }
        else {
          if (confirm('더 하시겠습니까?')) {
            setDiceActive(true);
          } else {
            setDiceActive(false);
          }
        }
      }, 500);
    } else if (diceValue >= 8) {
      setDiceActive(false);
    }
  }, [diceValue]);

  return (
    <BoardContainer>
      <h1>{diceValue}</h1>
      <DiceButton onClick={active}>주사위 클릭</DiceButton>
      {diceActive && <Dice />}
    </BoardContainer>
  );
};
export default AllowDiceAgain;
