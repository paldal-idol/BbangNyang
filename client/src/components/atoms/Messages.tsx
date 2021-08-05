import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';


const Messages = ({ messages, name }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);
  
  return(
    <div style={{overflowY:'scroll', maxHeight:'490px'}}>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
      <div ref={messagesEndRef}/>
    </div>
);}
export default Messages;
