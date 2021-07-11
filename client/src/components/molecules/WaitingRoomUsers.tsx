import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import usersState from '@store/users';
import styled from 'styled-components';
// import CircleButton from '@atoms/CircleButton';
// import io from 'socket.io-client';

// const Container = styled.div``;

// const ENDPOINT = 'localhost:8000';
// let socket;

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
  // return (
  //   <Container>
  //     <h2>참가자</h2>
  //     <ul>
  //       <li>
  //         <span className="users-username">은승균 </span>
  //         <CircleButton size="sm" variant="gray">
  //           x
  //         </CircleButton>
  //       </li>
  //       <li>
  //         <span className="users-username">서재명 </span>
  //         <CircleButton size="sm" variant="gray">
  //           x
  //         </CircleButton>
  //       </li>
  //       <li>
  //         <span className="users-username">김도연 </span>
  //         <CircleButton size="sm" variant="gray">
  //           x
  //         </CircleButton>
  //       </li>
  //       <li>
  //         <span className="users-username">차재명 </span>
  //         <CircleButton size="sm" variant="gray">
  //           x
  //         </CircleButton>
  //       </li>
  //     </ul>
  //   </Container>
  // );
};
export default WaitingRoomUsers;
