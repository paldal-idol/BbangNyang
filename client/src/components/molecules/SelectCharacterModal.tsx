import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import _ from 'lodash';

import socketIO from '@store/socket';
import userState from '@store/user';
import usersState from '@store/users';
import modalState from '@store/modal';
import roomState from '@store/room';
import userCharacter from '@store/character';
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
  cursor: pointer;
  opacity: ${(props) => (props.valid ? '100%' : '40%')};
`;

const CatSelectModal: React.FC = () => {
  // const history = useHistory();
  const [modal, setModal] = useRecoilState(modalState);
  // TODO : Recoil로 초기이름 정보 가져오기
  const [user, setUser] = useRecoilState(userState);
  const [users, setUsers] = useRecoilState(usersState);
  const [userName, setUserName] = useState(user);
  // const [room, setRoom] = useRecoilState(roomState);
  const userNameInput = useRef(null);
  // const [character, setCharacter] = useRecoilState(userCharacter);
  const [characters, setCharacters] = useRecoilState(selectedCharacter);
  // const [changeCharacter, setChangeCharacter] = useState(null);

  useEffect(() => {
    // socket.on('roomData', ({ users }: any) => {
    //   console.log(users);
    //   setUsers(users);
    // });
    socketIO.socket.on('changeUsers', ({ users }: any) => {
      console.log(users);
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    const newCharacters = users.map((user) => user.character);
    setCharacters(newCharacters);
  }, [users]);

  const codeHandler = () => {
    const newUserName = userNameInput.current.value;
    if (newUserName.length < 2) {
      alert('닉네임을 최소 2자 이상 입력해주세요.');
      return false;
    }
    // TODO : Recoil로 이름 정보 변경하기
    const oldUserIndex = findMyIndex();
    const newUsers = _.cloneDeep(users);

    if (newUsers[oldUserIndex].name !== userName.name) {
      socketIO.socket.emit('changeName', userName.name, () => {
        setUser(userName);
        newUsers[oldUserIndex].name = userName.name;
      });
    }

    closeModal();
  };
  const isValidCat = (index) => {
    return characters.find((cat) => cat === index) === undefined;
  };

  const findMyIndex = () => {
    const isUser = (existUser) => existUser.userId === user.userId;
    return users.findIndex(isUser);
  };

  const setCharacter = (index) => {
    setUser({ ...user, character: index });
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
              valid={isValidCat(index)}
              onClick={() => {
                if (isValidCat(index)) {
                  //TODO: 선택된 고양이로 정보 업데이트
                  if (users) {
                    socketIO.socket.emit('changeCharacter', index, () => {
                      setCharacter(index);
                    });
                  }
                } else {
                  alert('사용중이거나 선택할 수 없는 캐릭터 입니다');
                }
              }}
            />
          ))}
        </CatContainer>
        <ButtonContainer>
          <CodeInput
            placeholder="변경할 닉네임을 입력해주세요"
            ref={userNameInput}
            onChange={(event) => {
              setUserName({ ...userName, name: event.target.value });
            }}
            value={userName.name}
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
