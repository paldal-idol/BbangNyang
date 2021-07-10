import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import Dice from '@organisms/Dice_svg';
import diceState from '@store/Dice_number';

const Allow_dice_again = () => {
  let [Accumurate_Dice_Score, setScore] = useState(0);
  const diceState_value = useRecoilValue(diceState);
  const [dice_active, setDice_active] = useState(false);
  const active = () => {
    setDice_active(true);
  };
  useEffect(() => {
    setScore(Accumurate_Dice_Score + diceState_value);
    console.log(diceState_value, Accumurate_Dice_Score);
  }, [diceState_value]);
  return (
    <div>
      <h1>{Accumurate_Dice_Score}</h1>
      <button onClick={active}>주사위 클릭</button>
      {dice_active && <Dice />}
    </div>
  );
};
export default Allow_dice_again;
