import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Favicon from "../../assets/icon/Favicon";
import Button from "../../component/Button";
import Input from "../../component/Input";
import { useLoginMutation } from "../../store/slice/User/userApiSlice";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [, setCookies] = useCookies(["token"]);
  const [loginUser, { data, isSuccess, isError }] = useLoginMutation();

  const navigate = useNavigate();
  const location = useLocation()

  let from = location.state?.from?.pathname || "/";

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      await loginUser({ email, password });
    } else {
      toast.error("Please fill email and password");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setCookies("token", data?.data?.token, {
        path: "/",
        maxAge: 5 * 3600,
      });
      navigate(from, {replace: true});
    }

    if (isError) {
      toast.error("Invalid Credential");
    }
  }, [data?.data?.token, isSuccess, isError, navigate, setCookies, from]);

  return (
    <div className="container login d-flex align-items-center justify-content-evenly">
      <div className="logo pt-5">
        <span className="me-3 fs-1 fst-italic">E</span>
        <Favicon class="large" />
        <span className="ms-2 fs-1 fst-italic">Z</span>
        <p className="text-center fs-1">House</p>
      </div>
      <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
        <Input
          label="Email"
          type="email"
          name="email"
          id="email"
          handle={(e) => handleEmail(e)}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          id="password"
          handle={(e) => handlePassword(e)}
        />
        <Button type="submit" label="Login" />
        <p className="fw border border-0 form-control">
          dont have account ? register
          <Link className="text-primary" to="/register">
            {" "}
            now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
