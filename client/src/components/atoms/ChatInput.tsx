import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
`;
const Input = styled.input`
  flex: 1;
  height: 2rem;
`;
const Button = styled.button``;

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
      Send
    </Button>
  </Form>
);
export default ChatInput;
