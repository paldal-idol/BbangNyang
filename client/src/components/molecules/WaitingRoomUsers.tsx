import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import _ from 'lodash';

import socket from '@store/socket';
import usersState from '@store/users';

const WaitingRoomUsers = () => {
  const [userList,setUsersList] = useRecoilState(usersState);
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    
  },[]);
  useEffect(() => {
    if(userList.length>=1){
      socket.on('changeName',({oldUser,newUser})=>{
        //TODO : socket broadcast를 통해 방의 모든 유저가 이름을 변경한 유저를 갱신해야 함.
        // console.log(oldUser, newUser);
        // console.log(userList); => null?
        // const isUser = (existUser)=>existUser.name===oldUser;
        // const oldUserIndex = userList.findIndex(isUser);
        // const newUsers = _.cloneDeep(userList);
        // console.log(newUsers);
        // newUsers[oldUserIndex].name=newUser;
        // console.log(newUsers);
        // setUsersList(newUsers);
        // setUsers(newUsers);
      })
    }
    console.log(userList);
    setUsers(userList);
  }, [userList]);

  return (
    <div>
      <ul>
        {users.map((user, i) => {
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
