import * as React from 'react';
import styled from 'styled-components';
import color from '@theme/color';

const Button = styled.button`
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin: 4px 12px;
  padding: 0px;
  background: transparent;
  color: black;
  &:hover {
    color: ${color.button.darkYellow};
    cursor: pointer;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  }
`;

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

function TextButton({ onClick, children }: Props) {
  return <Button onClick={onClick}>{children}</Button>;
}
export default TextButton;
