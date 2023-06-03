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
  const otherUsers = room.users.filter(({ id }) => id !== user.id);

  const emptyCharacters = Array.from({
    length: MAXIMUM_USER_LENGTH - otherUsers.length,
  });

  return (
    <Container>
      <MyCharacter user={user} isHost={user.id === hostId} />
      {otherUsers.map((user, i) => (
        <Character key={i} user={user} isHost={user.id === hostId} />
      ))}
      {emptyCharacters.map((_, index) => (
        <EmptyCharacter key={index} />
      ))}
    </Container>
  );
};
export default RoomUsers;
