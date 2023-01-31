import { NavLink, Outlet } from "react-router-dom";
import "./navbar.scss"

function NavBar() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg">
        <div>
            <h3 className="navbar-brand ms-2">
                Ez House
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
                <li className="nav-item me-5">
                    <NavLink to="/houses">House Listing</NavLink>
                </li>
                <li className="nav-item me-3">
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
