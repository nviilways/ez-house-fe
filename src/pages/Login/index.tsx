import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [,setCookies] = useCookies(['token'])

  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      if (!res.ok) {
        alert("Wrong Email / Password");
      }
      return res.json();
    });

    setCookies("token", response.data.token, {
      path: "/",
      maxAge: 2 * 3600,
    });

    navigate("/");
  };

  return (
    <div className="container">
      <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="email"
            onChange={(e) => handleEmail(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="password"
            onChange={(e) => handlePassword(e)}
          />
        </div>
        <button type="submit" className="form-control btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
