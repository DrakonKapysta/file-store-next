import React, { FC } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-500/50 flex flex-col items-center justify-center"
    >
      {children}
    </div>,
    document.body
  );
};
