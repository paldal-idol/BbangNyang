import React from 'react';
import styled from 'styled-components';
import BbangNyangTitle from '../components/organisms/BbangNyangTitle';
import Bakery from '../components/organisms/Bakery';
import Dice from '../components/organisms/Dice';

const StartPage: React.FC = () => {
  return (
    <>
      <BbangNyangTitle />
      <Bakery />
      <Dice />
    </>
  );
};

export default StartPage;
