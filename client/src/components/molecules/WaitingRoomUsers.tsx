import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import _ from 'lodash';

import socket from '@store/socket';
import usersState from '@store/users';

const WaitingRoomUsers = () => {
  const [users,setUsers] = useRecoilState(usersState);
  const [userList, setUserList] = useState([]);

  useEffect(()=>{
    socket.on('changeUsers',({users})=>{
      //TODO : socket broadcast를 통해 방의 모든 유저가 이름을 변경한 유저를 갱신해야 함.
      console.log(users);
      setUsers(users);
    })
  },[]);
  useEffect(() => {

    setUserList(users);
  }, [users]);

  return (
    <div>
      <ul>
        {userList.map((user, i) => {
          return (
            <li key={i}>
              <span>{user.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default WaitingRoomUsers;
