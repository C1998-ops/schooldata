import React from "react";

const AddButton = ({ category, click }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center w-min sm:w-48 p-2 sm:px-8 sm:py-3 bg-transparent text-white font-semibold rounded-lg outline-none focus:outline-white focus:outline-2 hover:bg-blue-800 transition duration-300 ease-in-out"
      onClick={click}
    >
      Add
      <span class="ml-2 bg-red-400 px-2 py-1 rounded text-white text-xs sm:text-sm">
        {category}
      </span>
    </button>
  );
};

export default AddButton;
