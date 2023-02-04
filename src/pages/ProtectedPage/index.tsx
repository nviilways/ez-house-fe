import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../store";

function ProtectedPage() {
  const [cookies] = useCookies(["token"]);
  const location = useLocation();
  const userStore = useSelector((state: RootState) => state.userStore);

  if (!cookies.token) {
    if (userStore.id === 0) {
      toast.info("Please login to continue");
      return <Navigate to="login" replace state={{ from: location }} />;
    }
  }

  return <Outlet />;
}

export function ProtectedPageHost() {
  const userStore = useSelector((state: RootState) => state.userStore);

  if (userStore.role_id !== 3) {
    toast.info("You are not allowed to access this page");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedPage;
