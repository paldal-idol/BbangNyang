import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import diceState from '@store/dice';
import pie from '@img/map/pie.PNG';
import { useRecoilState, useRecoilValue } from 'recoil';
import Cat from '@atoms/Cat';

const Map_svg = styled.svg`
  // z-index: 1;
  position: absolute;
  top: 16px;
`;
const BoardImage = styled.img`
  position: absolute;
  width: 100px;

  // z-index: 1;
`;

const BoardContainer = styled.div`
  position: absolute;
  // width: 100vw;
  // height: 100vh;
`;

const Map = () => {
  const [playerList, setPayerList] = useState([]);
  const score = useRecoilValue(diceState);
  const boardPosition = Array(21)
    .fill(0)
    .map((v, i) =>
      Object({
        x: 280 * Math.cos((Math.PI * 34.5 * i) / 360) + 380,
        y: 400 * Math.sin((Math.PI * 34.5 * i) / 360) + 450,
      }),
    );
  useEffect(() => {
    console.log(score);
  }, [score]);

  return (
    <>
      <Cat />
      <Map_svg width="100vw" height="100vh">
        {/* <rect
          x="126"
          y="518"
          width="100"
          height="320"
          fill="none"
          stroke="black"
          stroke-width="10"
        ></rect> */}
        <ellipse
          cx="500"
          cy="440"
          rx="400"
          ry="280"
          fill="none"
          stroke="#ba8749"
          stroke-width="120"
          style={{ zIndex: -1 }}
        ></ellipse>
        <ellipse
          cx="500"
          cy="436"
          rx="465"
          ry="340"
          fill="none"
          style={{ borderRadius: '50%/100%' }}
          stroke="black"
          stroke-width="10"
        ></ellipse>
        <rect
          x="35"
          y="418"
          width="930"
          height="20"
          fill="none"
          stroke="black"
          stroke-width="10"
        ></rect>
        <ellipse
          cx="500"
          cy="400"
          rx="400"
          ry="280"
          fill="#673b00"
          style={{ zIndex: -1 }}
        ></ellipse>
        <ellipse
          cx="500"
          cy="400"
          rx="400"
          ry="280"
          fill="none"
          stroke="black"
          stroke-width="140"
        ></ellipse>
        <ellipse
          cx="500"
          cy="400"
          rx="400"
          ry="280"
          fill="none"
          stroke="#ba8749"
          stroke-width="120"
        ></ellipse>
      </Map_svg>
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
    </>
  );
};
export default Map;
