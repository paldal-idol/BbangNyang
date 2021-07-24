import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import bowl from '@img/map/bowl.PNG';
import Allow_dice_again from '@organisms/Allow_dice_again';
const Map_svg = styled.svg`
  z-index: 1;
  position: absolute;
`;
const Map_img = styled.img`
  position: absolute;
  width: 200px;
  z-index: 2;
`;
const Map_div = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

class node {
  data;
  link;
  constructor(item) {
    this.data = item;
    this.link = null;
  }

  insert(item) {
    let newNode = new node(item);
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

class player {
  score;
  lift_list;
  init = () => {
    //얼마나 업힐까 리스트
    this.lift_list = [];
    this.score = 0;
  };
}

const Map = () => {
  //플레이어 실행 순서, 원형 링크드리스트로 구현
  const [player_list, setPayer_list] = useState([]);

  const [ar, setAr] = useState([]);
  useEffect(() => {
    const arr = Array.from({ length: 21 }, (v, i) => {
      return [
        500 * Math.cos((Math.PI * 34.5 * i) / 360) + 600,
        800 * Math.sin((Math.PI * 34.5 * i) / 360) + 1100,
      ];
    });
    setAr(arr);

    let player_sequence = new node('head');
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
        {ar.map((item, idx) => (
          <Map_img
            src={bowl}
            style={{
              top: `${item[0]}px`,
              left: `${item[1]}px`,
            }}
          />
        ))}
      </Map_div>
      <Allow_dice_again />
    </>
  );
};
export default Map;
