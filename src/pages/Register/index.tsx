import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Favicon from "../../assets/icon/Favicon";
import Button from "../../component/Button";
import Input from "../../component/Input";
import Select from "../../component/Select";
import Spinner from "../../component/Spinner";
import SelectConfig from "../../interface/select";
import { useGetAllCityQuery } from "../../store/slice/City/cityApiSlice";
import { useRegisterMutation } from "../../store/slice/User/userApiSlice";

function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [city, setCity] = useState<number>(1);
  const [cookies] = useCookies(['token'])

  const { data, isLoading, isError } = useGetAllCityQuery();
  const [registerUser, { isSuccess: registerSuccess, isError: registerError }] =
    useRegisterMutation();
  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCity(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password && confirmPassword && city) {
      if (password !== confirmPassword) {
        toast.error("Password does not match");
        return;
      }
      await registerUser({ email, password, city_id: city });
    } else {
      toast.error("Please fill the form data");
      return;
    }
  };

  useEffect(() => {
    if (registerSuccess) {
      toast.success("Register Success");
      navigate("/login");
    }

    if (cookies.token) {
      navigate("/");
    }

    if (registerError) {
      toast.error("Failed to register");
    }
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !data?.data) {
    return <div>Error Fetching City List</div>;
  }

  const options: SelectConfig[] = data?.data?.map((city) => {
    return { label: `${city.name}`, value: `${city.id}` };
  });

  return (
    <div className="container lr-auth d-flex flex-column flex-md-row justify-content-evenly align-items-center">
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
          id="email"
          name="email"
          handle={(e) => handleEmail(e)}
          required
        />
        <Select
          name="city"
          label="City"
          config={options}
          handle={(e) => handleCity(e)}
          required
        />
        <Input
          label="Password"
          type="password"
          id="password"
          name="password"
          handle={(e) => handlePassword(e)}
          minlength={6}
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          id="cpassword"
          name="cpassword"
          handle={(e) => handleCPassword(e)}
          minlength={6}
          required
        />
        <Button type="submit" label="Register" />
      </form>
    </div>
  );
}

export default Register;
