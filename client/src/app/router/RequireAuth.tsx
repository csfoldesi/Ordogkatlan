import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  /*const {
    userStore: { isLoggedIn },
  } = useStore();*/
  const isLoggedIn = true;
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}
