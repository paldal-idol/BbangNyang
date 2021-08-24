import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const ScrollContainer = styled.div`
  padding: 5% 0;
  width: 100%;
  height: 30vh;
  min-height: 440px;
  max-height: 500px;
  overflow-y: scroll;
`;

const Messages = ({ messages, user }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <ScrollContainer>
      {messages.map((message, i) => (
        <Message key={i} message={message} id={user.id} />
      ))}
      <div ref={messagesEndRef} />
    </ScrollContainer>
  );
};
export default Messages;
