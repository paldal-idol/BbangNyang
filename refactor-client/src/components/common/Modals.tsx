import { cloneElement } from "react";
import { useModalsState, useModalsDispatch } from "@contexts";

function Modals() {
  const openedModals = useModalsState();
  const { close } = useModalsDispatch();

  return (
    <>
      {Array.from(openedModals.entries()).map(([type, modal], index) => {
        const { Component, props } = modal;

        const onClose = () => {
          close(type);
        };

        return cloneElement(Component, {
          key: index,
          onClose,
          ...props,
        });
      })}
    </>
  );
}

export default Modals;
