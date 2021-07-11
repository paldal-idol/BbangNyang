import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Messages from '@atoms/Messages';
import Input from '@atoms/ChatInput';
import { useRecoilValue, useRecoilState } from 'recoil';
import userState from '@store/user';
import roomState from '@store/room';
import io from 'socket.io-client';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 8px;
  height: 60%;
  width: 35%;
  min-width: 200px;
  max-width: 400px;
`;

const ENDPOINT = 'localhost:8000';
let socket;

const WaitingRoomChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [name, setUser] = useRecoilState(userState);
  const [room, setRoom] = useRecoilState(roomState);
  const [users, setUsers] = useState('');

  const joinError = (error) => {
    console.log(error);
  };
  useEffect(() => {
    socket = io(ENDPOINT);

    console.log(`room = ${room}`);
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
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
