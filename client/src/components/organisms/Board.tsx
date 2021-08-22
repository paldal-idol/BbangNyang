import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import pie from '@img/map/pie.PNG';
import AllowDiceAgain from '@organisms/AllowDiceAgain';


const BoardImage = styled.img`
  position: absolute;
  width: 210px;
  z-index: 1;
`;

const BoardContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

class Node {
  data;
  link;
  constructor(item) {
    this.data = item;
    this.link = null;
  }

  insert(item) {
    let newNode = new Node(item);
    let p = this;
    if (this.link === null) {
      this.link = newNode;
      newNode.link = this;
    } else {
      while (p.link !== this) {
        p = p.link;
      }
      p.link = newNode;
      newNode.link = this;
    }
  }

  remove(item) {
    if (this.link == null) return null;
    console.log('dw');
    let p = this;
    let q;
    while (p.link !== this) {
      q = p;
      p = p.link;
      if (p.data == item) {
        break;
      }
    }
    q.link = p.link;
  }
}

class Player {
  score;
  liftList;
  init = () => {
    this.liftList = [];
    this.score = 0;
  };
}

const Map = () => {
  const [playerList, setPayerList] = useState([]);
  const boardPosition = Array(21)
    .fill(0)
    .map((v, i) =>
      Object({
        x: 500 * Math.cos((Math.PI * 34.5 * i) / 360) + 600,
        y: 800 * Math.sin((Math.PI * 34.5 * i) / 360) + 1100,
      }),
    );
  useEffect(() => {
    let playerSequence = new Node('head');
    for (let i = 0; i < playerList.length; i++) {
      playerSequence.insert(playerList[i]);
    }
  }, []);
  return (
    <>
      <BoardContainer>
        {boardPosition.map((item, idx) => (
          <BoardImage
            src={pie}
            style={{
              top: `${item.x}px`,
              left: `${item.y}px`,
            }}
          />
        ))}
      </BoardContainer>
      <AllowDiceAgain />
    </>
  );
};
export default Map;
