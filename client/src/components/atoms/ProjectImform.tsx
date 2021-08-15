import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import pie from '@img/bakery/pie.PNG';
import roadcat from '@img/bakery/Roadcat.PNG';

const Pie_img = styled.img`
  position: absolute;
  width: 200px;
  top: 861px;
  left: 600px;
  transition: 0.5s;
  transform-origin: top;
  transform-style: preserve-3d;
`;
const RoadCat_img = styled.img`
  position: absolute;
  width: 225px;
  top: 840px;
  left: 590px;
`;
const Container = styled.div`
  position: absolute;
  margin-left: -2400px;
  margin-bottom: 1400px;
`;
const ProjectImform: React.FC = () => {
  const [height, setHeight] = useState(0);
  const UpAndDown = () => {
    const time = Date.now() / 2500;
    setHeight(70 * Math.abs(Math.sin(time) ** 2));
  };
  useEffect(() => {
    setInterval(UpAndDown, 0);
  });
  return (
    <Container>
      <RoadCat_img
        src={roadcat}
        onClick={() => window.open('https://github.com/paldal-idol/BbangNyang')}
      />
      <Pie_img
        src={pie}
        style={{ transform: `perspective(800px) rotateX(${height}deg)` }}
        onClick={() => window.open('https://github.com/paldal-idol/BbangNyang')}
      />
    </Container>
  );
};

export default ProjectImform;
