import styled from "@emotion/styled";

interface buttonProps {
  backgroundColor: string;
}

const Button = styled.button<buttonProps>`
  width: 230px;
  height: 60px;
  font-size: 18px;
  color: white;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  border: 0px;
  margin: 5px;
`;

export default Button;
