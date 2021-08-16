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

const WaitingRoomChat = () => {
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const user = useRecoilValue(userState);
  const [room, setRoom] = useRecoilState(roomState);
  const [users, setUsers] = useRecoilState(usersState);

  useEffect(() => {
    console.log(socket.id);
    if (socket) {
      console.log('dwdww', user.name);
      socket.emit('join', { name: user.name, room }, (error) => {
        if (error) {
          setRoom('');
          history.push(`/`);
          alert('방이 꽉 찼습니다!!');
        }
      });

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
      <Messages messages={messages} name={user.name} />
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </Container>
  );
};
export default WaitingRoomChat;
