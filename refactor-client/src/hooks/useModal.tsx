import useModals from "./useModals";

export default function useModal(type: string) {
  const { getModalStatus, openModal, closeModal } = useModals();
  const isOpened = getModalStatus(type);

  return {
    isOpened,
    open(Component: JSX.Element, props?: any) {
      openModal(type, Component, props);
    },
    close: () => closeModal(type),
  };
}
