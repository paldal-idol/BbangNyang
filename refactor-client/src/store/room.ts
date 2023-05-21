import { create } from "zustand";

type UserType = {
  id: string;
  name: string;
  roomCode: string;
  isReady: boolean;
  character: number;
};

export type RoomType = {
  room: string;
  round: number;
  users: UserType[];
};
type State = {
  room: RoomType;
};

type Action = {
  setRoom: (room: RoomType) => void;
};

const INIT_ROOM: RoomType = {
  room: "",
  round: 6,
  users: [],
};

export const roomStore = create<State & Action>((set) => ({
  room: INIT_ROOM,
  setRoom: (room) => set(() => ({ room })),
}));
