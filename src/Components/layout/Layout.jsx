import { useState } from "react";
import Header from "../Header";
import SideBar from "../Sidebar";
import Breadcrumbs from "../utils/Breadcrumbs";
import { FaBars } from "react-icons/fa";
const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFullWidth, setIsFullWidth] = useState(false);

  // Toggle sidebar width for desktop
  const toggleSideMenuWidth = () => {
    setIsFullWidth(!isFullWidth);
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen flex">
      <Header
        toggleSideMenuWidth={toggleSideMenuWidth}
        toggleMobile={toggleSidebar}
      />
      {/* <button
        className="md:hidden p-4 focus:outline-none"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button> */}
      <div
        className={`grid ${
          isSidebarOpen ? "grid-cols-[200px_1fr]" : "grid-cols-1"
        } transition-all duration-300 ease-in-out relative`}
      >
        {isSidebarOpen && (
          <div
            className={`fixed inset-y-0 left-0 top-0 transform ${
              isFullWidth ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 delay-200  ease-in-out md:relative md:translate-x-0 bg-blue-900 h-full`}
          >
            <SideBar />
          </div>
        )}
        <div className="flex flex-col items-start min-w-max mt-4 sm:mt-8 md:mt-12 px-4 py-4 w-full transition-all delay-300 ease-in-out">
          <div className="flex-1 flex flex-col p-4 h-full">
            <Breadcrumbs />
            {children}
          </div>
        </div>
      </div>
      {/* {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 md:hidden" />
      )} */}
    </div>
  );
};

export default Layout;
