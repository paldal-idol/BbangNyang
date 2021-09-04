import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import pie from '@img/bakery/pie.PNG';
import cat from '@img/bakery/Cat.PNG';

const CatImage = styled.img`
  position: absolute;
  z-index: 2;
  max-height: 800px;
  max-width: 1000px;
  margin-top: 114px;
`;

const Cat: React.FC = () => {
  return <CatImage src={cat} />;
};

export default Cat;
