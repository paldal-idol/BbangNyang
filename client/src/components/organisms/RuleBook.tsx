import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import manual_1 from '@img/rule_book/manual_1.PNG';
import manual_2 from '@img/rule_book/manual_2.PNG';
import manual_3 from '@img/rule_book/manual_3.PNG';
import manual_4 from '@img/rule_book/manual_4.PNG';

const images = [manual_1, manual_2, manual_3, manual_4];

const Container = styled.div`
  width: 800px;
  height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FillImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Arrow = styled.div<{ isLeft: boolean }>`
  width: 50px;
  height: 50px;
  background-color: gray;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  ${(props) => (props.isLeft ? 'left: 5px' : 'right: 5px')};
  transform: translate(-5px, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
  cursor: pointer;
`;

const RuleBook = (): JSX.Element => {
  const [manualIndex, setManualIndex] = useState<number>(0);
  // 기본으로 0번째 인덱스에 위치한 사진을 렌더링

  // 왼쪽 화살표 클릭
  const handlePrevClick = useCallback((): void => {
    if (manualIndex <= 0) {
      // -1 했을 때, 배열의 인덱스를 벗어난다면

      setManualIndex(images.length - 1);
      return;
    }
    setManualIndex(manualIndex - 1);
    // 인덱스 감소
  }, [manualIndex]);

  // 오른쪽 화살표 클릭
  const handleNextClick = useCallback((): void => {
    if (manualIndex + 1 === images.length) {
      // +1 했을 때, 배열의 인덱스를 벗어난다면
      // 첫 페이지로 이동
      setManualIndex(0);
      return;
    }

    setManualIndex(manualIndex + 1);
    // 인덱스 증가
  }, [manualIndex]);
  return (
    <Container>
      <FillImage src={images[manualIndex]} />

      <Arrow isLeft={true} onClick={handlePrevClick} id="left_arrow">
        <AiOutlineArrowLeft />
      </Arrow>

      <Arrow isLeft={false} onClick={handleNextClick} id="right_arrow">
        <AiOutlineArrowRight />
      </Arrow>
    </Container>
  );
};

export default RuleBook;
