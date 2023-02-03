import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import SelectConfig from "../../interface/select";
import { useGetAllCityQuery } from "../../store/slice/City/cityApiSlice";
import { useCreateHouseMutation } from "../../store/slice/House/houseApiSlice";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import Spinner from "../Spinner";
import Textarea from "../Textarea";

function CreateHouseForm() {
    const [cookies] = useCookies(['token'])

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<number>(1);
  const [guest, setGuest] = useState<string>("");
  const [images, setImages] = useState<FileList | null>();

  const {
    data: cityData,
    isLoading: cityLoading,
    isError: cityError,
  } = useGetAllCityQuery();
  const [
    createHouse,
    { isError: houseError, isLoading: houseLoading, isSuccess: houseSuccess },
  ] = useCreateHouseMutation();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setImages(e.target.files);
  };

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
    
    if(name && price && desc && address && city && guest && images){
      const newForm = new FormData();
  
      for (let i = 0; i < images!.length; i++) {
        if (images?.[i].type.startsWith("image/")) {
          newForm.append("photo", images![i]);
          continue;
        }
        toast.error(`${images?.[i].name} is not image file !`);
      }
  
      newForm.append("name", name);
      newForm.append("price", price);
      newForm.append("description", desc);
      newForm.append("address", address);
      newForm.append("city_id", city.toString());
      newForm.append("max_guest", guest);
  
      toast.info("Creating House...")
      await createHouse({ input: newForm, token: cookies.token })
    }
    else {
      toast.error("Please fill the form first")
    }

  };

  useEffect(() => {
    if (houseError) {
      toast.error("Failed to create House");
    }

    if (houseSuccess) {
      toast.success("House Created");
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
        handle={(e) => handleName(e)}
      />
      <Textarea
        label="House Description"
        id="desc"
        name="desc"
        required
        handle={(e) => handleDesc(e)}
      />
      <Textarea
        label="House Address"
        name="address"
        id="address"
        required
        handle={(e) => handleAddress(e)}
      />
      <Select
        label="House City"
        name="city"
        config={options}
        required
        defaultvalue={cityData.data[0].id.toString()}
        handle={(e) => handleCity(e)}
      />
      <Input
        label="House Price"
        type="number"
        name="price"
        id="price"
        required
        min="1"
        handle={(e) => handlePrice(e)}
      />
      <Input
        label="House Max Guest"
        type="number"
        name="guest"
        id="guest"
        required
        min="1"
        handle={(e) => handleGuest(e)}
      />
      <Input
        label="House Photos"
        type="file"
        name="photos"
        id="photos"
        required
        multiple
        accept="image/*"
        handle={(e) => handleFile(e)}
      />
      <Button
        label="Submit"
        type="submit"
        disabled={houseLoading ? true : false}
      />
    </form>
  );
}

export default CreateHouseForm;
