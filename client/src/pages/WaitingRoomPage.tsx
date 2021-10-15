import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import color from '@theme/color';

import socket from '@store/socket';
import modalState from '@store/modal';
import userState from '@store/user';
import usersState from '@store/users';
import roomState from '@store/room';
import gameSettingState from '@store/gameSetting';

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
  justify-content: space-between;
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

const GameSettingDiv = styled.div`
  border: 1px solid black;
  padding 10px;
`;
const SettingTitle = styled.p`
  font-size: 20px;
`;
const StateDiv = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
`;
const RoundDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0px;
`;
const WaitingRoomPage = () => {
  const history = useHistory();

  const [modal, setModal] = useRecoilState(modalState);
  const [user, setUser] = useRecoilState(userState);
  const [room, setRoom] = useRecoilState(roomState);
  const [gameSetting, setGameSetting] = useRecoilState(gameSettingState);
  const [gameStatus, setGameStatus] = useState('Ready');
  let users = useRecoilValue(usersState);

  useEffect(() => {
    socket.connect();
    setUser({ ...user, id: socket.id });
    if (users.find((e) => e.name === user.name) !== undefined) {
      setGameStatus(
        users[0].name === user.name
          ? 'Game Start'
          : !users.find((e) => e.name === user.name).isReady
          ? 'Ready'
          : 'Cancel',
      );
    }
  }, [users]);

  useEffect(() => {}, [gameStatus]);

  const goRobby = () => {
    let selected = confirm('대기방을 나가시겠습니까?');
    if (selected) {
      history.push('/');
      socket.disconnect();
      socket.connect();
    }
  };

  const setReady = () => {
    switch (gameStatus) {
      case 'Ready':
        alert('레디완료');
        socket.emit('ready', true);
        break;
      case 'Cancel':
        alert('레디취소');
        socket.emit('ready', false);
        break;
      case 'Game Start':
        socket.emit('gameStart');
        break;
    }
    socket.once('listenEvent', (status) => {
      alert(status);
    });
  };

  socket.on('startEvent', () => {
    history.push('/game');
  });

  socket.on('changedRound', (round) => {
    setGameSetting((v) => ({ round }));
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
          <GameSettingDiv>
            <SettingTitle>현재 {gameSetting.round}라운드가 선택 되었습니다.</SettingTitle>
            {gameStatus === 'Game Start' ? (
              <>
                <SettingTitle>라운드를 골라주세요.</SettingTitle>
                <RoundDiv>
                  <TextButton onClick={() => socket.emit('changeRound', 4)}>4 라운드</TextButton>
                  <TextButton onClick={() => socket.emit('changeRound', 6)}>6 라운드</TextButton>
                  <TextButton onClick={() => socket.emit('changeRound', 8)}>8 라운드</TextButton>
                </RoundDiv>
              </>
            ) : null}
          </GameSettingDiv>
          <StateDiv>
            <TextButton onClick={setReady}>{gameStatus}</TextButton>
            <TextButton onClick={getHelp}>도움말</TextButton>
            <TextButton onClick={goRobby}>로비로 돌아가기</TextButton>
          </StateDiv>
        </Footer>
        <RuleBookContainer>
          <RuleBookButton />
        </RuleBookContainer>
      </Container>
    </>
  );
};
export default WaitingRoomPage;
