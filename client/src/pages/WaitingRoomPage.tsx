import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import modalState from '@store/modal';
import userState from '@store/user';
import roomState from '@store/room';

import WaitingRoomChat from '@molecules/WaitingRoomChat';
import WaitingRoomUsers from '@molecules/WaitingRoomUsers';
import RoundSquareButton from '@atoms/RoundSquareButton';

interface ButtonProps {
  isOpen: boolean;
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  text-align: center;
  padding-left: 20px;
  border-bottom: 1px solid gray;
`;
const Content = styled.section`
  text-align: center;
  display: flex;
  min-height: 600px;
`;

const Chat = styled.div`
  padding: 10px;
  margin-left: 20px;
  flex-basis: 300px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
`;
const Character = styled.div`
  display: flex;
  flex-grow: 9;
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

const SelectCharacter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const CharacterImg = styled.img`
  width: 400px;
`;
const SelectCharacterButton = styled.button<ButtonProps>``;

const WaitingRoomPage = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);
  const [user, setUser] = useRecoilState(userState);
  const [room, setRoom] = useRecoilState(roomState);
  // let socket = useContext(WebSocketContext);
  useEffect(() => {
    console.log(user, room);
    // console.log(`socket info : ${socket.id}`);
  }, []);

  const selectCharacter = () => {
    // TODO : 올바른 입장 코드인지 확인하는 코드 작성
    setIsOpen(true);
    setModal('SelectCharacterModal');
  };

  useEffect(() => {
    if (modal !== 'SelectCharacterModal') {
      setIsOpen(false);
    }
  }, [modal]);

  function goRobby() {
    let selected = confirm('대기방을 나갑니다.');

    if (selected) {
      alert('로비로 이동합니다.');
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
    <Container>
      <Header>
        <h1>Waiting Room Page</h1>
      </Header>
      <Content>
        <WaitingRoomUsers></WaitingRoomUsers>
        <Chat>
          <div>
            <h2>채팅</h2>
          </div>
          <div>
            <WaitingRoomChat></WaitingRoomChat>
          </div>
        </Chat>
        <Character>
          <div>
            <h2>캐릭터 선택</h2>
          </div>
          <SelectCharacter>
            <CharacterImg alt="캐릭터" />
            <SelectCharacterButton isOpen={isOpen} onClick={selectCharacter}>
              캐릭터 선택
            </SelectCharacterButton>
          </SelectCharacter>
        </Character>
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
    </Container>
  );
};
export default WaitingRoomPage;
