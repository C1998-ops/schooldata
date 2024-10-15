import Layout from "./Components/layout/Layout";
import Department from "./Components/Department/department";
import Category from "./Components/Category";
import Dashboard from "./Components/Dboard";
import SubCategory from "./Components/SubCategory";
import axios from "axios";
import { host } from "./Components/utils/routes";
import ScoreDetails from "./Components/pages/ScoreDetails.tsx";

const DepartmentComponent = () => (
  <Layout>
    <Department />
  </Layout>
);
const CategoryComponent = () => {
  return (
    <Layout>
      <Category />
    </Layout>
  );
};
const SubCategoryComponent = () => (
  <Layout>
    <SubCategory />
  </Layout>
);
const ScoreComponent = () => (
  <Layout>
    <ScoreDetails />
  </Layout>
);
const interval = 30000;

function reloadWebsite() {
  axios
    .get(host)
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        }`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}

// setInterval(reloadWebsite, interval);
function App() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default App;
export {
  DepartmentComponent,
  CategoryComponent,
  SubCategoryComponent,
  ScoreComponent,
};
