import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import Input from "../../component/Input";
import Select from "../../component/Select";
import SelectConfig from "../../interface/select";
import { useGetAllCityQuery } from "../../store/slice/City/cityApiSlice";
import { useRegisterMutation } from "../../store/slice/User/userApiSlice";

function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [city, setCity] = useState<number>();

  const { data, isLoading, isError } = useGetAllCityQuery();
  const [registerUser, { isSuccess }] = useRegisterMutation();
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

    if (email && password && city) {
      await registerUser({ email, password, city_id: city });
    } else {
      alert("Please fill the form data");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error Fetching City List</div>;
  }

  const options: SelectConfig[] = data!.data!.map((city) => {
    return { label: `${city.name}`, value: `${city.id}` };
  });

  return (
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            handle={(e) => handleEmail(e)}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            handle={(e) => handlePassword(e)}
          />
          <Select
            name="city"
            label="City"
            config={options}
            handle={(e) => handleCity(e)}
          />
          <Button type="submit" label="Register" />
        </form>
      </div>
  );
}

export default Register;
