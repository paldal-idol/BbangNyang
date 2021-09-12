import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import userState from '@store/user';
import usersState from '@store/users';
import socketIO from '@store/socket';
import color from '@theme/color';
import cat from '@img/bakery/GameCat.PNG';
import { CatImages } from '@utils/cat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const CardContainer = styled.div`
  display: flex;
`;

const Card = styled.div<CardProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 400px;
  margin: 10px;
  border-radius: 24px;
  border: 8px solid ${(props) => (props.isSelected ? color.primary.darkYellow : 'black')};
  --stripe: white;
  --bg: ${color.primary.gray};
  background: linear-gradient(135deg, var(--bg) 25%, transparent 25%) -50px 0,
    linear-gradient(225deg, var(--bg) 25%, transparent 25%) -50px 0,
    linear-gradient(315deg, var(--bg) 25%, transparent 25%),
    linear-gradient(45deg, var(--bg) 25%, transparent 25%);
  background-size: 100px 100px;
  background-color: var(--stripe);
`;

const UnselectedImage = styled.img`
  margin-top: -80px;
  width: 800px;
`;

const SelectedImage = styled.img`
  width: 240px;
  margin-left: -15px;
`;

const Text = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

const OrderText = styled.div<CardProps>`
  position: absolute;
  margin-top: -320px;
  margin-left: -180px;
  font-weight: bold;
  font-size: 48px;
  color: ${(props) => (props.isSelected ? 'red' : 'black')};
`;

interface CardProps {
  isSelected: boolean;
}

const SelectGameOrder = () => {
  const [user, setUser] = useRecoilState(userState);
  const [users, setUsers] = useRecoilState(usersState);
  const [isMaster, setIsMaster] = useState(false);
  const [randomOrder, setRandomOrder] = useState([]);
  const [clickedCardList, setClickedCardList] = useState([]);
  //TODO : loading 시간동안 카드 펼쳐지는 애니메이션 있으면 좋을 듯
  const [loading, setLoading] = useState(null);
  const [isSelect, setIsSelect] = useState(false);

  useEffect(() => {
    if (users.length > 0 && users[0].hasOwnProperty('name')) {
      if (users[0].name === user.name) {
        setIsMaster(true);
        socketIO.emit('getRandomOrder', users[0]);
      } else {
        setIsMaster(false);
      }

      socketIO.on('randomOrderArray', (randomOrderArray) => {
        setRandomOrder(randomOrderArray);
        setClickedCardList(Array.from(users, (x) => false));
        setLoading(true);
      });
    }

    socketIO.on('setClicked', (clickedList) => {
      setClickedCardList(clickedList);
    });
  }, []);

  useEffect(() => {
    if (clickedCardList.length > 0) {
      const check = clickedCardList.includes(false);
      if (check === false) {
        setUser({ ...user, isGame: true });
      }
    }
  }, [clickedCardList]);

  const flipCard = (clickedIndex) => {
    socketIO.emit(
      'setOrder',
      { clicked: clickedCardList, clickedIndex: clickedIndex, order: randomOrder[clickedIndex] },
      (clickedList) => {
        setClickedCardList(clickedList);
        setUser({ ...user, order: randomOrder[clickedIndex] });
        setIsSelect(true);
      },
    );
  };

  const onClickCard = (idx) => {
    if (isSelect === false) {
      if (clickedCardList[idx] === false) {
        flipCard(idx);
      } else {
        alert('다른 사용자가 먼저 선택하였습니다');
      }
    } else {
      alert('이미 카드를 선택하셨습니다');
    }
  };
  if (!loading) {
    return <Container>로딩중...</Container>;
  }
  if (loading) {
    return (
      <Container>
        <Text>게임 진행 순서를 정합니다. 카드를 골라주세요.</Text>
        <CardContainer>
          {users.map((user, idx) => (
            <Card
              key={idx}
              onClick={() => onClickCard(idx)}
              isSelected={user.order === idx ? true : false}
            >
              {!clickedCardList[idx] ? (
                <UnselectedImage src={cat} />
              ) : (
                <>
                  <OrderText isSelected={user.order === idx ? true : false}>{user.order}</OrderText>
                  <SelectedImage src={CatImages[user.character]} />
                </>
              )}
            </Card>
          ))}
        </CardContainer>
      </Container>
    );
  }
};

export default SelectGameOrder;
