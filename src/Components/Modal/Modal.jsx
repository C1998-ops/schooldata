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
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 border-2 border-gray-300 focus-within:bg-opacity-30 transition-opacity delay-200 ease-in z-30 ${
        openModal ? "block" : "hidden"
      }`}
    >
      <div className="flex h-full w-full justify-center items-start py-20 sm:items-center sm:py-0 overflow-hidden">
        <div className="flex justify-center min-h-fit max-w-fit p-2 bg-blue-100 border-black border">
          <div className="bg-white w-full h-full rounded-lg mx-auto sm:max-w-screen-sm md:max-w-screen-md p-2 sm:p-4 md:p-8">
            <button
              onClick={onClose}
              className="my-2 absolute top-2 right-8 text-white hover:text-red-600 text-xl p-2 border rounded-lg outline-black focus:outline-blue-300"
            >
              ✖
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
