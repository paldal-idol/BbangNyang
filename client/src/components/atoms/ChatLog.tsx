import React, { useEffect, useState } from 'react';

const ChatLog = ({ socket }) => {
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    socket.on('onReceive', (messageItem) => {
      setMsgList((msgList) => [...msgList, messageItem]);
    });
    socket.on('onConnect', (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    socket.on('onDisconnect', (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div>
      {msgList.map((msg, idx) => (
        <div key={idx}>
          <div>
            [{msg.timeStamp}] {msg.userName} : {msg.msg}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ChatLog;
