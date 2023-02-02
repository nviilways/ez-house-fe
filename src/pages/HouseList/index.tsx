import HouseCard from "../../component/HouseCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  useCreateHouseMutation,
  useGetHouseByHostQuery,
} from "../../store/slice/House/houseApiSlice";
import Pagination from "../../component/Pagination";
import Spinner from "../../component/Spinner";
import Select from "../../component/Select";
import SelectConfig from "../../interface/select";
import { setLimit } from "../../store/slice/House/houseFilterSlice";
import { useCookies } from "react-cookie";
import HostFilter from "../../component/HostFilter";
import { useEffect, useState } from "react";
import Input from "../../component/Input";
import Textarea from "../../component/Textarea";
import { useGetAllCityQuery } from "../../store/slice/City/cityApiSlice";
import Button from "../../component/Button";
import { toast } from "react-toastify";
import CreateIcon from "../../assets/icon/Create";

function HouseList() {
  const filter = useSelector((state: RootState) => state.filterHouse);
  const [cookies] = useCookies(["token"]);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<number>(0);
  const [guest, setGuest] = useState<string>("");
  const [images, setImages] = useState<FileList | null>();
  const [show, setShow] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetHouseByHostQuery({
    token: cookies.token,
    filter: filter,
  });
  const {
    data: cityData,
    isLoading: cityLoading,
    isError: cityError,
  } = useGetAllCityQuery();
  const [
    createHouse,
    { isError: houseError, isLoading: houseLoading, isSuccess: houseSuccess },
  ] = useCreateHouseMutation();

  const dispatch = useDispatch();

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

    await createHouse({ input: newForm, token: cookies.token });
  };

  useEffect(() => {
    if (houseError) {
      toast.error("Failed to create House");
    }

    if (houseSuccess) {
      toast.success("House Created");
    }
  }, [houseError, houseSuccess]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div>
        <h1>Error fetching house data</h1>
      </div>
    );
  }

  if (cityLoading) {
    return <Spinner />;
  }

  if (cityError || !cityData?.data) {
    return <div>Error fetching City List</div>;
  }

  const options: SelectConfig[] = cityData.data.map((city) => {
    return { label: `${city.name}`, value: `${city.id}` };
  });

  const limitConfig: SelectConfig[] = [
    { label: "1", value: 1 },
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "20", value: 20 },
  ];

  return (
    <div className="container mt-5">
      <HostFilter />
      <div className="d-flex justify-content-start mb-4">
        <Select
          label="Items per page"
          name="limit"
          config={limitConfig}
          value={filter.limit}
          handle={(e) => dispatch(setLimit(e.target.value))}
        />
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        {data?.data?.data?.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Pagination
          currentPage={data?.data?.page as number}
          totalPage={Math.ceil(
            (data?.data?.count as number) / (data?.data?.limit as number)
          )}
        />
      </div>
      <hr />
      <div className="d-flex flex-column justify-content-start">
        <div>
          <p>Create New House</p>
          <button className="btn" onClick={() => setShow(!show)}><CreateIcon class="mini"/></button>
        </div>
      </div>
      <div className={`create-house ${show ? "" : "d-none"}`}>
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
            handle={(e) => handleCity(e)}
          />
          <Input
            label="House Price"
            type="number"
            name="price"
            id="price"
            required
            handle={(e) => handlePrice(e)}
          />
          <Input
            label="House Max Guest"
            type="number"
            name="guest"
            id="guest"
            required
            handle={(e) => handleGuest(e)}
          />
          <Input
            label="House Photos"
            type="file"
            name="photos"
            id="photos"
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
      </div>
    </div>
  );
}

export default HouseList;
