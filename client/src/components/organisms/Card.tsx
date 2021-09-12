import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const CardDiv = styled.div`
  z-index: 3;
  margin-top: ${window.screen.height / 2 - 100}px;
  margin-left: ${400}px;
  position: absolute;
  width: 120px;
  height: 200px;
  top: 500;
  left: 800;
  border: 4px solid #000000;
  background: white;
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
