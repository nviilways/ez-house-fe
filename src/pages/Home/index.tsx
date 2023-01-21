import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="login d-flex flex-column gap-5 justify-content-center align-items-center mt-5">
        <div className="login">
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
        <div className="register">
          <Link to="/register">
            <button className="btn btn-primary">Register</button>
          </Link>
        </div>
        <div className="my-profile">
          <Link to="/my-profile">
            <button className="btn btn-primary">My Profile</button>
          </Link>
        </div>
        <div className="topup">
          <Link to="/topup">
            <button className="btn btn-primary">Top Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
