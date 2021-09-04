import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import diceState from '@store/dice';
import pie from '@img/map/pie.PNG';
import { useRecoilState, useRecoilValue } from 'recoil';
import Cat from '@atoms/Cat';

const Map_svgBottom = styled.svg`
  z-index: 1;
  position: absolute;
  // top: 16px;
`;
const Map_svgTop = styled.svg`
  z-index: 3;
  position: absolute;
  // top: 16px;
`;
const BoardImage = styled.img`
  position: absolute;
  width: 100px;

  // z-index: 1;
`;

const BoardContainer = styled.div`
  position: absolute;
  width: ${window.screen.width - 400}px;
  height: ${window.screen.height}px;
  z-index: 4;
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
        x: 280 * Math.cos((Math.PI * 34.5 * i) / 360) + window.screen.height / 2 - 20,
        y: 400 * Math.sin((Math.PI * 34.5 * i) / 360) + (window.screen.width - 400) / 2 - 50,
      }),
    );
  useEffect(() => {
    console.log(score);
  }, [score]);

  return (
    <>
      <Map_svgBottom width={window.screen.width - 400} height={window.screen.height}>
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
          cx={(window.screen.width - 400) / 2}
          cy={window.screen.height / 2 + 42}
          rx="400"
          ry="280"
          fill="none"
          stroke="#ba8749"
          stroke-width="120"
          style={{ zIndex: -1 }}
        ></ellipse>
        <rect
          x={(window.screen.width - 400) / 2 - 465}
          y={window.screen.height / 2 + 9}
          width="930"
          height="20"
          fill="none"
          stroke="black"
          stroke-width="10"
        ></rect>
        <ellipse
          cx={(window.screen.width - 400) / 2}
          cy={window.screen.height / 2 + 42}
          rx="465"
          ry="340"
          fill="none"
          style={{ borderRadius: '50%/100%' }}
          stroke="black"
          stroke-width="10"
        ></ellipse>

        <ellipse
          cx={(window.screen.width - 400) / 2}
          cy={window.screen.height / 2}
          rx="400"
          ry="280"
          fill="#673b00"
          style={{ zIndex: -1 }}
        ></ellipse>
      </Map_svgBottom>
      <Cat />
      <Map_svgTop width={window.screen.width - 400} height={window.screen.height}>
        <ellipse
          cx={(window.screen.width - 400) / 2}
          cy={window.screen.height / 2}
          rx="400"
          ry="280"
          fill="none"
          stroke="black"
          stroke-width="140"
        ></ellipse>
        <ellipse
          cx={(window.screen.width - 400) / 2}
          cy={window.screen.height / 2}
          rx="400"
          ry="280"
          fill="none"
          stroke="#ba8749"
          stroke-width="120"
        ></ellipse>
      </Map_svgTop>
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
