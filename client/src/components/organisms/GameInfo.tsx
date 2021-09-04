import React from 'react';
import styled from 'styled-components';
import color from '@theme/color';
import { CatImages } from '@utils/cat';

const Container = styled.div`
  margin: 32px;
`;

const Round = styled.p`
  font-size: 42px;
  text-align: center;
  color: ${color.primary.blue};
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  margin-bottom: 10px;
`;

const Score = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: ${color.primary.darkYellow};
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  font-size: 28px;
`;

const UserItem = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const UserName = styled.div<UserNameProps>`
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 20px;
  padding-left: 10px;
  color: ${color.primary.black};
  opacity: ${(props) => (props.isTurn ? 1 : 0.35)};
`;

const CatImg = styled.img`
  width: 50px;
  height: 50px;
`;

interface UserNameProps {
  isTurn: boolean;
}

const GameInfo = () => {
  const round = 5; // TODO : 몇 번째 라운드인지. 한바퀴 돌 때마다 증가
  const turn = 1; // TODO : 턴 순서 가져오기
  const userList = [
    // TODO : user 정보 가져오기 및 턴 순서대로 배치
    { name: '무무', character: 1, score: 10 },
    { name: '안드로이드', character: 5, score: 20 },
    { name: '코니', character: 2, score: 35 },
    { name: '우만동 족발', character: 10, score: 20 },
  ];
  return (
    <Container>
      <Round>--- {round} Round ---</Round>
      {userList.map((user, i) => {
        return (
          <UserItem key={i}>
            <CatImg src={CatImages[user.character]} />
            <UserName isTurn={i === turn}>{user.name}</UserName>
            <Score>{user.score}</Score>
          </UserItem>
        );
      })}
    </Container>
  );
};

export default GameInfo;
