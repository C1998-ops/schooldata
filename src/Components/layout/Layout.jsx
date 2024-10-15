import Header from "../Header";
import SideBar from "../Sidebar";
import Breadcrumbs from "../utils/Breadcrumbs";

const Layout = ({ children }) => {
  return (
    <div className="min-h-full">
      <Header />
      <div className="grid grid-cols-2 md:grid-cols-[220px_1fr] w-full">
        <SideBar />
        <div className="flex flex-col items-start min-w-max mt-16 px-4 py-4 w-full">
          <div className="flex-1 flex flex-col">
            <Breadcrumbs />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
