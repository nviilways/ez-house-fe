import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../store/slice/User/userApiSlice";

function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [city, setCity] = useState<number>();

  const [registerUser, {isSuccess, error}] = useRegisterMutation()
  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.valueAsNumber);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(email && password && city) {
      await registerUser({email, password, city_id: city})
    }
    else {
      alert("Please fill the form data")
    }
  };

  useEffect(() => {
    if(isSuccess) {
      navigate("/login");
    }
  })
  

  return (
    <div>
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
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="number"
              name="city"
              id="city"
              className="form-control"
              placeholder="city"
              onChange={(e) => handleCity(e)}
            />
          </div>
          <button type="submit" className="form-control btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
