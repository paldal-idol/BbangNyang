import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CircleButton from '@atoms/CircleButton';

const Container = styled.div``;
const WaitingRoomUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/waiting')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers((current) => data);
      });
    return;
  }, []);

  return (
    <Container>
      <h2>참가자</h2>
      <ul>
        <li>
          <span className="users-username">은승균 </span>
          <CircleButton size="sm" variant="gray">
            x
          </CircleButton>
        </li>
        <li>
          <span className="users-username">서재명 </span>
          <CircleButton size="sm" variant="gray">
            x
          </CircleButton>
        </li>
        <li>
          <span className="users-username">김도연 </span>
          <CircleButton size="sm" variant="gray">
            x
          </CircleButton>
        </li>
        <li>
          <span className="users-username">차재명 </span>
          <CircleButton size="sm" variant="gray">
            x
          </CircleButton>
        </li>
      </ul>
      <h2>from server</h2>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </Container>
  );
};
export default WaitingRoomUsers;
