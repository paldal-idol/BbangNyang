import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from "react";

export type OpendModalsType = Map<string, ModalType>;

export type ModalType = {
  Component: ReactElement;
  props?: any;
};

export type ModalDispatchType = {
  open: (type: string, Component: ReactElement, props?: any) => void;
  close: (type: string) => void;
};

const ModalsStateContext = createContext<OpendModalsType>(new Map());

const ModalsDispatchContext = createContext<ModalDispatchType | undefined>(
  undefined
);

export const ModalsProvider = ({ children }: PropsWithChildren) => {
  const [opendedModals, setOpendedModals] = useState<OpendModalsType>(
    new Map()
  );
  const open = (type: string, Component: ReactElement, props?: any) => {
    setOpendedModals(
      (modals: OpendModalsType) =>
        new Map([...modals, [type, { Component, props }]])
    );
  };
  const close = (type: string) => {
    setOpendedModals((modals) => {
      const newMap = new Map(modals);
      newMap.delete(type);
      return newMap;
    });
  };

  const dispatch = { open, close };
  return (
    <ModalsDispatchContext.Provider value={dispatch}>
      <ModalsStateContext.Provider value={opendedModals}>
        {children}
      </ModalsStateContext.Provider>
    </ModalsDispatchContext.Provider>
  );
};

export function useModalsState() {
  const state = useContext(ModalsStateContext);
  if (!state) throw new Error("TodosProvider not found");
  return state;
}

export function useModalsDispatch() {
  const dispatch = useContext(ModalsDispatchContext);
  if (!dispatch) throw new Error("TodosProvider not found");
  return dispatch;
}
