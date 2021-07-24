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

class Node {
  element;
  next;
  prev;
  constructor(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  }
}
class playerSequence {
  head;
  constructor() {
    this.head = new Node('head');
    this.head.next = this.head;
  }
  find(item) {
    let currNode = this.head;
    while (currNode.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }
  insert(newElement, item) {
    let newNode = new Node(newElement);
    let current = this.find(item);
    if (current.next == null) {
      newNode.next = null;
      newNode.prev = current;
      current.next = newNode;
    } else {
      newNode.next = current.next;
      newNode.prev = current;
      current.next.prev = newNode;
      current.next = newNode;
    }
  }
  // display() {
  //   let currNode = this.head;
  //   while (!(currNode.next == null) && !(currNode.next.element == 'head')) {
  //     console.log(currNode.next.element);
  //     currNode = currNode.next;
  //   }
  // }
  remove(item) {
    let currNode = this.find(item);
    if (!(currNode.next == null)) {
      //자신 노드가 삭제되기 위해 앞뒤 노드를 연결시켜주는 과정
      currNode.prev.next = currNode.next;
      currNode.next.prev = currNode.prev;
      currNode.next = null;
      currNode.prev = null;
    }
  }
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
  const playersequence = new playerSequence();
  player_list.reduce((i, p) => {
    playersequence.insert(i, p);
    return p;
  });

  const [ar, setAr] = useState([]);
  useEffect(() => {
    const arr = Array.from({ length: 21 }, (v, i) => {
      return [
        500 * Math.cos((Math.PI * 34.5 * i) / 360) + 600,
        800 * Math.sin((Math.PI * 34.5 * i) / 360) + 1100,
      ];
    });
    setAr(arr);
    console.log(arr);
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
