import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import rule1 from '@img/rules/rule1.PNG';
import rule2 from '@img/rules/rule2.PNG';
import rule3 from '@img/rules/rule3.PNG';
import rule4 from '@img/rules/rule4.PNG';

interface ArrowProps {
  isLeft: boolean;
}
const rules = [rule1, rule2, rule3, rule4];

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
      setManualIndex(rules.length - 1);
      return;
    }
    setManualIndex(manualIndex - 1);
  }, [manualIndex]);

  const handleNextClick = useCallback((): void => {
    if (manualIndex + 1 === rules.length) {
      setManualIndex(0);
      return;
    }
    setManualIndex(manualIndex + 1);
  }, [manualIndex]);

  return (
    <Container>
      <Arrow isLeft={true} onClick={handlePrevClick} id="leftArrow">
        <AiOutlineArrowLeft />
      </Arrow>
      <FillImage src={rules[manualIndex]} />
      <Arrow isLeft={false} onClick={handleNextClick} id="rightArrow">
        <AiOutlineArrowRight />
      </Arrow>
    </Container>
  );
};

export default RuleBook;
