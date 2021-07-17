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
  }, [diceState_value]);
  useEffect(() => {
    if (1 <= Accumurate_Dice_Score && Accumurate_Dice_Score < 8) {
      let select_more = confirm('더 하시겠습니까?');
      if (select_more) {
        setDice_active(true);
      } else {
        setDice_active(false);
      }
      setDice_active(true);
    } else if (Accumurate_Dice_Score >= 8) {
      setDice_active(false);
    }
  }, [Accumurate_Dice_Score]);
  return (
    <div>
      <h1>{Accumurate_Dice_Score}</h1>
      <button onClick={active}>주사위 클릭</button>
      {dice_active && <Dice />}
    </div>
  );
};
export default Allow_dice_again;
