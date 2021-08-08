import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import modalState from '@store/modal';
import userState from '@store/user';
import roomState from '@store/room';
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

  const codeHandler = () => {
    // TODO : 올바른 입장 코드인지 확인하는 코드 작성
    // TODO : 방장 채팅 오류 -> 소켓 문제인 것 같습니다
    // TODO : 입장시에 닉네임 중복 체크 OR 랜덤 닉네임 생성, 중복되면 채팅 오류
    // setUser('test..');
    
    axios.get('http://localhost:8000/getName').then(res=>{
      setUser(res.data.name);
    }).then(()=>{
      closeModal();
      history.push(`/waiting`);
    })
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
