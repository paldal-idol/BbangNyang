import * as React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  disabled: boolean;
  size: string;
  variant: string;
  onClick: () => void;
  children: React.ReactNode;
};
function CircleButton(Props) {
  const sizeStyle = SIZES[Props.size];
  const variantStyle = VARIANTS[Props.variant];
  const onClick = Props.onClick;

  return (
    <StyledButton
      onClick={onClick}
      disabled={Props.disabled}
      sizeStyle={sizeStyle}
      variantStyle={variantStyle}
    >
      {Props.children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  ${(p) => p.sizeStyle}
  ${(p) => p.variantStyle}
	
  margin: 0;
  border: none;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: var(--button-font-size, 1rem);
  padding: var(--button-padding, 12px 16px);
  border-radius: var(--button-radius, 8px);
  background: var(--button-bg-color, #0d6efd);
  color: var(--button-color, #ffffff);

  &:active,
  &:hover,
  &:focus {
    background: var(--button-hover-bg-color, #025ce2);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, #025ce2);
  }
`;

const SIZES = {
  sm: css`
    --button-font-size: 0.875rem;
    --button-padding: 8px 12px;
    --button-radius: 100%;
  `,
  md: css`
    --button-font-size: 1rem;
    --button-padding: 12px 16px;
    --button-radius: 100%;
  `,
  lg: css`
    --button-font-size: 1.25rem;
    --button-padding: 16px 20px;
    --button-radius: 100px;
  `,
};

//성공, 오류, 경고 등 여러 상황을 위한 props
const VARIANTS = {
  gray: css`
    --button-color: #000000;
    --button-bg-color: #e5e5e5;
    --button-hover-bg-color: #dbdbdb;
  `,
  bbang: css`
    --button-color: #000000;
    --button-bg-color: #f9f4c6;
    --button-hover-bg-color: #f5efba;
  `,
  success: css`
    --button-color: #ffffff;
    --button-bg-color: #28a745;
    --button-hover-bg-color: #218838;
  `,
  error: css`
    --button-color: #ffffff;
    --button-bg-color: #dc3545;
    --button-hover-bg-color: #c82333;
  `,
  warning: css`
    --button-color: #212529;
    --button-bg-color: #ffc107;
    --button-hover-bg-color: #e0a800;
  `,
};
export default CircleButton;
