import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import RequireAuth from "./RequireAuth";
import Layout from "../components/layout/index";
import AddAccount from "../pages/Accounts/AddAccount";
import EditAccount from "../pages/Accounts/EditAccount";
import Settings from "../pages/Settings/Settings";

export const AppRoutes = () => {
  const routes = useRoutes([
    // PUBLIC ROUTES
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    // PRIVATE ROUTES
    {
      path: "/",
      element: (
        <RequireAuth>
          <Layout />
        </RequireAuth>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> }, 
        { path: "accounts/add", element: <AddAccount /> },
        { path: "accounts/edit/:id", element: <EditAccount />},
        { path: "settings", element: <Settings /> },
      ],
    },

    // NOT FOUND
    { path: "*", element: <div>404 Not Found</div> },
  ]);

  return routes;
};

