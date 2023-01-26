import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

function Home() {
  const [cookies] = useCookies(['token']);

  const onUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_URL}/update/role`, {
      method: "PATCH",
      headers: {
        "authorization" : `Bearer ${cookies.token}`
      },
    }).then((res) => {
      if (!res.ok) {
        alert("cannot update role");
        return;
      }
      alert("Update role successful");
      return;
    });
  };

  return (
    <div>
      <div className="d-flex flex-column gap-5 justify-content-center align-items-center mt-5">
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
        <div className="update-profile">
          <Link to="/update-profile">
            <button className="btn btn-primary">Update Profile</button>
          </Link>
        </div>
        <div className="topup">
          <Link to="/topup">
            <button className="btn btn-primary">Top Up</button>
          </Link>
        </div>
        <div className="house">
          <Link to="/house/create">
            <button className="btn btn-primary">Create House</button>
          </Link>
        </div>
        <div className="houses">
          <Link to="/houses">
            <button className="btn btn-primary">House List</button>
          </Link>
        </div>
        <div className="updaterole">
          <button className="btn btn-primary" onClick={(e) => onUpdate(e)}>
            Update Role
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
