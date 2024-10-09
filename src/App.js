import { Outlet } from "react-router-dom";
import Layout from "./Components/layout/Layout";
import Department from "./Components/Department/department";
import Category from "./Components/Category";
const DepartmentComponent = Layout(Department);
const CategoryComponent = Layout(Category);
function App() {
  return <Outlet />;
}

export default App;
export { DepartmentComponent, CategoryComponent };
