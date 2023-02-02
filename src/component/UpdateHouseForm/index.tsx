import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import HouseProps from "../../interface/props/house";
import SelectConfig from "../../interface/select";
import { useGetAllCityQuery } from "../../store/slice/City/cityApiSlice";
import { useUpdateHouseMutation } from "../../store/slice/House/houseApiSlice";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import Spinner from "../Spinner";
import Textarea from "../Textarea";

function UpdateHouseForm(props: HouseProps) {
  const [cookies] = useCookies(["token"]);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<number>(0);
  const [guest, setGuest] = useState<string>("");

  const {
    data: cityData,
    isLoading: cityLoading,
    isError: cityError,
  } = useGetAllCityQuery();
  const [
    updateHouse,
    { isError: houseError, isLoading: houseLoading, isSuccess: houseSuccess },
  ] = useUpdateHouseMutation();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCity(value);
  };

  const handleGuest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuest(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(name || price || desc || address || city || guest) {
      const newForm = new FormData();
  
      newForm.append("name", name);
      newForm.append("price", price);
      newForm.append("description", desc);
      newForm.append("address", address);
      newForm.append("city_id", city.toString());
      newForm.append("max_guest", guest);
  
      await updateHouse({ input: newForm, token: cookies.token, id: props.house.id });
      return
    }

    toast.error("Please update the form first before submitting")
  };

  useEffect(() => {
    if (houseError) {
      toast.error("Failed to update House");
    }

    if (houseSuccess) {
      toast.success("House Updated");
    }
  }, [houseError, houseSuccess]);

  if (cityLoading) {
    return <Spinner />;
  }

  if (cityError || !cityData?.data) {
    return <div>Error fetching City List</div>;
  }

  const options: SelectConfig[] = cityData.data.map((city) => {
    return { label: `${city.name}`, value: `${city.id}` };
  });

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Input
        auto
        label="House Name"
        type="text"
        name="name"
        id="name"
        required
        defaultvalue={props.house.name}
        handle={(e) => handleName(e)}
      />
      <Textarea
        label="House Description"
        id="desc"
        name="desc"
        required
        defaultvalue={props.house.description}
        handle={(e) => handleDesc(e)}
      />
      <Textarea
        label="House Address"
        name="address"
        id="address"
        required
        defaultvalue={props.house.address}
        handle={(e) => handleAddress(e)}
      />
      <Select
        label="House City"
        name="city"
        config={options}
        required
        defaultvalue={props.house.city.id}
        handle={(e) => handleCity(e)}
      />
      <Input
        label="House Price"
        type="number"
        name="price"
        id="price"
        required
        defaultvalue={props.house.price}
        handle={(e) => handlePrice(e)}
      />
      <Input
        label="House Max Guest"
        type="number"
        name="guest"
        id="guest"
        required
        defaultvalue={props.house.max_guest}
        handle={(e) => handleGuest(e)}
      />
      <Button
        label="Submit"
        type="submit"
        disabled={houseLoading ? true : false}
      />
    </form>
  );
}

export default UpdateHouseForm;
