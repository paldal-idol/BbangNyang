import { create } from "zustand";

export type UserType = {
  id: string;
  name: string;
  roomCode: string;
  isReady: boolean;
  character: number;
};

type State = {
  user: UserType;
};

type Action = {
  initInfo: (user: UserType) => void;
  changeName: (name: string) => void;
};

const INIT_USER: UserType = {
  id: "",
  name: "",
  roomCode: "",
  isReady: false,
  character: 0,
} as const;

export const userStore = create<State & Action>((set) => ({
  user: INIT_USER,
  initInfo: (user) => set(() => ({ user })),
  changeName: (name) => set((state) => ({ user: { ...state.user, name } })),
}));
