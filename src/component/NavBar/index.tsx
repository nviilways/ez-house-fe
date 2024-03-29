import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Favicon from "../../assets/icon/Favicon";
import UserIcon from "../../assets/icon/User";
import { RootState } from "../../store";
import { useLogoutMutation } from "../../store/slice/User/userApiSlice";
import {
  Claim,
  setAuth,
  setUserStateAll,
} from "../../store/slice/User/userSlice";
import Footer from "../Footer";
import "./navbar.scss";

function NavBar() {
  const [cookies, , removeCookies] = useCookies(["token"]);
  const [logout] = useLogoutMutation(cookies.token);
  const navigate = useNavigate();

  const userStore = useSelector((state: RootState) => state.userStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookies.token) {
      const userId = (jwtDecode(cookies.token) as Claim).id;
      const roleId = (jwtDecode(cookies.token) as Claim).role_id;
      const walletId = (jwtDecode(cookies.token) as Claim).wallet_id;
      dispatch(setAuth({ id: userId, role_id: roleId, wallet_id: walletId }));
    } else {
      dispatch(setUserStateAll(0));
    }
  }, [cookies.token, dispatch]);

  const handleLogout = async () => {
    await logout(cookies.token);
    removeCookies("token");
    dispatch(setUserStateAll(0));
    navigate("/");
  };

  return (
    <div className="container">
      <nav className="navbar bg-light navbar-expand-lg">
        <div>
          <Link to="">
            <h3 className="navbar-brand ms-2">
              <span className="me-2 fst-italic">E</span>
              <Favicon class="small" />
              <span className="ms-2 fst-italic">Z</span>
            </h3>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className={`nav-item ${userStore.id !== 0 ? "me-5" : ""}`}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li
              className={`nav-item me-5 ${userStore.id === 0 ? "d-none" : ""}`}
            >
              <NavLink to="/top-up">Top Up</NavLink>
            </li>
            <li
              className={`nav-item me-5 ${userStore.id === 0 ? "d-none" : ""}`}
            >
              <NavLink to="/reservation">Your Booking</NavLink>
            </li>
            <li
              className={`nav-item me-4 ${
                userStore.role_id === 3 ? "" : "d-none"
              }`}
            >
              <NavLink
                className={`${userStore.role_id === 3 ? "" : "d-none"}`}
                to="/houses"
              >
                House Listing
              </NavLink>
            </li>
            <li
              className={`nav-item ms-3 me-3 ${
                userStore.id !== 0 ? "d-none" : ""
              }`}
            >
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="nav-item me-3 dropdown">
              <NavLink
                className={`nav-link dropdown-toggle ${
                  userStore.id === 0 ? "d-none" : ""
                }`}
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <UserIcon class="mini" />
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <NavLink className="dropdown-item" to="/my-profile">
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink
                    className={`dropdown-item ${
                      userStore.id !== 0 ? "" : "d-none"
                    }`}
                    to="/"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      <div className="main-layout">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default NavBar;
