import React from 'react';
import styled from 'styled-components';
import color from '@theme/color';

const Form = styled.form`
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

const ChatInput = ({ setMessage, sendMessage, message }) => (
  <Form className="form">
    <Input
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
    />
    <Button className="sendButton" onClick={(e) => sendMessage(e)}>
      전송
    </Button>
  </Form>
);
export default ChatInput;
