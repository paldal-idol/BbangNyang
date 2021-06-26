import * as React from 'react';

const WaitingRoomChat = () => {
  const [chat, setChat] = React.useState('');
  const [chatList, setChatList] = React.useState([]);

  const onTyping = (e) => {
    setChat((current) => e.target.value);
  };

  const onSubmit = () => {
    const newChatList = chatList.concat();
    newChatList.push(chat);
    setChatList((current) => newChatList);
    setChat((current) => '');
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
        <input type="text" name="chatting" value={chat} onChange={onTyping} />
        <button onClick={onSubmit}>전송</button>
      </div>
    </div>
  );
};
export default WaitingRoomChat;
