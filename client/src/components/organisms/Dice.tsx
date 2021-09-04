import React, { useState, useEffect } from 'react';
import diceState from '@store/dice';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import DiceButton from '@atoms/DiceButton';
import dice1 from '@img/dice/dice1.PNG';
import dice2 from '@img/dice/dice2.PNG';
import dice3 from '@img/dice/dice3.PNG';
import dice4 from '@img/dice/dice4.PNG';
import dice5 from '@img/dice/dice5.PNG';
import dice6 from '@img/dice/dice6.PNG';

const diceList = [dice1, dice2, dice3, dice4, dice5, dice6];

const DiceDiv = styled.div``;

const DiceImage = styled.img`
  margin-top: 360px;
  margin-left: 260px;
  z-index: 3;
  position: absolute;
  width: 100px;
  top: 500;
  left: 800;
  border: 8px solid #000000;
  box-sizing: border-box;
  border-radius: 30px;
`;

const DiceDiv2 = styled.div`
  margin-top: 440px;
  margin-left: 260px;
  z-index: 3;
  position: absolute;
  width: 100px;
  top: 500;
  left: 800;
`;

const Dice = () => {
  const [intervalFunc, setIntervalFunc] = useState(null);
  const [diceImage, setDiceImage] = useState(diceList[0]);
  const [diceNumber, setDiceNumber] = useState(0);
  const [coordinate, setCoordinate] = useState({ x: 150, y: 50 });
  const [score, setScore] = useRecoilState(diceState);
  const tick = () => {
    const time = Date.now() / 250;
    setCoordinate({
      x: 150 + 100 * Math.cos(time),
      y: 150 + 100 * -Math.abs(Math.sin(time)),
    });
    setDiceImage(diceList[Math.floor((time * 8) % 6)]);
    let d = Math.random() * (coordinate.x + coordinate.y) + coordinate.y;
    setDiceNumber(Math.floor(((Math.random() * d) % 10) % 6) + 1);
  };

  const down = () => {
    setIntervalFunc(setInterval(tick, 0));
  };

  const up = () => {
    clearInterval(intervalFunc);
    setDiceImage(diceList[diceNumber - 1]);
    setScore({ total: score.total + diceNumber, score: diceNumber, count: score.count + 1 });
  };

  return (
    <>
      <DiceDiv>
        <DiceImage src={diceImage} onMouseDown={down} onMouseUp={up} />
        <DiceDiv2 onMouseDown={down} onMouseUp={up}>
          <DiceButton />
        </DiceDiv2>
      </DiceDiv>
    </>
  );
};
export default Dice;
