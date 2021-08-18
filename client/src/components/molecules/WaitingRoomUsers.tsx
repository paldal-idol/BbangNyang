import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import _ from 'lodash';

import { CatImages } from '@utils/cat';
import socket from '@store/socket';
import userState from '@store/user';
import usersState from '@store/users';
import selectedCharacter from '@store/selectedCharacter';
import color from '@theme/color';

interface UserInfoProps {
  isReady: boolean;
}

const Container = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const UserItem = styled.div`
  display: flex;
  width: 100%;
`;

const UserInfo = styled.div<UserInfoProps>`
  display: flex;
  width: 100%;
  opacity: ${(props) => (props.isReady ? '100%' : '40%')};
`;

const CatImg = styled.img`
  width: 50px;
  height: 50px;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 20px;
  padding-left: 8px;
  color: ${color.primary.black};
`;

const ExpulsionButton = styled.button`
  margin-left: 10px;
  background-color: transparent;
  border: 0px;
  cursor: pointer;
  font-size: 20px;
  color: ${color.button.darkYellow};
  &:hover {
    color: ${color.button.orange};
  }
`;

const WaitingRoomUsers = () => {
  const [isMaster, setIsMaster] = useState(false);
  const name = useRecoilValue(userState);
  const [users, setUsers] = useRecoilState(usersState);
  const [userList, setUserList] = useState(null);
  const [characters, setCharacters] = useRecoilState(selectedCharacter);

  useEffect(() => {
    socket.on('changeUsers', ({ users }) => {
      //TODO : socket broadcast를 통해 방의 모든 유저가 이름을 변경한 유저를 갱신해야 함.
      setUsers(users);
      const newCharacters = users.map((user) => user.character);
      setCharacters(newCharacters);
    });
  }, []);

  useEffect(() => {
    setUserList(users);
    socket.on('roomData', ({ room, users }: any) => {
      setUserList(users);
    });
    if (users.length > 0 && users[0].hasOwnProperty('name')) {
      if (users[0].name === name) {
        setIsMaster(true);
      } else {
        setIsMaster(false);
      }
    }
  }, [users]);

  const expulsionUser = () => {
    // TODO : 강퇴하는 코드 작성
    alert('강퇴하시겠습니까?');
  };

  return (
    userList && (
      <Container>
        {userList.map((user, i) => {
          return (
            <UserItem key={i}>
              <UserInfo isReady={user.isReady}>
                <CatImg src={CatImages[user.character]} />
                <UserName>{user.name}</UserName>
              </UserInfo>
              {isMaster && <ExpulsionButton onClick={expulsionUser}>X</ExpulsionButton>}
            </UserItem>
          );
        })}
      </Container>
    )
  );
};
export default WaitingRoomUsers;
