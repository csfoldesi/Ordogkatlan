import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import NotFound from "../../features/errors/NotFound";
import RequireAuth from "./RequireAuth";
import Register from "../../features/account/register";
import Login from "../../features/account/login";
import SelectedProgramList from "../../features/program/SelectedProgramList";
import NowProgramList from "../../features/program/NowProgramList";
import Program from "../../features/program/Program";
import ProgramListTest from "../../features/program/ProgramListTest";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [{ path: "selected-program", element: <SelectedProgramList /> }],
      },
      { path: "program", element: <Program /> },
      { path: "test", element: <ProgramListTest /> },
      { path: "register", element: <Register /> },
      { path: "login/:token", element: <Login /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
      { index: true, element: <NowProgramList /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
