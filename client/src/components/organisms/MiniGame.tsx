import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CatImages } from '@utils/cat';
import pie from '@img/bakery/pie.PNG';
import MiniGameTitle from '../atoms/MiniGameTitle';
const Game_button = styled.button`
  position: absolute;
  display: inline-block;
`;
const Game_img = styled.img`
  position: absolute;
  width: 180px;
  z-index: 2;
`;
const MiniGame = () => {
  const [isStart, setIsStart] = useState(true);
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
          x: (index % 6) * 150,
          y: 150 * Math.floor(index / 6),
          hide: true,
        });
        return result;
      }, []),
    );
    setIsStart(false);
    setTimeout(() => setHide(Array(24).fill(false)), 1000);
  };

  const changeState = (idx, flag) => {
    setHide((hide) => ({ ...hide, [idx]: flag }));
    if (flag && !hide[idx]) {
      setQueue([...queue, idx]);
    }
  };

  useEffect(() => {
    if (queue.length >= 2) {
      if (catList[queue[0]]['value'] !== catList[queue[1]]['value']) {
        setTimeout(() => {
          queue.map((element) => {
            changeState(element, false);
          });
        }, 500);
      } else {
        setCount(count + 1);
      }
      setQueue([]);
    }
  }, [queue]);

  useEffect(() => {
    console.log(hide, hide.length, count);
    if (
      Object.values(hide).length ===
        Object.values(hide).reduce((result, element) => {
          result += element === true ? 1 : 0;
          return result;
        }, 0) &&
      count > 0
    ) {
      setIsStart(true);
    }
  }, [hide]);

  return (
    <>
      <div
        style={{
          visibility: isStart ? 'visible' : 'hidden',
        }}
      >
        <MiniGameTitle />
        <Game_button onClick={startGame}>시작하기</Game_button>
      </div>
      <div
        style={{
          visibility: !isStart ? 'visible' : 'hidden',
        }}
      >
        {catList.map((item, idx) => (
          <Game_img
            src={hide[idx] === true ? item['value'] : pie}
            style={{
              top: `${70 + item['y']}px`,
              left: `${670 + item['x']}px`,
            }}
            onClick={() => changeState(idx, true)}
          />
        ))}
      </div>
    </>
  );
};

export default MiniGame;
