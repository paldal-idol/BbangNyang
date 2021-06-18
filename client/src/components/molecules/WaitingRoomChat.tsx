import * as React from 'react';

//컴포넌트간 데이터 주고받기 -> 리덕스,리코일,몹엑스 같은 것을 이용 // 부모 자식간에는 직접 주고 받을 수 있음

class WaitingRoomChat extends React.Component {
  state = {
    chat: '',
    chatList: [],
  };
  setChat = (e) => {
    this.setState({ chat: e.target.value });
  };
  setChatList = () => {
    // this.setState({ chatList: this.state.chatList.push(this.state.chat) });
    const newChatList = this.state.chatList.concat();
    newChatList.push(this.state.chat);

    this.setState({ chat: '', chatList: newChatList });
  };
  sendChat = () => {};
  render() {
    const { chat, chatList } = this.state;

    return (
      <div className="chat-container">
        <h3 className="chat-title">채팅</h3>
        <div className="chat-list-container">
          <ul className="chat-list">
            {chatList.map((chat) => {
              return <li className="chat-message">username : {chat}</li>;
            })}
          </ul>
          <input type="text" name="chatting" value={chat} onChange={this.setChat} />
          <button onClick={this.setChatList}>전송</button>
        </div>
      </div>
    );
  }
}
export default WaitingRoomChat;
