import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  margin-left: -600px;
  margin-bottom: 100px;
`;
const Svg = styled.svg`
  position: absolute;
  height: 200px;
  object-fit: cover;
  margin-left: 60px;
  overflow: hidden;
`;
const Rect = styled.rect`
  overflow: hidden;
  fill-opacity: 0;
`;
const DeveloperImform: React.FC = () => {
  return (
    <Container>
      <Svg>
        <Rect
          x="35"
          y="25"
          rx="20"
          ry="20"
          width="75"
          height="70"
          onClick={() => window.open('https://github.com/do02reen24')}
        />
        <Rect
          x="115"
          y="25"
          rx="20"
          ry="20"
          width="75"
          height="70"
          onClick={() => window.open('https://github.com/dmstmdrbs')}
        />
        <Rect
          x="115"
          y="105"
          rx="20"
          ry="20"
          width="75"
          height="70"
          onClick={() => window.open('https://github.com/SuhJaemyoung')}
        />
        <Rect
          x="195"
          y="105"
          rx="20"
          ry="20"
          width="75"
          height="70"
          onClick={() => window.open('https://github.com/Coreight98')}
        />
      </Svg>
    </Container>
  );
};

export default DeveloperImform;
