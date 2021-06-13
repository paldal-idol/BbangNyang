import React from 'react';
import styled from 'styled-components';
import Door from '@img/bakery/bakery-door.PNG';

const Image = styled.img`
  position: absolute;
  height: 1200px;
  width: 1600px;
  object-fit: cover;
  margin-left: 60px;
  overflow: hidden;
`;

const NewButton = styled.div`
  position: absolute;
  border: 10px solid red;
  width: 90px;
  height: 40px;
  margin-left: 540px;
  margin-top: 280px;
  cursor: pointer;
`;

const DoorContainer = styled.div`
  position: absolute;
  border: 10px solid blue;
  width: 280px;
  height: 440px;
  margin-left: 530px;
  margin-top: 420px;
  cursor: pointer;
`;

const BakeryDoor: React.FC = () => {
  const DoorHandler = () => {
    alert('door!');
  };

  const NewHandler = () => {
    alert('new!');
  };
  return (
    <>
      <Image src={Door} />
      <DoorContainer onClick={DoorHandler} />
      <NewButton onClick={NewHandler} />
    </>
  );
};

export default BakeryDoor;
