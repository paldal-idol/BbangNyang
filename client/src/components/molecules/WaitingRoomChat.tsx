import * as React from 'react';
import styled from 'styled-components';
import RoundSquareButton from '@atoms/RoundSquareButton';
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding: 5px;
`;
const StyledInput = styled.input`
  flex-grow: 1;
  border: 0px;
  margin-right: 1px;
`;
const StyledButton = styled.button`
  background-color: white;
  border: 1px solid gray;
  padding: 8px 12px;
  radius: 8px;
  margin-left: 1px;
`;
const WaitingRoomChat = () => {
  const [chat, setChat] = React.useState('');
  const [chatList, setChatList] = React.useState([]);

  const onTyping = (e) => {
    setChat((current) => e.target.value);
  };

  const onSubmit = () => {
    if (chat !== '') {
      const newChatList = chatList.concat();
      newChatList.push(chat);
      setChatList((current) => newChatList);
      setChat((current) => '');
    }
  };

  //할 일 : const sendChat = () => {};

  return (
    <div className="chat-container">
      <div className="chat-list-container">
        <ul className="chat-list">
          {chatList.map((chat) => {
            return <li className="chat-message">username : {chat}</li>;
          })}
        </ul>
        <Container>
          <StyledInput type="text" name="chatting" value={chat} onChange={onTyping} />
          <RoundSquareButton size="sm" variant="gray" onClick={onSubmit}>
            전송
          </RoundSquareButton>
        </Container>
      </div>
    </div>
  );
};
export default WaitingRoomChat;
