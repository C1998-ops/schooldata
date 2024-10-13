import React, { useEffect } from "react";
import logo from "../../logo.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
const Sidebar = () => {
  const items = [
    {
      icon: "fa fa-dashboard",
      name: "Dashboard",
      link: "/",
    },
    {
      name: "Department",
      link: "/department",
    },
    { name: "Category", link: "/category" },
    { name: "Sub Category", link: "/subcategory" },
    // { name: "Setting", link: "/" },
  ];
  const location = useLocation();
  const { pathname } = location;
  const activeStyle = {
    backgroundColor: "white", // Example active background
    color: "black", // Example active text color
    tranform: "Scale",
  };

  const defaultStyle = {
    backgroundColor: "transparent",
    color: "white",
  };

  return (
    <div className="min-h-screen max-w-[220px] sm:max-w-md bg-blue-900 h-screen p-5  pt-8 relative duration-300">
      <div className="flex items-center py-4 justify-center box-border">
        <img
          src={logo}
          alt="logo"
          width={80}
          height={80}
          className="bg-cover filter"
        />
        <span className="text-white font-bold text-lg">Evol8</span>
      </div>
      <ul className="text-white pt-6 space-y-4">
        {items.map((info, index) => {
          const isActive = pathname === info.link;
          return (
            <li
              className="flex rounded-md p-1 cursor-pointer text-lg items-center max-w-screen-md transition-all ease-in-out delay-500"
              style={isActive ? activeStyle : defaultStyle}
            >
              <Link
                to={info.link}
                key={index}
                className="no-underline  mt-2 w-full text-start"
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
