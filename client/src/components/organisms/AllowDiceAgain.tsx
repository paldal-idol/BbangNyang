import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import Dice from '@organisms/Dice';
import diceState from '@store/dice';

const MapContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  margin-top: 500px;
  margin-left: 1100px;
  z-index: 2;
  top: 500;
  left: 800;
`;
const MapButton = styled.button`
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
    <MapContainer>
      <h1>{diceValue}</h1>
      <MapButton onClick={active}>주사위 클릭</MapButton>
      {diceActive && <Dice />}
    </MapContainer>
  );
};
export default AllowDiceAgain;
