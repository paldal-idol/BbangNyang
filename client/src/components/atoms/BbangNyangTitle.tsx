import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 70px;

  & span {
    display: inline-block;
    animation: float 0.2s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: none;
    }
    33% {
      transform: translateY(-1px) rotate(-2deg);
    }
    66% {
      transform: translateY(1px) rotate(2deg);
    }
  }

  &:hover span {
    animation: bounce 0.6s;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translate(0);
    }
    25% {
      transform: rotateX(20deg) translateY(2px) rotate(-3deg);
    }
    50% {
      transform: translateY(-20px) rotate(3deg) scale(1.1);
    }
  }

  & span:nth-child(2) {
    animation-delay: 0.05s;
  }
  & span:nth-child(3) {
    animation-delay: 0.1s;
  }
  & span:nth-child(4) {
    animation-delay: 0.15s;
  }
  & span:nth-child(5) {
    animation-delay: 0.2s;
  }
  & span:nth-child(6) {
    animation-delay: 0.25s;
  }
  & span:nth-child(7) {
    animation-delay: 0.3s;
  }
  & span:nth-child(8) {
    animation-delay: 0.35s;
  }
  & span:nth-child(9) {
    animation-delay: 0.4s;
  }
  & span:nth-child(10) {
    animation-delay: 0.45s;
  }
  & span:nth-child(11) {
    animation-delay: 0.5s;
  }
  & span:nth-child(12) {
    animation-delay: 0.55s;
  }
`;

const Text = styled.span`
  text-shadow: -5px 0 black, 0 5px black, 5px 0 black, 0 -5px black;

  &:nth-child(4n) {
    color: hsl(50, 75%, 55%);
  }
  &:nth-child(4n-1) {
    color: hsl(135, 35%, 55%);
  }
  &:nth-child(4n-2) {
    color: hsl(155, 35%, 60%);
  }
  &:nth-child(4n-3) {
    color: hsl(30, 65%, 60%);
  }
`;

const BbangNyangTitle: React.FC = () => {
  return (
    <>
      <Title>
        <Text>빵</Text>
        <Text>냥</Text>
        <Text>빵</Text>
        <Text>냥</Text>
        <Text>&nbsp;</Text>
        <Text>구</Text>
        <Text>출</Text>
        <Text>&nbsp;</Text>
        <Text>대</Text>
        <Text>작</Text>
        <Text>전</Text>
        <Text>!</Text>
      </Title>
    </>
  );
};

export default BbangNyangTitle;
