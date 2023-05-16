import { useModalsDispatch, useModalsState } from "@contexts";
import type { ModalDispatchType } from "@contexts";

export default function useModals() {
  const openedModals = useModalsState();
  const { open, close } = useModalsDispatch();

  const openModal: ModalDispatchType["open"] = (type, Component, props) => {
    open(type, Component, props);
  };
  const closeModal: ModalDispatchType["close"] = (type) => {
    close(type);
  };
  const getModalStatus = (type: string) => {
    return !!openedModals.get(type);
  };
  return { openModal, closeModal, getModalStatus };
}
