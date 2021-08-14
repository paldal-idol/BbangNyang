import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import _ from 'lodash';

import { CatImages } from '@utils/cat';
import socket from '@store/socket';
import userState from '@store/user';
import usersState from '@store/users';
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
  const [isMaster, setIsMaster] = useState(true);
  const name = useRecoilValue(userState);
  const [users, setUsers] = useRecoilState(usersState);
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    socket.on('changeUsers', ({ users }) => {
      //TODO : socket broadcast를 통해 방의 모든 유저가 이름을 변경한 유저를 갱신해야 함.
      console.log(users);
      setUsers(users);
      // TODO : 방장인지 확인하는 코드 작성 -> isMaster 업데이트
    });
  }, []);

  useEffect(() => {
    setUserList(users);
    socket.on('roomData', ({ room, users }: any) => {
      console.log('socket.on : roomData');
      setUserList(users);
      console.log(users[0].character);
    });
  }, [users]);

  const expulsionUser = () => {
    // TODO : 강퇴하는 코드 작성
    alert('강퇴하시겠습니까?');
  };

  // TODO : 실제 데이터를 받아오도록 변경
  const testUserList = [
    { name: 'Test1', catId: 1, isReady: true },
    { name: 'COCO', catId: 2, isReady: true },
    { name: 'Hello', catId: 3, isReady: false },
    { name: 'MOOMIN PAPA', catId: 4, isReady: false },
    { name: 'DYKIM', catId: 5, isReady: true },
    { name: 'TEST', catId: 6, isReady: false },
  ];

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
