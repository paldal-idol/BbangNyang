import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import pie from '@img/map/pie.PNG';
import AllowDiceAgain from '@/components/organisms/AllowDiceAgain';
const Map_svg = styled.svg`
  z-index: 1;
  position: absolute;
`;
const Map_img = styled.img`
  position: absolute;
  width: 210px;
  z-index: 2;
`;
const Map_div = styled.div`
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
  // print() {
  //   let string = `${this.data} | `;
  //   let p = this.link;
  //   while (p !== this) {
  //     string += `${p.data} | `;
  //     p = p.link;
  //   }
  //   string += p.data;
  //   console.log(string);
  // }
}

class Player {
  score;
  lift_list;
  init = () => {
    this.lift_list = [];
    this.score = 0;
  };
}

const Map = () => {
  const [player_list, setPayer_list] = useState([]);
  const mapPosition = Array(21)
    .fill(0)
    .map((v, i) =>
      Object({
        x: 500 * Math.cos((Math.PI * 34.5 * i) / 360) + 600,
        y: 800 * Math.sin((Math.PI * 34.5 * i) / 360) + 1100,
      }),
    );
  useEffect(() => {
    let player_sequence = new Node('head');
    for (let i = 0; i < player_list.length; i++) {
      player_sequence.insert(player_list[i]);
    }
  }, []);
  return (
    <>
      <Map_svg width="100vw" height="100vh">
        <ellipse cx="1200" cy="700" rx="900" ry="600" fill="white"></ellipse>
      </Map_svg>
      <Map_div>
        {mapPosition.map((item, idx) => (
          <Map_img
            src={pie}
            style={{
              top: `${item.x}px`,
              left: `${item.y}px`,
            }}
          />
        ))}
      </Map_div>
      <AllowDiceAgain />
    </>
  );
};
export default Map;
