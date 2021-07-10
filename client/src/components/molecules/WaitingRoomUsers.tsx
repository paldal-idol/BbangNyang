import React from 'react';
import styled from 'styled-components';
import CircleButton from '@atoms/CircleButton';

const WaitingRoomUsers = () => {
  const Container = styled.div``;
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
    </Container>
  );
};
export default WaitingRoomUsers;
