import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const Messages = ({ messages, user }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <>
      {messages.map((message, i) => (
        <Message key={i} message={message} id={user.id} />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};
export default Messages;
