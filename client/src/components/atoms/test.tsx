import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dice_1 from '@img/dice/dice_1.PNG';
import dice_2 from '@img/dice/dice_2.PNG';
import dice_3 from '@img/dice/dice_3.PNG';
import dice_4 from '@img/dice/dice_4.PNG';
import dice_5 from '@img/dice/dice_5.PNG';
import dice_6 from '@img/dice/dice_6.PNG';

const dice_list = [dice_1, dice_2, dice_3, dice_4, dice_5, dice_6];
const Dice_svg = styled.svg`
  z-index: 1;
  position: absolute;
`;
const Dice_img = styled.img`
  margin-top: 200px;
  margin-left: 100px;
  z-index: 2;
  position: absolute;
  width: 100px;
`;
const Dice_h1 = styled.h1`
  margin-top: 240px;
  margin-left: 140px;
  z-index: 2;
  position: absolute;
  width: 100px;
`;
const Dice_Button = styled.button`
  margin-top: 300px;
  margin-left: 100px;
  z-index: 2;
  position: absolute;
  width: 100px;
`;
const Dice = () => {
  const [intervalFunc, setIntervalFunc] = useState(null);
  const [diceImage, setDiceImage] = useState(1);
  const [diceNumber, setDiceNumber] = useState(null);
  const [coordinate, setCoordinate] = useState({ x: 150, y: 50 });

  const tick = () => {
    const time = Date.now() / 500;
    setCoordinate({
      x: 150 + 100 * Math.cos(time),
      y: 150 + 100 * -Math.abs(Math.sin(time)),
    });
    setDiceImage(Math.floor(time % 6));
  };

  const down = () => {
    setIntervalFunc(setInterval(tick, 0));
  };

  const up = () => {
    clearInterval(intervalFunc);
    let d = Math.random() * (coordinate.x + coordinate.y) + coordinate.y;
    setDiceNumber(Math.floor(((Math.random() * d) % 10) % 6) + 1);
    setDiceImage(diceNumber);
  };

  useEffect(() => {
    tick();
  }, []);

  return (
    <>
      <div>
        <Dice_svg width="300" height="300">
          {/* center */}

          <circle r="5" cx="150" cy="150" fill="black" />
          <circle r="5" cx={coordinate.x} cy={coordinate.y} fill="black" />
        </Dice_svg>
        <Dice_img src={dice_list[diceImage]} />
        <Dice_h1>{diceNumber}</Dice_h1>
        <Dice_Button onMouseDown={down} onMouseUp={up}>
          클릭
        </Dice_Button>
      </div>
    </>
  );
};

export default Dice;
