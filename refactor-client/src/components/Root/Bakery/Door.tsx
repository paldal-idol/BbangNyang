import styled from "@emotion/styled";

import color from "@theme/color";
import Door from "@img/bakery/door.png";

type DoorStateType = {
  isOpen: boolean;
};

type DoorType = {
  handleClick: VoidFunction;
} & DoorStateType;

const DoorFront = styled.img`
  position: absolute;
  height: 234px;
  object-fit: cover;
  margin-left: 60px;
  overflow: hidden;
  margin-left: -5px;
  z-index: 1;
`;

const DoorBack = styled.div`
  position: absolute;
  width: 130px;
  height: 225px;
  background-color: ${color.bakery.doorBack};
  border: 4px solid black;
  margin-top: 2px;
  margin-left: -2px;
  transform: rotateY(180deg);
`;

const DoorContainer = styled.div<DoorStateType>`
  position: absolute;
  width: 140px;
  height: 234px;
  margin-left: 310px;
  margin-top: 210px;
  cursor: pointer;
  transition: 0.5s;
  transform-origin: right;
  transform-style: preserve-3d;
  ${(props) =>
    props.isOpen &&
    `
      transform: perspective(800px) rotateY(110deg);
    `}
`;

function BakeryDoor({ isOpen, handleClick }: DoorType) {
  const OpenDoor = () => {
    handleClick();
  };

  return (
    <>
      <DoorContainer isOpen={isOpen} onClick={OpenDoor}>
        <DoorFront src={Door} />
        <DoorBack />
      </DoorContainer>
    </>
  );
}

export default BakeryDoor;
