import React from 'react';
import styled from 'styled-components';
import BakeryImage from '@img/bakery/bakery.PNG';
const Bakery: React.FC = () => {
  return (
    <>
      <p>베이커리</p>
      <img src={BakeryImage} />
    </>
  );
};

export default Bakery;
