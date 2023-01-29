import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/slice/User/userApiSlice";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [,setCookies] = useCookies(['token'])
  const [loginUser, {data, isSuccess}] = useLoginMutation()

  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(email && password) {
      await loginUser({email, password})
    }
    else{
      alert("Please fill email and password")
    }

  };

  useEffect(() => {
    if(isSuccess) {
      setCookies("token", data?.data?.token, {
        path: "/",
        maxAge: 2 * 3600,
      });
      navigate("/");
    }
  }, [data?.data?.token, isSuccess, navigate, setCookies])

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
