import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import usersState from '@store/users';
import styled from 'styled-components';

const WaitingRoomUsers = () => {
  const userList = useRecoilValue(usersState);
  const [users, setUsers] = useState([]);
  useEffect(() => {
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
