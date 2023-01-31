import { useCookies } from "react-cookie";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Favicon from "../../assets/icon/Favicon";
import { useLogoutMutation } from "../../store/slice/User/userApiSlice";
import "./navbar.scss";

function NavBar() {
  const [cookies, , removeCookies] = useCookies(["token"]);
  const [logout] = useLogoutMutation(cookies.token);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(cookies.token);
    removeCookies("token");
    navigate("login");
  };

  return (
    <div className="container">
      <nav className="navbar bg-light navbar-expand-lg">
        <div>
          <h3 className="navbar-brand ms-2">
            <span className="me-2 fst-italic">E</span>
            <Favicon class="small" />
            <span className="ms-2 fst-italic">Z</span>
          </h3>
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
            <li className="nav-item me-5">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink to="/houses">House Listing</NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink
                className={`${cookies.token !== undefined ? "d-none" : ""}`}
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item me-3 dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User
              </NavLink>
              <ul className="dropdown-menu">
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
                      cookies.token !== undefined ? "" : "d-none"
                    }`}
                    to="/logout"
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
      <Outlet />
    </div>
  );
}

export default NavBar;
