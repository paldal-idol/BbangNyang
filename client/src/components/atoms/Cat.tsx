import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import pie from '@img/bakery/pie.PNG';
import cat from '@img/bakery/Cat.PNG';

const CatImage = styled.img`
  position: absolute;
  width: 1400px;
  z-index: 2;

  transition: 0.5s;
  transform-origin: bottom;
`;
const Pie = styled.img`
  position: absolute;
  width: 200px;
  top: 861px;
  left: 600px;
  transition: 0.5s;
  transform-origin: top;
  transform-style: preserve-2d;
`;

const Cat: React.FC = () => {
  const [height, setHeight] = useState(0);
  const UpAndDown = () => {
    const time = Date.now() / 1500;
    setHeight(5 * Math.abs(Math.sin(time)));
  };
  useEffect(() => {
    setInterval(UpAndDown, 0);
  });
  return <CatImage src={cat} />;
  // style={{ transform: `perspective(800px) rotate(${height}deg)` }}
};

export default Cat;
