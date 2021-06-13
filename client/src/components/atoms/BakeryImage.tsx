import React from 'react';
import styled from 'styled-components';
import BakeryImage from '@img/bakery/bakery.PNG';

const Image = styled.img`
  width: 1800px;
  object-fit: cover;
  margin-left: 60px;
`;

const Bakery: React.FC = () => {
  return <Image src={BakeryImage} />;
};

export default Bakery;
