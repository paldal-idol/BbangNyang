import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue, useRecoilState } from 'recoil';

import styled from 'styled-components';

import socketIO from '@store/socket';
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
  // const history = useHistory();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useRecoilState(userState);
  const [room, setRoom] = useRecoilState(roomState);
  const [users, setUsers] = useRecoilState(usersState);

  useEffect(() => {
    messages.forEach((item) => {
      users.forEach((user) => {
        if (
          item.user !== 'admin' &&
          user.userId === item.user.userId &&
          user.name !== item.user.name
        ) {
          item.user = { ...item.user, name: user.name };
        }
      });
    });
    setMessages(messages);
  }, [users]);

  useEffect(() => {
    if (socketIO.socket) {
      socketIO.socket.emit('join', { userId: user.userId, room }, ({ error, name }) => {
        if (name) {
          setUser({ ...user, name: name });
        }
        if (error) {
          alert(error);
        }
      });

      socketIO.socket.on('message', (message) => {
        setMessages((messages) => [...messages, message]);
      });

      socketIO.socket.on('roomData', ({ users }) => {
        setUsers(users);
      });

      return () => {
        console.log('left room');
        socketIO.socket.disconnect();
      };
    }
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socketIO.socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  return (
    <Container>
      <Messages messages={messages} user={user} />
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </Container>
  );
};
export default WaitingRoomChat;
