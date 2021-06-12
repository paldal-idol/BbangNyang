import React from 'react';
import styled from 'styled-components';
import BbangNyangTitle from '@organisms/BbangNyangTitle';
import Bakery from '@organisms/Bakery';

const StartPage: React.FC = () => {
  return (
    <>
      <BbangNyangTitle />
      <Bakery />
    </>
  );
};

export default StartPage;
