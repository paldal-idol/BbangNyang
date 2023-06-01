import styled from "@emotion/styled";

import MyCharacter from "./MyCharacter";
import Character from "./Character";
import EmptyCharacter from "./EmptyCharacter";
import type { RoomType, UserType } from "@/store";

const Container = styled.div`
  display: grid;
  justify-items: center;
  justify-content: center;
  gap: 2rem;
  align-self: center;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const MAXIMUM_USER_LENGTH = 7;

type WaitingRoomUsersProps = {
  user: UserType;
  room: RoomType;
  hostId: string;
};

const RoomUsers = ({ user, room, hostId }: WaitingRoomUsersProps) => {
  const filteredUsers = room.users.filter(({ id }) => id !== user.id);

  const EmptyCharacterList = Array.from({
    length: MAXIMUM_USER_LENGTH - filteredUsers.length,
  });

  return (
    <Container>
      <MyCharacter user={user} isHost={user.id === hostId} />
      {filteredUsers.map((user, i) => (
        <Character key={i} user={user} isHost={user.id === hostId} />
      ))}
      {EmptyCharacterList.map((_, index) => (
        <EmptyCharacter key={index} />
      ))}
    </Container>
  );
};
export default RoomUsers;
