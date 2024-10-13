import Layout from "./Components/layout/Layout";
import Department from "./Components/Department/department";
import Category from "./Components/Category";
import Dashboard from "./Components/Dboard";
import SubCategory from "./Components/SubCategory";
const DepartmentComponent = Layout(Department);
const CategoryComponent = Layout(Category);
const DashboardComponent = Layout(Dashboard);
const SubCategoryComponent = Layout(SubCategory);
function App() {
  return <DashboardComponent />;
}

export default App;
export { DepartmentComponent, CategoryComponent, SubCategoryComponent };
