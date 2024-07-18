import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import About from "../../features/About/About";
import Contact from "../../features/contact/Contact";
import NotFound from "../../features/errors/NotFound";
import RequireAuth from "./RequireAuth";
import HomePage from "../../features/home/HomePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "about", element: <About /> },
          { path: "contact", element: <Contact /> },
        ],
      },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
      { index: true, element: <HomePage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
