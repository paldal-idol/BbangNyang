import { ChangeEventHandler } from "react";

import styled from "@emotion/styled";
import color from "@theme/color";

const Block = styled.div`
  display: flex;
  margin-top: 4px;
`;

const Input = styled.input`
  flex: 1;
  height: 32px;
  padding: 4px 20px;
  border: 0px;
`;

const Button = styled.button`
  width: 60px;
  border: 0px;
  cursor: pointer;
  background-color: ${color.button.darkYellow};
`;

type ChatInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: (text: string) => void;
};

const ChatInput = ({ value, onChange, onSubmit }: ChatInputProps) => (
  <Block>
    <Input
      type="text"
      placeholder="메시지를 입력해주세요."
      value={value}
      onChange={onChange}
      onKeyDown={(event) => (event.key === "Enter" ? onSubmit(value) : null)}
    />
    <Button onClick={() => onSubmit(value)}>전송</Button>
  </Block>
);
export default ChatInput;
