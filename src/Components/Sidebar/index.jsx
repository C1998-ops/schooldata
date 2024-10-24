import React from "react";
import logo from "../../logo.svg";
import { Link, useLocation } from "react-router-dom";
import { items } from "../utils/configurations/lineItems";
const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const activeStyle = {
    backgroundColor: "white",
    color: "black", // Example active text color
    tranform: "Scale",
  };

  const defaultStyle = {
    backgroundColor: "transparent",
    color: "white",
  };

  return (
    <div className="w-full sm:max-w-full p-5 my-2 pt-16 relative duration-300">
      <div className="flex items-center py-2 justify-center box-border">
        <img
          src={logo}
          alt="logo"
          width={80}
          height={80}
          className="bg-center"
        />
        <span className="text-white font-bold text-lg">Evol8</span>
      </div>
      <ul className="text-white pt-6 space-y-4 font-medium">
        {items.map((info, index) => {
          const isActive = pathname === info.link;
          return (
            <li
              className="flex rounded-md py-1 px-2 cursor-pointer text-sm  items-center justify-center transition-all duration-300 ease-in-out delay-200 hover:bg-gray-200"
              style={isActive ? activeStyle : defaultStyle}
              key={index}
            >
              <Link
                to={info.link}
                key={index}
                className="no-underline  mt-2 w-full ms-0"
              >
                {info.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
