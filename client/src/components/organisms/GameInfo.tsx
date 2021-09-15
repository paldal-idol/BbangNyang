import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import color from '@theme/color';
import { CatImages } from '@utils/cat';
import usersState from '@store/users';

const Container = styled.div`
  padding: 32px;
  border-bottom: 1px solid black;
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
  const [users, setUsers] = useRecoilState(usersState);
  const [userList, setUserList] = useState([]);
  const [round, setRound] = useState(0);
  const [turn, setTurn] = useState(0);
  // const userList = [
  //   // TODO : user 정보 가져오기 및 턴 순서대로 배치
  //   { name: '무무', character: 1, score: 10 },
  //   { name: '안드로이드', character: 5, score: 20 },
  //   { name: '코니', character: 2, score: 35 },
  //   { name: '우만동 족발', character: 10, score: 20 },
  // ];
  useEffect(() => {
    console.log(users);
    const list = Array.from(users).sort((user1: any, user2: any) => {
      return user1.order - user2.order;
    });
    setUserList(list);
  }, []);

  return (
    userList && (
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
    )
  );
};

export default GameInfo;
