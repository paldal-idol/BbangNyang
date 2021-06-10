import React from 'react';
import styled from 'styled-components';
import BbangNyangTitle from '../components/organisms/BbangNyangTitle';
import Bakery from '../components/organisms/Bakery';

const StartPage: React.FC = () => {
  return (
    <>
      <BbangNyangTitle />
      <Bakery />
    </>
  );
};

export default StartPage;
