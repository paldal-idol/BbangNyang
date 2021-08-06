import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import socket from '@store/socket'
import modalState from '@store/modal';
import userState from '@store/user';
import roomState from '@store/room';

import RoundSquareButton from '@atoms/RoundSquareButton';
import RuleBookButton from '@atoms/RuleBookButton';
import WaitingRoomChat from '@molecules/WaitingRoomChat';
import WaitingRoomUsers from '@molecules/WaitingRoomUsers';
import SelectCharacterModal from '@molecules/SelectCharacterModal';
import SelectCharacter from '@organisms/SelectCharacter';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
`;

const Header = styled.div`
  text-align: center;
  padding-left: 20px;
  border-bottom: 1px solid gray;
`;

const UserInfoContainer = styled.div`
  width: 240px;
  margin-left: 20px;
`;

const Content = styled.section`
  text-align: center;
  display: flex;
  min-height: 600px;
`;

const Chat = styled.div`
  padding: 10px;
  margin-left: 20px;
  width: 360px;
  min-height:512px;
  height:600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
`;

const WaitingZone = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const Footer = styled.div`
  padding: 20px;
  border-top: 1px solid gray;
  display: flex;
  justify-content: flex-end;
`;

const RuleBookContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
`;

// const ENDPOINT = 'localhost:8000';
// let socket=io(ENDPOINT);

const WaitingRoomPage = () => {
  const history = useHistory();
  const [modal, setModal] = useRecoilState(modalState);
  const [user, setUser] = useRecoilState(userState);
  const [room, setRoom] = useRecoilState(roomState);
  // let socket = useContext(WebSocketContext);
  useEffect(() => {
    console.log(user, room);
  }, []);

  function goRobby() {
    let selected = confirm('대기방을 나가시겠습니까?');

    if (selected) {
      history.push('/');
    }
  }

  function setReady() {
    alert('레디완료');
  }

  function getHelp() {
    alert('도움말');
  }

  return (
    <>
      {modal === 'SelectCharacterModal' && <SelectCharacterModal />}
      <Container>
        <Header>
          <h1>Waiting Room Page</h1>
        </Header>
        <Content>
          <UserInfoContainer>
            <h2>캐릭터 선택</h2>
            <SelectCharacter />
            <WaitingRoomUsers />
          </UserInfoContainer>
          <Chat>
            <h2>채팅</h2>
            <WaitingRoomChat />
          </Chat>
          <WaitingZone></WaitingZone>
        </Content>
        <Footer>
          <RoundSquareButton variant="yellow" size="lg" onClick={setReady}>
            Ready
          </RoundSquareButton>
          <RoundSquareButton variant="yellow" size="lg" onClick={getHelp}>
            도움말
          </RoundSquareButton>
          <RoundSquareButton variant="yellow" size="lg" onClick={goRobby}>
            로비로 돌아가기
          </RoundSquareButton>
        </Footer>
        <RuleBookContainer>
          <RuleBookButton />
        </RuleBookContainer>
      </Container>
    </>
  );
};
export default WaitingRoomPage;
