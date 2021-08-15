import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import _ from 'lodash';

import socket from '@store/socket';
import userState from '@store/user';
import usersState from '@store/users';
import modalState from '@store/modal';
import roomState from '@store/room';
import Modal from '@atoms/Modal';
import color from '@theme/color';
import selectedCharacter from '@store/selectedCharacter';

import { CatImages } from '@utils/cat';

interface buttonProps {
  backgroundColor: string;
}

interface imageProps {
  valid: boolean;
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

const CatImg = styled.img<imageProps>`
  width: 150px;
  opacity: ${(props) => (props.valid ? '100%' : '40%')};
`;

const CatSelectModal: React.FC = () => {
  const history = useHistory();
  const [modal, setModal] = useRecoilState(modalState);
  // TODO : Recoil로 초기이름 정보 가져오기
  const [user, setUser] = useRecoilState(userState);
  const [users, setUsers] = useRecoilState(usersState);
  const [userName, setUserName] = useState(user);
  const [room, setRoom] = useRecoilState(roomState);
  const userNameInput = useRef(null);
  const [characters, setCharacters] = useRecoilState(selectedCharacter);

  useEffect(() => {
    console.log(characters);
  }, [users]);
  const codeHandler = () => {
    const newUserName = userNameInput.current.value;
    if (newUserName.length < 2) {
      alert('닉네임을 최소 2자 이상 입력해주세요.');
      return false;
    }
    // TODO : Recoil로 이름 정보 변경하기
    if (users) {
      const isUser = (existUser) => existUser.name === user;
      const oldUserIndex = users.findIndex(isUser);
      console.log(oldUserIndex);

      socket.emit('changeName', userName, () => setUser(userName));

      const newUsers = _.cloneDeep(users);
      newUsers[oldUserIndex].name = userName;

      setUsers(newUsers);
    }

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
            <CatImg
              src={cats}
              key={index}
              valid={characters.find((cat) => cat === index) ? false : true}
            />
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
