import React from 'react';
import styled from 'styled-components';
import Bakery from '@img/bakery/bakery.PNG';

const Image = styled.img`
  position: absolute;
  height: 600px;
  width: 800px;
  object-fit: cover;
  margin-left: 60px;
  overflow: hidden;
`;

const BakeryImage: React.FC = () => {
  return <Image src={Bakery} />;
};

export default BakeryImage;
