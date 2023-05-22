import { create } from "zustand";
import { UserType } from ".";

export type MessageType = {
  type: "admin" | "";
  user: UserType;
  text: string;
};

type State = {
  messages: MessageType[];
};

type Action = {
  addMessage: (message: MessageType) => void;
};

export const messageStore = create<State & Action>((set) => ({
  messages: [],
  addMessage: (message: MessageType) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));
