import React from "react";
import logo from "../../logo.svg";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const items = [
    {
      name: "Dashboard",
      link: "/",
    },
    {
      name: "Department",
      link: "/department",
    },
    { name: "Category", link: "/category" },
    { name: "Sub Category", link: "/" },
    { name: "Setting", link: "/" },
  ];
  return (
    <div className="min-h-screen w-auto bg-blue-900 h-screen p-5  pt-8 relative duration-300">
      <div className="flex items-center py-4 justify-start">
        <img src={logo} alt="logo" width={100} height={100} />
        <span className="text-white font-bold text-lg">Evol8 Company</span>
      </div>
      <ul className="list-none text-white pt-6 ">
        {items.map((info, index) => (
          <Link to={info.link} key={index}>
            <li className="flex rounded-md p-2 cursor-pointer hover:bg-white hover:text-black text-gray-300 text-sm items-center gap-x-4 mt-2 bg-light-white">
              {info.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
