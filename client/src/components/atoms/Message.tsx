import React from 'react';
import styled from 'styled-components';
import ReactEmoji from 'react-emoji';

const OtherMessage = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0 5%;
  margin-top: 3px;
`;
const MyMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 5%;
  margin-top: 3px;
`;
const MyName = styled.div`
  padding-right: 10px;
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: #828282;
  letter-spacing: 0.3px;
`;
const OtherName = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: #828282;
  letter-spacing: 0.3px;
`;
const MessageBox = styled.div`
  background: #f3f3f3;
  letter-spacing: 0;
  float: left;
  font-size: 1.1em;
  word-wrap: break-word;
`;
const MyMessageBox = styled.div`
  background: #2979ff;
  letter-spacing: 0;
  float: left;
  font-size: 1.1em;
  word-wrap: break-word;
`;
const MyText = styled.p`
  text-align: right;
`;
const UserText = styled.p`
  text-align: left;
`;

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <MyMessage>
      <MyName>{trimmedName}</MyName>
      <MyMessageBox>
        <MyText>{ReactEmoji.emojify(text)}</MyText>
      </MyMessageBox>
    </MyMessage>
  ) : (
    <OtherMessage>
      <MessageBox>
        <UserText>{ReactEmoji.emojify(text)}</UserText>
      </MessageBox>
      <OtherName>{user}</OtherName>
    </OtherMessage>
  );
};

export default Message;
