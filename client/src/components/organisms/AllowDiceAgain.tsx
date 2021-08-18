import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import Dice from '@organisms/Dice';
import diceState from '@store/dice';

const Map_div = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  margin-top: 500px;
  margin-left: 1100px;
  z-index: 2;
  top: 500;
  left: 800;
`;
const Map_button = styled.button`
  position: absolute;
  z-index: 1;
  top: 500;
  left: 800;
`;
const Map_h1 = styled.h1`
  position: absolute;
  z-index: 2;
  width: 100vw;
  height: 100vh;
`;
const AllowDiceAgain = () => {
  const [dice_n, setDice_n] = useState(0);
  let [Accumurate_Dice_Score, setScore] = useState(0);
  let diceState_value = useRecoilValue(diceState);
  const [dice_active, setDice_active] = useState(false);

  const active = () => {
    setDice_n(0);
    setDice_active(true);
  };

  useEffect(() => {
    console.log(diceState_value);
    if (0 < diceState_value && diceState_value < 8) {
      setDice_n(dice_n + 1);
      setTimeout(function () {
        if (dice_n == 3) {
          setDice_active(false);
        }
        let set_more = confirm('더 하시겠습니까?');
        if (set_more) {
          setDice_active(true);
        } else {
          setDice_active(false);
        }
      }, 500);
    } else if (diceState_value >= 8) {
      setDice_active(false);
    }
  }, [diceState_value]);

  return (
    <Map_div>
      <h1>{diceState_value}</h1>
      <Map_button onClick={active}>주사위 클릭</Map_button>
      {dice_active && <Dice></Dice>}
    </Map_div>
  );
};
export default AllowDiceAgain;
