import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import modalState from '@store/modal';
import roomState from '@store/room';
import Modal from '@atoms/Modal';
import color from '@theme/color';

import { CatImages } from '@utils/cat';

interface buttonProps {
  backgroundColor: string;
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 720px;
  height: 560px;
  background-color: ${color.primary.darkYellow};
  border-radius: 10px;
`;

const CatContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 640px;
  height: 450px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 540px;
  height: 80px;
`;

const CodeInput = styled.input`
  width: 220px;
  height: 45px;
  font-size: 20px;
  text-align: center;
  border: 0px solid black;
`;

const Button = styled.button<buttonProps>`
  width: 130px;
  height: 47px;
  font-size: 18px;
  color: white;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  border: 0px;
`;

const CatImg = styled.img`
  width: 150px;
`;

const CatSelectModal: React.FC = () => {
  const history = useHistory();
  const setModal = useSetRecoilState(modalState);
  // TODO : Recoil로 초기이름 정보 가져오기
  const [userName, setUserName] = useState('초기이름');
  const [room, setRoom] = useRecoilState(roomState);
  const userNameInput = useRef(null);

  const codeHandler = () => {
    const newUserName = userNameInput.current.value;
    if (newUserName.length < 2) {
      alert('닉네임을 최소 2자 이상 입력해주세요.');
      return false;
    }
    // TODO : Recoil로 이름 정보 변경하기
    closeModal();
  };

  const closeModal = () => {
    setModal('');
  };

  return (
    <Modal>
      <Content>
        <CatContainer>
          {CatImages.map((cats, index) => (
            <CatImg src={cats} key={index} />
          ))}
        </CatContainer>
        <ButtonContainer>
          <CodeInput
            placeholder="변경할 닉네임을 입력해주세요"
            ref={userNameInput}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            value={userName}
          ></CodeInput>
          <Button backgroundColor={color.button.orange} onClick={codeHandler}>
            변경
          </Button>
          <Button backgroundColor={color.button.darkGray} onClick={closeModal}>
            취소
          </Button>
        </ButtonContainer>
      </Content>
    </Modal>
  );
};

export default CatSelectModal;
