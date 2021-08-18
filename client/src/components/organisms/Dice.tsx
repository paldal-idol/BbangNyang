import React, { useState, useEffect } from 'react';
import diceState from '@store/dice';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import dice1 from '@img/dice/dice1.PNG';
import dice2 from '@img/dice/dice2.PNG';
import dice3 from '@img/dice/dice3.PNG';
import dice4 from '@img/dice/dice4.PNG';
import dice5 from '@img/dice/dice5.PNG';
import dice6 from '@img/dice/dice6.PNG';

const dice_list = [dice1, dice2, dice3, dice4, dice5, dice6];
const Dice_svg = styled.svg`
  z-index: 1;
  position: absolute;
  width: 100vw;
  height: 100vh;
`;
const Dice_img = styled.img`
  margin-top: 200px;
  margin-left: 100px;
  z-index: 2;
  position: absolute;
  width: 100px;
  top: 500;
  left: 800;
`;
const Dice_h1 = styled.h1`
  margin-top: 240px;
  margin-left: 140px;
  z-index: 2;
  position: absolute;
  width: 100px;
  top: 500;
  left: 800;
`;
const Dice_Button = styled.button`
  margin-top: 300px;
  margin-left: 100px;
  z-index: 2;
  position: absolute;
  width: 100px;
  top: 500;
  left: 800;
`;
const Dice = () => {
  const [intervalFunc, setIntervalFunc] = useState(null);
  const [diceImage, setDiceImage] = useState(dice_list[0]);
  const [diceNumber, setDiceNumber] = useState(0);
  const [coordinate, setCoordinate] = useState({ x: 150, y: 50 });
  const [count_num, setCount_Num] = useState(0);
  const [result_score, setResult_score] = useRecoilState(diceState);
  const tick = () => {
    const time = Date.now() / 250;
    setCoordinate({
      x: 150 + 100 * Math.cos(time),
      y: 150 + 100 * -Math.abs(Math.sin(time)),
    });
    setDiceImage(dice_list[Math.floor((time * 8) % 6)]);
    let d = Math.random() * (coordinate.x + coordinate.y) + coordinate.y;
    setDiceNumber(Math.floor(((Math.random() * d) % 10) % 6) + 1);
  };

  const down = () => {
    setIntervalFunc(setInterval(tick, 0));
  };

  const up = () => {
    clearInterval(intervalFunc);
    console.log(diceNumber);
    setDiceImage(dice_list[diceNumber - 1]);
    setCount_Num(count_num + 1);
    let a = diceNumber;
    setResult_score(result_score + a);
  };

  return (
    <>
      <div>
        <Dice_svg width="300" height="300">
          {/* center */}
          <circle r="5" cx="150" cy="150" fill="black" />
          <circle r="5" cx={coordinate.x} cy={coordinate.y} fill="black" />
        </Dice_svg>
        <Dice_img src={diceImage} />
        {/* <Dice_h1>{diceNumber}</Dice_h1> */}
        <Dice_Button onMouseDown={down} onMouseUp={up}>
          클릭
        </Dice_Button>
      </div>
    </>
  );
};
export default Dice;
