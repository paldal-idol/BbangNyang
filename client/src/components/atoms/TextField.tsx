import * as React from 'react';
import styled from 'styled-components';

interface Props {
  type?: string;
  color?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  textAlign?: string;
  placeholder?: string;
  isRequired?: boolean;
  value?: any;
  onChange?: any;
}

const defaultProps = {
  type: 'text',
  color: '#bababc',
  width: '',
  height: '',
  fontSize: '1rem',
  textAlign: '',
  placeholder: '',
  isRequired: true,
  value: undefined,
  onChange: undefined,
};

const Input = styled.input<Props>`
  font-size: ${(props) => props.fontSize};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: transparent;
  color: ${(props) => props.color};
  border: 0.15rem solid;
  border-color: '#fdfdfd';
  border-top: none;
  border-left: none;
  border-right: none;
  text-align: ${(props) => props.textAlign};
  cursor: pointer;
  :hover {
    border-color: '#bdbdbd';
    transition: all ease 0.3s;
  }
  :focus {
    border-color: '#bdbdbd';
    outline: none;
  }
`;

const input: React.FC<Props> = ({
  type,
  placeholder,
  width,
  height,
  fontSize,
  color,
  textAlign,
  isRequired,
  value,
  onChange,
}: Props) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      width={width}
      height={height}
      fontSize={fontSize}
      textAlign={textAlign}
      color={color}
      value={value || ''}
      onChange={onChange}
      required={isRequired}
    />
  );
};

input.defaultProps = defaultProps;

export default input;