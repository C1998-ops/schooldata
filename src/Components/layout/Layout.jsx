import Header from "../Header";
import SideBar from "../Sidebar";

const Layout =
  (Component) =>
  ({ ...props }) =>
    (
      <div className="min-h-full">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] w-full">
          <SideBar />
          <div className="flex flex-col items-start max-w-fit min-w-full mt-16 px-4 py-12 bg-gray-100 h-full">
            <div className="flex-1 flex flex-col">
              <Component {...props} />
            </div>
          </div>
        </div>
      </div>
    );

export default Layout;
