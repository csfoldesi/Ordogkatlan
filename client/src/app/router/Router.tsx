import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import NotFound from "../../features/errors/NotFound";
import RequireAuth from "./RequireAuth";
import HomePage from "../../features/home/HomePage";
import Register from "../../features/account/register";
import Login from "../../features/account/login";
import MyProgram from "../../features/myProgram/MyProgram";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [{ path: "my-program", element: <MyProgram /> }],
      },
      { path: "register", element: <Register /> },
      { path: "login/:token", element: <Login /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
      { index: true, element: <HomePage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
