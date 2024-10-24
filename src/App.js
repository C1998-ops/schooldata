import Layout from "./Components/layout/Layout";
import Department from "./features/Department";
import Category from "./features/Category";
import SubCategory from "./features/SubCategory";
import axios from "axios";
import { host } from "./Components/utils/routes";
import ScoreDetails from "./features/ScoreDetails/index";
import { Outlet } from "react-router-dom";

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

setInterval(reloadWebsite, interval);
function App() {
  return (
    <Layout>
      <Outlet />
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
