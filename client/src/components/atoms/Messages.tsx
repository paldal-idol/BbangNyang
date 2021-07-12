import React from 'react';
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const ScrollContainer = styled.div`
  padding: 5% 0;
  overflow: auto;
  flex: auto;
`;

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    <ScrollContainer>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollContainer>
  </ScrollToBottom>
);
export default Messages;
