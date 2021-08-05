import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import styled, { css } from 'styled-components';
import { useRecoilState } from 'recoil';
import modalState from '@store/modal';
import userState from '@store/user';
import roomState from '@store/room';
import color from '@theme/color';
import Door from '@img/bakery/door.PNG';
interface DoorProps {
  isOpen: boolean;
}

const NewButton = styled.div`
  position: absolute;
  width: 55px;
  height: 25px;
  margin-left: 325px;
  margin-top: 140px;
  cursor: pointer;
`;

const DoorFront = styled.img`
  position: absolute;
  height: 234px;
  object-fit: cover;
  margin-left: 60px;
  overflow: hidden;
  margin-left: -5px;
  z-index: 1;
`;

const DoorBack = styled.div`
  position: absolute;
  width: 130px;
  height: 225px;
  background-color: ${color.bakery.doorBack};
  border: 4px solid black;
  margin-top: 2px;
  margin-left: -2px;
  transform: rotateY(180deg);
`;

const DoorContainer = styled.div<DoorProps>`
  position: absolute;
  width: 140px;
  height: 234px;
  margin-left: 328px;
  margin-top: 210px;
  cursor: pointer;
  transition: 0.5s;
  transform-origin: right;
  transform-style: preserve-3d;
  ${(props) =>
    props.isOpen &&
    css`
      transform: perspective(800px) rotateY(110deg);
    `}
`;

const BakeryDoor: React.FC = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);
  const [user, setUser] = useRecoilState(userState);
  const [room, setRoom] = useRecoilState(roomState);

  const OpenDoor = () => {
    setIsOpen(true);
    setModal('EntryCode');
  };
  const getCode = (callback) => {
    axios.get('http://localhost:8000/makeRoom').then((res) => {
      callback(res.data);
    });
  };

  const CreatNewRoom = async () => {
    if (confirm('새로운 방을 생성하시겠습니까?')) {
      getCode(async (data) => {
        setRoom(data.code);
        setUser(data.name);

        history.push('/waiting');
      });
    }
  };

  useEffect(() => {
    if (modal !== 'EntryCode') {
      setIsOpen(false);
    }
  }, [modal]);

  return (
    <>
      <DoorContainer isOpen={isOpen} onClick={OpenDoor}>
        <DoorFront src={Door} />
        <DoorBack />
      </DoorContainer>
      <NewButton onClick={CreatNewRoom} />
    </>
  );
};

export default BakeryDoor;
