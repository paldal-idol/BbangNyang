import React from "react";
import styled from "@emotion/styled";
import Bakery from "@img/bakery/bakery.png";

const Image = styled.img`
  position: absolute;
  height: 600px;
  width: 800px;
  object-fit: cover;
  margin-left: 100px;
  overflow: hidden;
`;

const BakeryBackground: React.FC = () => {
  return (
    <>
      <Image src={Bakery} />
    </>
  );
};

export default BakeryBackground;
