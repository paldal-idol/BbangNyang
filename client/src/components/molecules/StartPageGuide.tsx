import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import guide1 from '@img/guide/StartPageGuide1.PNG';
interface ArrowProps {
  isLeft: boolean;
}

const images = [guide1];

const Container = styled.div`
  width: 800px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FillImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Arrow = styled.div<ArrowProps>`
  display: flex;
  width: 50px;
  height: 50px;
  background-color: gray;
  border-radius: 50%;
  ${(props) => (props.isLeft ? 'left: 5px' : 'right: 5px')};
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
  cursor: pointer;
`;

const StartPageGuide: React.FC = () => {
  const [guideIndex, setGuideIndex] = useState<number>(0);

  const handlePrevClick = useCallback((): void => {
    if (guideIndex <= 0) {
        setGuideIndex(images.length - 1);
      return;
    }
    setGuideIndex(guideIndex - 1);
  }, [guideIndex]);

  const handleNextClick = useCallback((): void => {
    if (guideIndex + 1 === images.length) {
        setGuideIndex(0);
      return;
    }
    setGuideIndex(guideIndex + 1);
  }, [guideIndex]);

  return (
    <Container>
      <Arrow isLeft={true} onClick={handlePrevClick} id="left_arrow">
        <AiOutlineArrowLeft />
      </Arrow>

      <FillImage src={images[guideIndex]} />

      <Arrow isLeft={false} onClick={handleNextClick} id="right_arrow">
        <AiOutlineArrowRight />
      </Arrow>
    </Container>
    // <Test>테스트</Test>
  );
};

export default StartPageGuide;
