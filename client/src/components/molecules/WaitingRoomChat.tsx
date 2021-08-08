import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue, useRecoilState } from 'recoil';
import io from 'socket.io-client';
import styled from 'styled-components';

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

const ENDPOINT = 'localhost:8000';
let socket;

const WaitingRoomChat = () => {
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const name = useRecoilValue(userState);
  const room = useRecoilValue(roomState);
  const [users, setUsers] = useRecoilState(usersState);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        history.push(`/waiting`);
      }
    });
  }, [name, room]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    return () => {
      console.log('left room');
      socket.disconnect();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  return (
    <Container>
      <Messages messages={messages} name={name} />
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </Container>
  );
};
export default WaitingRoomChat;
