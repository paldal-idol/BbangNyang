import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import socket from '@store/socket';
import userState from '@store/user';

import Messages from '@atoms/Messages';
import Input from '@atoms/ChatInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  border-radius: 8px;
  height: 50%;
`;

const ScrollContainer = styled.div`
  padding: 5% 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const GameChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const user = useRecoilValue(userState);
  // TODO : 채팅 로직 설계
  useEffect(() => {
    const startMessage = { user: 'admin', text: ' 게임이 시작되었습니다!' };
    setMessages([startMessage]);

    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    // TODO : 로직 설계
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  return (
    <Container>
      <ScrollContainer>
        <Messages messages={messages} user={user} />
      </ScrollContainer>
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </Container>
  );
};
export default GameChat;
