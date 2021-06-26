import React from 'react';

import WaitingRoomChat from '../components/molecules/WaitingRoomChat';
import { Link } from 'react-router-dom';
import RoundSquareButton from '@atoms/RoundSquareButton';
import CircleButton from '@atoms/CircleButton';
import styled from 'styled-components';
import tigerCat from '@img/cat/tiger.PNG';

const Header = styled.div`
  text-align: center;
`;
const SubTitle = styled.h3`
  text-align: center;
`;
const Container = styled.div`
  width: 100%;
  height: auto;
`;
const LeftContainer = styled.div`
  display: inline-flex;
  flex-flow: row;
  width: 30%;
  height: 400px;
  margin: 10px;
`;
const RightContainer = styled.div`
  display: inline-flex;
  flex-flow: column wrap;
  justify-content: center;
  width: 60%;
  margin: 10px;
`;
const Users = styled.div`
  width: 40%;
`;
const ChatContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CharacterContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Character = styled.img`
  width: 200px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

styled(WaitingRoomChat)``;

function goRobby() {}

function setReady() {
  alert('레디완료');
}

function getHelp() {
  alert('도움말');
}

const WaitingRoomPage = () => {
  return (
    <Container>
      <Header>
        <h2 className="header-title">Waiting Room Page</h2>
      </Header>
      <LeftContainer>
        <Users>
          <SubTitle className="users-title">참가자</SubTitle>
          <div className="users-list">
            <ul>
              <li>
                <span className="users-username">은승균 </span>
                <CircleButton size="sm" variant="gray">
                  x
                </CircleButton>
              </li>
              <li>
                <span className="users-username">서재명 </span>
                <CircleButton size="sm" variant="gray">
                  x
                </CircleButton>
              </li>
              <li>
                <span className="users-username">김도연 </span>
                <CircleButton size="sm" variant="gray">
                  x
                </CircleButton>
              </li>
              <li>
                <span className="users-username">차재명 </span>
                <CircleButton size="sm" variant="gray">
                  x
                </CircleButton>
              </li>
            </ul>
          </div>
        </Users>

        <ChatContainer>
          <SubTitle>채팅</SubTitle>
          <WaitingRoomChat></WaitingRoomChat>
        </ChatContainer>
      </LeftContainer>

      <RightContainer>
        <SubTitle>캐릭터</SubTitle>
        <CharacterContainer>
          <div>
            <Character src={tigerCat} alt="캐릭터" />
            <Character src={tigerCat} alt="캐릭터" />
          </div>
          <div>
            <Character src={tigerCat} alt="캐릭터" />
            <Character src={tigerCat} alt="캐릭터" />
          </div>
          <div>
            <Character src={tigerCat} alt="캐릭터" />
            <Character src={tigerCat} alt="캐릭터" />
          </div>
        </CharacterContainer>
        <ButtonContainer>
          <RoundSquareButton variant="yellow" size="lg" onClick={setReady}>
            Ready
          </RoundSquareButton>

          <RoundSquareButton variant="yellow" size="lg" onClick={getHelp}>
            도움말
          </RoundSquareButton>

          <Link onClick={goRobby()} to="/">
            <RoundSquareButton variant="yellow" size="lg">
              로비로 돌아가기
            </RoundSquareButton>
          </Link>
        </ButtonContainer>
      </RightContainer>
    </Container>
  );
};
export default WaitingRoomPage;
