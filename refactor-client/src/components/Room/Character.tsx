import styled from "@emotion/styled";

import { CatImages } from "@utils/cat";
import color from "@theme/color";
import { type UserType } from "@/store";

const UserItem = styled.div`
  position: relative;
  width: 260px;
  height: 360px;
  background: #ffffff50;
`;

const UserInfo = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
  box-shadow: 0px 0px 6px #00000029;
`;

const CatImg = styled.img`
  max-width: 240px;
  width: 100%;
`;

const UserName = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  margin: auto;
  color: ${color.primary.black};
  border-bottom: 1px solid gray;
`;

const StatusText = styled.p`
  position: absolute;
  right: 1rem;
  font-size: 14px;
  font-weight: bold;
  color: ${color.button.orange};
  background-color: transparent;
`;
const HostStatusText = styled.p`
  position: absolute;
  left: 1rem;
  font-size: 14px;
  font-weight: bold;
  color: ${color.button.orange};
  background-color: transparent;
`;

type CharacterProps = {
  user: UserType;
  isHost: boolean;
};

function Character({ user, isHost }: CharacterProps) {
  return (
    <UserItem>
      {isHost && <HostStatusText>방장</HostStatusText>}
      {user.isReady && <StatusText>READY</StatusText>}
      <UserInfo>
        <CatImg src={CatImages[user.character]} />
        <UserName>{user.name}</UserName>
      </UserInfo>
    </UserItem>
  );
}

export default Character;
