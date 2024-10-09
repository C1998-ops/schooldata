import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-red-600"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
