import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import color from "@theme/color";
import Door from "@img/bakery/door.png";

interface DoorProps {
  isOpen: boolean;
}

const NewButton = styled.div`
  position: absolute;
  width: 55px;
  height: 25px;
  margin-left: 325px;
  margin-top: 140px;
  cursor: pointer;
`;

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

const DoorContainer = styled.div<DoorProps>`
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

const BakeryDoor: React.FC = ({ handleClick }: any) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // const [modal, setModal] = useRecoilState(modalState);
  // const [user, setUser] = useRecoilState(userState);
  // const [users, setUsers] = useRecoilState(usersState);
  // const [room, setRoom] = useRecoilState(roomState);

  const OpenDoor = () => {
    setIsOpen(!isOpen);
    handleClick();
    // setModal("EntryCode");
  };
  // const getCode = (callback) => {
  //   axios.get("http://localhost:8000/makeRoom").then((res) => {
  //     callback(res.data);
  //   });
  // };

  const CreatNewRoom = () => {
    if (confirm("새로운 방을 생성하시겠습니까?")) {
      // getCode((data) => {
      //   // setUsers([]);
      //   // setRoom(data.code);
      //   // setUser({ ...user, name: data.name });
      //   navigate("/waiting");
      // });
    }
  };

  // useEffect(() => {
  //   if (modal !== "EntryCode") {
  //     setIsOpen(false);
  //   }
  // }, [modal]);

  return (
    <>
      <DoorContainer isOpen={isOpen} onClick={OpenDoor}>
        <DoorFront src={Door} />
        <DoorBack />
      </DoorContainer>
      <NewButton onClick={CreatNewRoom} />
    </>
  );
};

export default BakeryDoor;
