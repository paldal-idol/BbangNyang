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
  width: 120px;

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
        x: 280 * Math.cos((Math.PI * 34.5 * i) / 360) + 456,
        y: 500 * Math.sin((Math.PI * 34.5 * i) / 360) + 630,
      }),
    );
  useEffect(() => {
    console.log(score);
  }, [score]);

  return (
    <>
      <Cat />
      <Map_svg width="100vw" height="100vh">
        <ellipse
          cx="690"
          cy="490"
          rx="500"
          ry="280"
          fill="#673b00"
          style={{ zIndex: -1 }}
        ></ellipse>
      </Map_svg>
      <Map_svg width="100vw" height="100vh">
        <ellipse
          cx="690"
          cy="490"
          rx="500"
          ry="280"
          fill="none"
          stroke="black"
          stroke-width="140"
        ></ellipse>
      </Map_svg>
      <Map_svg width="100vw" height="100vh">
        <ellipse
          cx="690"
          cy="490"
          rx="500"
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
