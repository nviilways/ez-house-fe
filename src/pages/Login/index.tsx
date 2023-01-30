import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import Input from "../../component/Input";
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
    <div className="container login d-flex align-items-center justify-content-center">
      <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
        <Input label="Email" type="email" name="email" id="email" handle={(e) => handleEmail(e)} />
        <Input label="Password" type="password" name="password" id="password" handle={(e) => handlePassword(e)} />
        <Button type="submit" label="Login" />
      </form>
    </div>
  );
}

export default Login;
