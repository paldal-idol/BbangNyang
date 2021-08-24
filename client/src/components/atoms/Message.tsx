import React from 'react';
import styled from 'styled-components';
import ReactEmoji from 'react-emoji';
import color from '@theme/color';

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
  padding-right: 6px;
  display: flex;
  align-items: center;
  color: #828282;
  letter-spacing: 0.3px;
  font-size: 14px;
`;

const OtherName = styled.div`
  padding-left: 6px;
  display: flex;
  align-items: center;
  color: #828282;
  letter-spacing: 0.3px;
  font-size: 14px;
`;

const MessageBox = styled.div`
  background: ${color.primary.gray};
  letter-spacing: 0;
  float: left;
  font-size: 14px;
  word-wrap: break-word;
  position: relative;
  padding: 8px 12px;
  max-width: 200px;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 12px;
    width: 0;
    height: 0;
    border: 16px solid transparent;
    border-right-color: ${color.primary.gray};
    border-left: 0;
    border-top: 0;
    margin-top: -8px;
    margin-left: -16px;
  }
`;

const MyMessageBox = styled.div`
  background: ${color.primary.darkYellow};
  letter-spacing: 0;
  float: left;
  font-size: 14px;
  word-wrap: break-word;
  position: relative;
  padding: 8px 12px;
  max-width: 200px;
  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 12px;
    width: 0;
    height: 0;
    border: 16px solid transparent;
    border-left-color: ${color.primary.darkYellow};
    border-right: 0;
    border-top: 0;
    margin-top: -8px;
    margin-right: -16px;
  }
`;

const MyText = styled.p`
  text-align: right;
`;

const UserText = styled.p`
  text-align: left;
`;

const AdminText = styled.p`
  width: 100%;
  padding: 10px 0px;
  text-align: 'center';
  color: ${color.primary.black};
`;

const Message = ({ message: { text, user }, id }) => {
  if (user === 'admin') {
    return <AdminText>{text}</AdminText>;
  }
  return user.id === id ? (
    <MyMessage>
      <MyName>{user.name}</MyName>
      <MyMessageBox>
        <MyText>{ReactEmoji.emojify(text)}</MyText>
      </MyMessageBox>
    </MyMessage>
  ) : (
    <OtherMessage>
      <MessageBox>
        <UserText>{ReactEmoji.emojify(text)}</UserText>
      </MessageBox>
      <OtherName>{user.name}</OtherName>
    </OtherMessage>
  );
};

export default Message;
