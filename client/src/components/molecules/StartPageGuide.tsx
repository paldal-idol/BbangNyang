import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import guide1 from '@img/guide/StartPageGuide1.PNG';
interface ArrowProps {
  isLeft: boolean;
}

const images = [guide1];

const Container = styled.div`
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FillImage = styled.img`
  width: 1108px;
  height: 742px;
  object-fit: cover;
`;

const Arrow = styled.div<ArrowProps>`
  display: flex;
  width: 50px;
  height: 50px;
  background-color: gray;
  border-radius: 50%;
  ${(props) => (props.isLeft ? 'left: 20px' : 'right: 20px')};
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
        document.getElementById('left_arrow').style.display = "none";
      return;
    }
    if (guideIndex === 1) {
      document.getElementById('left_arrow').style.display = "block";
    }

    setGuideIndex(guideIndex - 1);
  }, [guideIndex]);

  const handleNextClick = useCallback((): void => {
    if (guideIndex + 1 === images.length) {
        setGuideIndex(0);
        document.getElementById('right_arrow').style.display = "none";
      return;
    } 
    if (guideIndex + 2 === images.length) {
      document.getElementById('right_arrow').style.display = "block";
    }

    setGuideIndex(guideIndex + 1);
  }, [guideIndex]);

  return (
    <Container>
      <Arrow id="left_arrow" isLeft={true} onClick={handlePrevClick}>
        <AiOutlineArrowLeft />
      </Arrow>

      <FillImage src={images[guideIndex]} />

      <Arrow id="right_arrow" isLeft={false} onClick={handleNextClick}>
        <AiOutlineArrowRight />
      </Arrow>
    </Container>
    // <Test>테스트</Test>
  );
};

export default StartPageGuide;
