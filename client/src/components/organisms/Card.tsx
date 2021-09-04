import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const CardDiv = styled.div`
  margin-top: 300px;
  margin-left: 600px;
  z-index: 3;
  position: absolute;
  width: 120px;
  height: 200px;
  top: 500;
  left: 800;
  border: 8px solid #000000;
  background: white;
  box-sizing: border-box;
  border-radius: 30px;
`;

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

const Card = () => {
  return (
    <>
      <CardDiv></CardDiv>
    </>
  );
};
export default Card;
