import React from 'react';

import WaitingRoomChat from '@molecules/WaitingRoomChat';
import { useHistory } from 'react-router-dom';
import RoundSquareButton from '@atoms/RoundSquareButton';
import CircleButton from '@atoms/CircleButton';
import styled from 'styled-components';
import tigerCat from '@img/cat/tiger.PNG';

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
  flex-direction: row;
`;
const CharacterImg = styled.img`
  width: 400px;
`;

const WaitingRoomPage = () => {
  const history = useHistory();
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
        <div>
          <h2>참가자</h2>
          <div>
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
        </div>
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
            <button>이전</button>
            <CharacterImg src={tigerCat} alt="캐릭터" />
            <button>다음</button>
          </SelectCharacter>
          <div>
            <span>닉네임</span>
            <input type="text" />
          </div>
          <br />
          <button>설정 완료</button>
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
