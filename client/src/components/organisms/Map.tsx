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

const Map = () => {
  const [ar, setAr] = useState(
    Array.from({ length: 21 }, (v, i) => {
      i * 17;
    }),
  );
  return (
    <>
      <Map_svg width="100vw" height="100vh">
        <ellipse cx="1200" cy="700" rx="900" ry="600" fill="white"></ellipse>
      </Map_svg>
      <Map_div>
        {ar.map((undefined, i) => (
          <Map_img
            src={bowl}
            style={{
              top: `${500 * Math.cos((Math.PI * 34.5 * i) / 360) + 600}px`,
              left: `${800 * Math.sin((Math.PI * 34.5 * i) / 360) + 1100}px`,
            }}
          />
        ))}
      </Map_div>
      <Allow_dice_again />
    </>
  );
};
export default Map;
