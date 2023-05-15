import { useModalsDispatch } from "@contexts";
import type { ModalDispatchType } from "@contexts";

export default function useModals() {
  const { open, close } = useModalsDispatch();

  const openModal: ModalDispatchType["open"] = (type, Component, props) => {
    open(type, Component, props);
  };
  const closeModal: ModalDispatchType["close"] = (type) => {
    close(type);
  };
  return { openModal, closeModal };
}
