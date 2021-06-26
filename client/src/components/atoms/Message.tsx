import * as React from 'react';
const Message = ({ chat, user }) => (
  <li>
    <p>
      {user} : {chat.content}
    </p>
  </li>
);
export default Message;
