import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import socket from '@store/socket';
import modalState from '@store/modal';
import userState from '@store/user';
import roomState from '@store/room';
import gameSettingState from '@store/gameSetting';
import Modal from '@atoms/Modal';
import color from '@theme/color';
import axios from 'axios';
interface buttonProps {
  backgroundColor: string;
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 240px;
  background-color: ${color.primary.darkYellow};
  border-radius: 10px;
`;

const CodeInput = styled.input`
  width: 230px;
  height: 60px;
  font-size: 20px;
  text-align: center;
  margin-bottom: 5px;
  border: 0px solid black;
`;

const Button = styled.button<buttonProps>`
  width: 230px;
  height: 60px;
  font-size: 18px;
  color: white;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  border: 0px;
  margin: 5px;
`;

const EntryCodeModal: React.FC = () => {
  const history = useHistory();
  const setModal = useSetRecoilState(modalState);
  const [user, setUser] = useRecoilState(userState);
  const [room, setRoom] = useRecoilState(roomState);
  const [gameSetting, setGameSetting] = useRecoilState(gameSettingState);
  const codeHandler = () => {
    socket.emit('checkRoom', room);

    socket.on('fullRoom', () => {
      alert('꽉 찬 방입니다.');
    });

    socket.on('existRoom', (round) => {
      axios
        .get('http://localhost:8000/getName')
        .then((res) => {
          setUser({ ...user, name: res.data.name });
          console.log('ggu', user);
        })
        .then(() => {
          closeModal();
          setGameSetting((v) => ({ round: round }));
          console.log(round);
          history.push(`/waiting`);
        });
    });
    socket.on('nonExistRoom', () => {
      alert('존재하지 않는 방입니다.');
    });
  };
  const closeModal = () => {
    setModal('');
  };

  return (
    <Modal>
      <Content>
        <CodeInput
          placeholder="입장코드"
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <Button backgroundColor={color.button.orange} onClick={codeHandler}>
          입장하기
        </Button>
        <Button backgroundColor={color.button.darkGray} onClick={closeModal}>
          돌아가기
        </Button>
      </Content>
    </Modal>
  );
};

export default EntryCodeModal;
