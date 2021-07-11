import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import modalState from '@store/modal';
import userState from '@store/user';
import roomState from '@store/room';
import Modal from '@atoms/Modal';
import color from '@theme/color';

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
  width: 220px;
  height: 45px;
  font-size: 20px;
  text-align: center;
  margin-bottom: 16px;
  border: 0px solid black;
`;

const Button = styled.button<buttonProps>`
  width: 230px;
  height: 35px;
  font-size: 18px;
  color: white;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  border: 0px;
`;

const EntryCodeModal: React.FC = () => {
  const history = useHistory();
  const setModal = useSetRecoilState(modalState);
  const [user, setUser] = useRecoilState(userState);
  const [room, setRoom] = useRecoilState(roomState);

  const codeHandler = () => {
    // TODO : 올바른 입장 코드인지 확인하는 코드 작성
    closeModal();
    history.push(`/waiting`);
  };

  const closeModal = () => {
    setModal('');
  };

  return (
    <Modal>
      <Content>
        <CodeInput
          placeholder="코드를 입력해주세요."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <CodeInput
          placeholder="닉네임을 입력해주세요"
          onChange={(event) => {
            setUser(event.target.value);
          }}
        ></CodeInput>
        <Button backgroundColor={color.button.orange} onClick={codeHandler}>
          입장
        </Button>
        <Button backgroundColor={color.button.darkGray} onClick={closeModal}>
          돌아가기
        </Button>
      </Content>
    </Modal>
  );
};

export default EntryCodeModal;
