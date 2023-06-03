import { create } from "zustand";
import type { UserType } from ".";

type NormalMessaageType = {
  type: "normal";
  user: UserType;
  text: string;
};

type AdminMessageType = {
  type: "admin";
  text: string;
};

export type MessageType = NormalMessaageType | AdminMessageType;

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
