import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import userState from '@store/user';
import miniUsersState from '@store/miniUsers';
import { CatImages } from '@utils/cat';
import random from '@img/bakery/random.PNG';
import MiniGameTitle from '../atoms/MiniGameTitle';
import { nodeName } from 'jquery';

const MiniGameButton = styled.button`
  margin-bottom: 10px;
`;

const MiniGameImage = styled.img`
  width: 150px;
  z-index: 2;
`;

const MiniGameOuterDiv = styled.div`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
const MiniGameInnerDiv = styled.div`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
const RankModal = styled.div`
  box-shadow: 0px 4px 10px rgba(51, 51, 51, 0.1), 0px 0px 4px rgba(51, 51, 51, 0.05);
  border-radius: 40px;
  width: 400px;
  height: 300px;
  flex-direction: column;
  padding: 20px;
`;
const RankInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const MiniGame = () => {
  const [gameTime, setGameTime] = useState(new Date());
  const [isStart, setIsStart] = useState(true);
  const [rank, setRank] = useState(true);
  const [user, setUser] = useRecoilState(userState);
  const [users, setUsers] = useRecoilState(miniUsersState);
  const [catList, setCatList] = useState(
    [...CatImages, ...CatImages].sort(() => Math.random() - 0.5),
  );
  const [count, setCount] = useState(0);
  const [queue, setQueue] = useState([]);
  const [hide, setHide] = useState(Array(24).fill(true));

  const startGame = () => {
    setCatList(
      catList.reduce((result, element, index) => {
        result.push({
          value: element,
          // x: (index % 6) * 150,
          // y: 150 * Math.floor(index / 6),
          hide: true,
        });
        return result;
      }, []),
    );
    setIsStart(false);
    setTimeout(() => setHide(Array(24).fill(false)), 1000);
    setGameTime(new Date());
  };
  const showRanking = () => {
    rank ? setRank(false) : setRank(true);
  };
  const changeState = (idx, flag) => {
    setHide((hide) => ({ ...hide, [idx]: flag }));
    flag && !hide[idx] ? setQueue([...queue, idx]) : null;
  };

  useEffect(() => {
    if (queue.length >= 2) {
      catList[queue[0]]['value'] !== catList[queue[1]]['value']
        ? setTimeout(() => {
            queue.map((element) => {
              changeState(element, false);
            });
          }, 500)
        : setCount(count + 1);
      setQueue([]);
    }
  }, [queue]);

  useEffect(() => {
    if (
      Object.values(hide).length ===
        Object.values(hide).reduce((result, element) => {
          result += element === true ? 1 : 0;
          return result;
        }, 0) &&
      count > 0
    ) {
      let endTime = new Date();
      let t = `${endTime.getMinutes() - gameTime.getMinutes()}분${
        endTime.getSeconds() - gameTime.getSeconds()
      }초`;
      setIsStart(true);
      setUsers((prev) => [
        ...prev,
        { id: user.id, name: user.name, character: user.character, clearTime: t },
      ]);
    }
  }, [hide]);

  return (
    <>
      <MiniGameOuterDiv
        style={{
          display: isStart ? 'flex' : 'none',
        }}
      >
        <MiniGameTitle />
        <MiniGameButton onClick={startGame}>시작하기</MiniGameButton>
        <MiniGameButton onClick={showRanking}>랭킹보기</MiniGameButton>
        <RankModal
          style={{
            display: !rank ? 'flex' : 'none',
          }}
        >
          {users.map((element) =>
            element.clearTime !== undefined ? (
              <RankInner>
                <img style={{ width: '40px' }} src={CatImages[user.character]} />
                <div>{user.name}</div>
                <div>{element.clearTime}</div>
              </RankInner>
            ) : null,
          )}
        </RankModal>
      </MiniGameOuterDiv>
      <MiniGameInnerDiv
        style={{
          display: !isStart ? 'flex' : 'none',
        }}
      >
        {catList.map((item, idx) => (
          <MiniGameImage
            src={hide[idx] === true ? item['value'] : random}
            onClick={() => changeState(idx, true)}
          />
        ))}
      </MiniGameInnerDiv>
    </>
  );
};

export default MiniGame;
