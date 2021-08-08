import React from 'react';
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const ScrollContainer = styled.div`
  padding: 5% 0;
  overflow: auto;
  width: 100%;
  height: 60vh;
  min-height: 440px;
  max-height: 500px;
`;

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    <ScrollContainer>
      {messages.map((message, i) => (
        <Message key={i} message={message} name={name} />
      ))}
    </ScrollContainer>
  </ScrollToBottom>
);
export default Messages;
