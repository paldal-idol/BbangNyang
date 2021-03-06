import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue, useRecoilState } from 'recoil';

import styled from 'styled-components';

import socket from '@store/socket';
import userState from '@store/user';
import roomState from '@store/room';
import usersState from '@store/users';

import Messages from '@atoms/Messages';
import Input from '@atoms/ChatInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
`;

const ScrollContainer = styled.div`
  padding: 5% 0;
  width: 100%;
  height: 30vh;
  min-height: 440px;
  max-height: 500px;
  overflow-y: scroll;
`;

const WaitingRoomChat = () => {
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const user = useRecoilValue(userState);
  const [room, setRoom] = useRecoilState(roomState);
  const [users, setUsers] = useRecoilState(usersState);

  useEffect(() => {
    messages.forEach((item) => {
      users.forEach((user) => {
        if (item.user !== 'admin' && user.id === item.user.id && user.name !== item.user.name) {
          item.user = { ...item.user, name: user.name };
        }
      });
    });
    setMessages(messages);
  }, [users]);

  useEffect(() => {
    if (socket) {
      socket.emit('join', { name: user.name, room }, (errorMessage) => {
        if (errorMessage) {
          setRoom('');
          history.push('/');
          alert(errorMessage);
        }
      });

      socket.on('message', (message) => {
        setMessages((messages) => [...messages, message]);
      });

      socket.on('roomData', ({ users }) => {
        setUsers(users);
      });
    }
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
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
export default WaitingRoomChat;
