import { SignupContextProvider } from "../../contexts/SignupContext";
import SignIn from "../../features/SignIn/SignIn.tsx";
import SignUp from "../../features/SignUp/Signup";
import Department from "../../features/Department/index.jsx";
import Category from "../../features/Category/index.jsx";
import SubCategory from "../../features/SubCategory/index.jsx";
import Dashboard from "../../features/Dashboard/index.jsx";
import App from "../../App.js";
import ScoreDetails from "../../features/ScoreDetails/index.jsx";
import VerifyEmailAccount from "../../features/verifyEmail/index.jsx";
import ProtectRoutes from "./ProtectRoutes.tsx";
import PublicRoutes from "./PublicRoutes.jsx";

export const publicRoutes = [
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: (
          <SignupContextProvider>
            <SignUp />
          </SignupContextProvider>
        ),
      },
      { path: "account/confirm/:token", element: <VerifyEmailAccount /> },
    ],
  },
];
export const protectedRouteslinks = [
  {
    path: "/",
    element: (
      <ProtectRoutes>
        <App />
      </ProtectRoutes>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "department",
        element: <Department />,
      },
      { path: "category", element: <Category /> },
      { path: "subcategory", element: <SubCategory /> },
      { path: "scoredetails", element: <ScoreDetails /> },
    ],
  },
];
