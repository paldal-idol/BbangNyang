import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import color from '@theme/color';

import socketIO from '@store/socket';
import modalState from '@store/modal';
import userState from '@store/user';
import usersState from '@store/users';
import roomState from '@store/room';

import TextButton from '@atoms/TextButton';
import RuleBookButton from '@atoms/RuleBookButton';
import WaitingRoomChat from '@molecules/WaitingRoomChat';
import WaitingRoomUsers from '@molecules/WaitingRoomUsers';
import SelectCharacterModal from '@molecules/SelectCharacterModal';
import SelectCharacter from '@organisms/SelectCharacter';
import MiniGame from '@organisms/miniGame';

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
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid gray;
  height: 60px;
  font-size: 28px;
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
  min-height: 512px;
  height: 600px;
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

const CodeText = styled.p`
  &:hover {
    color: ${color.button.darkYellow};
    cursor: pointer;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  }
`;

const WaitingRoomPage = () => {
  const history = useHistory();
  const [modal, setModal] = useRecoilState(modalState);
  const [user, setUser] = useRecoilState(userState);
  const [room, setRoom] = useRecoilState(roomState);
  const [gameStatus, setGameStatus] = useState('Ready');
  let users = useRecoilValue(usersState);

  useEffect(() => {
    socketIO.socket.connect();
    setUser({ ...user, id: socketIO.socket.id });
    if (users.find((e) => e.userId === user.userId) !== undefined) {
      setGameStatus(
        users[0].userId === user.userId ? 'Game Start' : user.isReady ? 'Cancel' : 'Ready',
      );
    }
  }, [users]);

  useEffect(() => {}, [gameStatus]);

  const goRobby = () => {
    let selected = confirm('대기방을 나가시겠습니까?');
    if (selected) {
      history.push('/');
    }
  };

  const setReady = () => {
    switch (gameStatus) {
      case 'Ready':
        alert('레디완료');
        socketIO.socket.emit('ready', true);
        break;
      case 'Cancel':
        alert('레디취소');
        socketIO.socket.emit('ready', false);
        break;
      case 'Game Start':
        alert('게임시작');
        socketIO.socket.emit('gameStart');
        break;
    }
    socketIO.socket.once('listenEvent', (status) => {
      alert(status);
    });
  };

  socketIO.socket.on('startEvent', () => {
    history.push('/game');
  });

  const getHelp = () => {
    alert('도움말');
  };

  const copy = () => {
    alert('방 코드가 복사되었습니다.');
    const textArea = document.createElement('textarea');
    document.body.appendChild(textArea);
    textArea.value = room;
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  return (
    <>
      {modal === 'SelectCharacterModal' && <SelectCharacterModal />}
      <Container>
        <Header>
          <p>CODE:&nbsp;</p>
          <CodeText onClick={copy}>{room}</CodeText>
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
          <WaitingZone>
            <MiniGame />
          </WaitingZone>
        </Content>
        <Footer>
          <TextButton onClick={setReady}>{gameStatus}</TextButton>
          <TextButton onClick={getHelp}>도움말</TextButton>
          <TextButton onClick={goRobby}>로비로 돌아가기</TextButton>
        </Footer>
        <RuleBookContainer>
          <RuleBookButton />
        </RuleBookContainer>
      </Container>
    </>
  );
};
export default WaitingRoomPage;
