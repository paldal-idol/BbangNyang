import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import _ from 'lodash';

import { CatImages } from '@utils/cat';
import socket from '@store/socket';
import userState from '@store/user';
import usersState from '@store/users';
import roomState from '@store/room';
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
  const history = useHistory();
  const [isMaster, setIsMaster] = useState(false);
  const user = useRecoilValue(userState);
  const [room, setRoom] = useRecoilState(roomState);
  const [users, setUsers] = useRecoilState(usersState);
  const [userList, setUserList] = useState(null);
  const [characters, setCharacters] = useRecoilState(selectedCharacter);

  useEffect(() => {
    console.log(`changed user to ${user}`);

    socket.on('changeUsers', ({ users }) => {
      console.log(users);
      setUsers(users);
      setUserList(users);
      const newCharacters = users.map((user) => user.character);
      setCharacters(newCharacters);
    });
  }, [user]);

  useEffect(() => {
    setUserList(users);
    socket.on('roomData', ({ room, users }: any) => {
      setUserList(users);
    });

    socket.on('kickOutUserId', (userId) => {
      console.log(userId, user);
      if (userId === user.userId) {
        setRoom('');
        history.push('/');
        alert('방장이 회원님을 강퇴했습니다.');
      }
    });
    if (users.length > 0 && users[0].hasOwnProperty('name')) {
      if (users[0].userId === user.userId) {
        setIsMaster(true);
      } else {
        setIsMaster(false);
      }
    }
  }, [users]);

  const expulsionUser = (user) => {
    const result = confirm(`${user.name}님을 강퇴하시겠습니까?`);
    if (result) {
      socket.emit('kickOutUser', user);
    }
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
              {isMaster && users[0].userId !== user.userId && (
                <ExpulsionButton onClick={() => expulsionUser(user)}>X</ExpulsionButton>
              )}
            </UserItem>
          );
        })}
      </Container>
    )
  );
};
export default WaitingRoomUsers;
