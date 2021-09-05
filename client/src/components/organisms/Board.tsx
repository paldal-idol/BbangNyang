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
  width: ${window.screen.width - 400}px;
  height: 100%;
`;
const Map_svgTop = styled.svg`
  z-index: 3;
  position: absolute;
  // top: 16px;
  width: ${window.screen.width - 400}px;
  height: 100%;
`;
const BoardImage = styled.img`
  position: absolute;
  width: 100px;
  // z-index: 1;
`;

const BoardContainer = styled.div`
  position: absolute;
  z-index: 3;
  width: ${window.screen.width - 400}px;
  height: 100%;
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
      <Map_svgBottom>
        <ellipse
          cx={(window.screen.width - 400) / 2}
          cy={window.screen.height / 2 + 42}
          rx={(402 * window.screen.width) / 1680}
          ry={(280 * window.screen.height) / 1050}
          fill="none"
          stroke="#ba8749"
          stroke-width="120"
          style={{ zIndex: -1 }}
        ></ellipse>
        <rect
          x={(window.screen.width - 400) / 2 - 463}
          y={window.screen.height / 2 + 9}
          width="926"
          height="20"
          fill="none"
          stroke="black"
          stroke-width="4"
        ></rect>
        <ellipse
          cx={(window.screen.width - 400) / 2}
          cy={window.screen.height / 2 + 42}
          rx={(463 * window.screen.width) / 1680}
          ry={(340 * window.screen.height) / 1050}
          fill="none"
          style={{ borderRadius: '50%/100%' }}
          stroke="black"
          stroke-width="4"
        ></ellipse>
        <ellipse
          cx={(window.screen.width - 400) / 2}
          cy={window.screen.height / 2}
          rx={(400 * window.screen.width) / 1680}
          ry={(280 * window.screen.height) / 1050}
          fill="#673b00"
          style={{ zIndex: -1 }}
        ></ellipse>
      </Map_svgBottom>
      <Cat />
      <Map_svgTop>
        <ellipse
          cx={(window.screen.width - 400) / 2}
          cy={window.screen.height / 2}
          rx={(400 * window.screen.width) / 1680}
          ry={(280 * window.screen.height) / 1050}
          fill="none"
          stroke="black"
          stroke-width="130"
        ></ellipse>
        <ellipse
          cx={(window.screen.width - 400) / 2}
          cy={window.screen.height / 2}
          rx={(400 * window.screen.width) / 1680}
          ry={(280 * window.screen.height) / 1050}
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
