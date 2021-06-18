import * as React from 'react';

import WaitingRoomChat from '../components/molecules/WaitingRoomChat';
// import styled from 'styled-components';

import { Link } from 'react-router-dom';
import RoundSquareButton from '../components/atoms/RoundSquareButton';
import CircleButton from '../components/atoms/CircleButton';
// const headerStyle = {
//   alignSelf: 'top',
// };
// const memberStyle = {
//   flexBasis: 'auto',
//   backgroundColor: 'fdfdfd',
//   alignSelf: 'left',
// };
// const chatStyle = {
//   flexBasis: 'auto',
//   backgroundColor: 'white',
//   borderWidth: 1,
//   borderColor: 'ffffff',
// };
// const characterStyle = {
//   flexBasis: 'auto',
//   backgroundColor: 'f9f4c6',
// };
// const buttonStyle = {
//   flexBasis: 'auto',
//   backgroundColor: 'white',
//   alignItems: 'center',
// };
// const WaitingRoomPage = () => {
//   const ContainerDiv = styled.div`
//     display: 'flex',
//     flex-flow: 'row wrap',
//     justify-content: 'space-evenly',
//     align-items: 'stretch',
//   `;

function goRobby() {}
function setReady() {
  alert('레디완료');
}
function getHelp() {
  alert('도움말');
}
const WaitingRoomPage = () => {
  return (
    <div className="WaitingRoomContainer">
      <div className="header">
        <h2 className="header-title">Waiting Room Page</h2>
      </div>

      <div className="users">
        <h3 className="users-title">참가자</h3>
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
      </div>

      <div className="chat">
        <WaitingRoomChat></WaitingRoomChat>
      </div>

      <div></div>
      <div className="buttons">
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
      </div>
    </div>
  );
};
export default WaitingRoomPage;
