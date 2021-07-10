import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Messages from '@atoms/Messages';
import Input from '@atoms/ChatInput';

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

const WaitingRoomChat = (name, socket) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
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

// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import ChatInput from '@atoms/ChatInput';
// import ChatLog from '@atoms/ChatLog';
// import Loading from '@atoms/Loading';
// import io from 'socket.io-client';
// import RoundSquareButton from '@atoms/RoundSquareButton';

// const Container = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-grow: 1;
//   padding: 5px;
// `;
// const StyledInput = styled.input`
//   flex-grow: 1;
//   border: 0px;
//   margin-right: 1px;
// `;
// const StyledButton = styled.button`
//   background-color: white;
//   border: 1px solid gray;
//   padding: 8px 12px;
//   radius: 8px;
//   margin-left: 1px;
// `;

// // const WaitingRoomChat = ({ roomName, userName }) => {
// //   const [chat, setChat] = React.useState('');
// //   const [chatList, setChatList] = React.useState([]);

// //   const onTyping = (e) => {
// //     setChat((current) => e.target.value);
// //   };

// //   const onSubmit = () => {
// //     if (chat !== '') {
// //       const newChatList = chatList.concat();
// //       newChatList.push(chat);
// //       setChatList((current) => newChatList);
// //       setChat((current) => '');
// //     }
// //   };

// //   //할 일 : const sendChat = () => {};

// //   return (
// //     <div className="chat-container">
// //       <div className="chat-list-container">
// //         <ul className="chat-list">
// //           {chatList.map((chat) => {
// //             return <li className="chat-message">username : {chat}</li>;
// //           })}
// //         </ul>
// //         <Container>
// //           <StyledInput type="text" name="chatting" value={chat} onChange={onTyping} />
// //           <RoundSquareButton size="sm" variant="gray" onClick={onSubmit}>
// //             전송
// //           </RoundSquareButton>
// //         </Container>
// //       </div>
// //     </div>
// //   );
// // };
// let socket;
// const WaitingRoomChat = ({ roomName, userName }) => {
//   const [name, setName] = useState('');
//   const [room, setRoom] = useState('');
//   const [currentSocket, setCurrentSocket] = useState();

//   useEffect(() => {
//     const ENDPOINT = 'localhost:8000';
//     socket = io(ENDPOINT);

//     setName(userName);
//     setRoom(roomName);
//   }, []);

//   return (
//     <Container>
//       {currentSocket ? (
//         <>
//           <ChatLog socket={currentSocket}></ChatLog>
//           <ChatInput userName={userName} socket={currentSocket}></ChatInput>
//         </>
//       ) : (
//         <Loading></Loading>
//       )}
//     </Container>
//   );
// };
// export default WaitingRoomChat;
