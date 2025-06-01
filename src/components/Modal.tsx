import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Modal = (props: ModalProps) => {
  const { isOpen, onClose, title, children } = props;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000a9] bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full pt-3 pb-4 px-5 relative">
        <div className="flex justify-between">
          {title && (
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          )}

          <button
            className="text-gray-600 cursor-pointer"
            onClick={onClose}
            aria-label="Fechar Modal"
          >
            ✕
          </button>
        </div>

        <div className="mt-5">{children}</div>

        <button
          className="bg-gray-400 mt-5 text-white px-4 py-2 rounded-xl cursor-pointer hover:brightness-75 duration-100 float-end"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
