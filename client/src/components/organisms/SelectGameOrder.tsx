import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import userState from '@store/user';
import usersState from '@store/users';
import socketIO from '@store/socket';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const CardContainer = styled.div`
  display: flex;
`;
const Card = styled.div`
  width: 250px;
  height: 400px;
  margin: 10px;
  font-size: 1.5rem;
  background: #d2ef24;
`;
const SelectGameOrder = () => {
  const [user, setUser] = useRecoilState(userState);
  const [users, setUsers] = useRecoilState(usersState);
  // 방장이 emit(getRandomOrder)
  const [isMaster, setIsMaster] = useState(false);
  // const users = ['user1', 'user2', 'user3', 'user4'];

  // 서버로부터 받아온 random order list
  const [order, setOrder] = useState([]);

  // 서버로부터 받아온 클릭된 card list
  const [clicked, setClicked] = useState([]);

  //TODO : loading 시간동안 카드 펼쳐지는 애니메이션 있으면 좋을 듯
  const [loading, setLoading] = useState(null);

  // isSelect가 false 일때만 카드 선택 가능
  const [isSelect, setIsSelect] = useState(false);

  useEffect(() => {
    //방장만 emit

    if (users.length > 0 && users[0].hasOwnProperty('name')) {
      if (users[0].name === user.name) {
        setIsMaster(true);
        socketIO.emit('getRandomOrder', users[0]);
      } else {
        setIsMaster(false);
      }

      socketIO.on('randomOrderArray', (randomOrderArray) => {
        console.log(randomOrderArray);
        setOrder(randomOrderArray);
        setClicked(Array.from(users, (x) => false));
        setLoading(true);
      });
    }

    socketIO.on('setClicked', (clickedList) => {
      console.log(clickedList);
      setClicked(clickedList);
    });
  }, []);

  useEffect(() => {
    if (clicked.length > 0) {
      const check = clicked.includes(false);
      if (check === false) {
        setUser({ ...user, isGame: true });
      }
    }
  }, [clicked]);

  const flipCard = (clickedIndex) => {
    socketIO.emit('setOrder', { clicked: clicked, clickedIndex: clickedIndex }, (clickedList) => {
      console.log(clickedList);
      setClicked(clickedList);
      setUser({ ...user, order: order[clickedIndex] });
      setIsSelect(true);
    });
  };

  if (!loading) return <Container>로딩중...</Container>;
  if (loading)
    return (
      <Container>
        <p>게임 진행 순서를 정합니다. 카드를 골라주세요.</p>
        <br />
        {user.order && <p>선택된 순서 : {user.order}</p>}

        <CardContainer>
          {users.map((user, idx) => (
            <Card
              key={idx}
              onClick={() => {
                if (isSelect === false) {
                  if (clicked[idx] === false) {
                    flipCard(idx);
                  } else {
                    alert('다른 사용자가 먼저 선택하였습니다');
                  }
                } else {
                  alert('이미 카드를 선택하셨습니다');
                }
              }}
            >
              {!clicked[idx] ? <p>카드를 클릭해 순서를 정합니다</p> : <p>이미 선택된 카드입니다</p>}
            </Card>
          ))}
        </CardContainer>
      </Container>
    );
};
export default SelectGameOrder;
