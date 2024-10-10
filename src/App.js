import Layout from "./Components/layout/Layout";
import Department from "./Components/Department/department";
import Category from "./Components/Category";
import Dashboard from "./Components/Dboard";
const DepartmentComponent = Layout(Department);
const CategoryComponent = Layout(Category);
const DashboardComponent = Layout(Dashboard);
function App() {
  return <DashboardComponent />;
}

export default App;
export { DepartmentComponent, CategoryComponent };
