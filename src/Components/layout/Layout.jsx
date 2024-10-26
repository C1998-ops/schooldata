import { useState } from "react";
import Header from "../Header";
import SideBar from "../Sidebar";
import Breadcrumbs from "../utils/Breadcrumbs";
const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFullWidth, setIsFullWidth] = useState(false);

  // Toggle sidebar width for desktop
  const toggleSideMenuWidth = () => {
    // setIsFullWidth(!isFullWidth);
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen flex max-w-full">
      <Header
        toggleSideMenuWidth={toggleSideMenuWidth}
        toggleMobile={toggleSidebar}
      />
      <div
        className={`grid ${
          isSidebarOpen ? "grid-cols-[200px_1fr]" : "grid-cols-1"
        } transition-all duration-300 ease-in-out relative`}
      >
        {isSidebarOpen && (
          <div
            className={`${
              isSidebarOpen
                ? "fixed inset-y-0 left-0 top-0 w-fit h-full"
                : "relative shadow-lg"
            } md:relative md:h-auto sm:w-full ${
              isFullWidth ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 delay-200  ease-in-out sm:relative translate-x-0 bg-blue-900 z-10 border-l-4 border-blue-500 backdrop-blur-sm`}
          >
            <SideBar />
          </div>
        )}
        <div
          className={`flex items-center min-w-max mt-6 sm:mt-6 md:mt-8 px-4 max-w-full py-4 sm:max-w-screen-sm md:max-w-screen-xl transition-all delay-300 ease-in-out overflow-hidden`}
        >
          <div className="flex-1 flex flex-col p-2 h-full">
            <Breadcrumbs />
            {children}
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <div className="fixed md:hidden inset-0 bg-black opacity-40 z-10 pointer-events-none" />
      )}
    </div>
  );
};

export default Layout;
