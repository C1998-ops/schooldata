import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { FaBars } from "react-icons/fa";

const Header = ({ toggleMobile, toggleSideMenuWidth }) => {
  const { handleSignOut } = useAuth();
  return (
    <nav className=" fixed top-0 start-0 w-full sm:max-w-screen-2xl z-10 border-b border-gray-500 shadow-sm max-h-24">
      <div className="w-full bg-red-700 flex flex-wrap items-center justify-between mx-auto py-1 border-b-2 border-black px-4">
        <button
          aria-controls="logo-sidebar"
          type="button"
          onClick={() => toggleSideMenuWidth()}
          className="items-center p-2 mt-2 ms-3 text-sm hidden md:block text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        <button className="text-xs md:hidden font-semibold outline-none border-none rounded-lg focus:outline-none p-2 focus:ring-2 focus:outline-white">
          <FaBars
            color="white"
            size={18}
            alignmentBaseline="central"
            onClick={toggleMobile}
            width={8}
            height={8}
          />
        </button>
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          Evol8 Board
        </span>
        <button
          type="button"
          className="border-none text-xs font-semibold font-sans text-white bg-slate-100 bg-opacity-50
           px-4 py-2 rounded-md"
          onClick={() => handleSignOut()}
        >
          logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
