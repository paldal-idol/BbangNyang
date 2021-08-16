import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import manual_1 from '@img/rule_book/manual_1.PNG';
import manual_2 from '@img/rule_book/manual_2.PNG';
import manual_3 from '@img/rule_book/manual_3.PNG';
import manual_4 from '@img/rule_book/manual_4.PNG';

interface ArrowProps {
  isLeft: boolean;
}
const images = [manual_1, manual_2, manual_3, manual_4];

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

const RuleBook: React.FC = () => {
  const [manualIndex, setManualIndex] = useState<number>(0);

  const handlePrevClick = useCallback((): void => {
    if (manualIndex <= 0) {
      setManualIndex(images.length - 1);
      return;
    }
    setManualIndex(manualIndex - 1);
  }, [manualIndex]);

  const handleNextClick = useCallback((): void => {
    if (manualIndex + 1 === images.length) {
      setManualIndex(0);
      return;
    }
    setManualIndex(manualIndex + 1);
  }, [manualIndex]);

  return (
    <Container>
      <Arrow isLeft={true} onClick={handlePrevClick} id="left_arrow">
        <AiOutlineArrowLeft />
      </Arrow>
      <FillImage src={images[manualIndex]} />
      <Arrow isLeft={false} onClick={handleNextClick} id="right_arrow">
        <AiOutlineArrowRight />
      </Arrow>
    </Container>
  );
};

export default RuleBook;
