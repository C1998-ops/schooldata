import React, { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const [openModal, setOpenModal] = useState(isOpen);
  useEffect(() => {
    setOpenModal(isOpen);
  }, [isOpen]);
  useEffect(() => {
    function handleModalClose(event) {
      const { key } = event;
      if (key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleModalClose);

    return () => {
      window.removeEventListener("keydown", handleModalClose);
    };
  }, [onClose, openModal]);
  return (
    openModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 border-2 border-blue-300 focus-within:bg-opacity-30 flex justify-center items-center transition-opacity delay-200 ease-in">
        <div className="bg-white p-8 rounded-md shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-8 text-gray-600 hover:text-red-600 text-xl"
          >
            ✖
          </button>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
