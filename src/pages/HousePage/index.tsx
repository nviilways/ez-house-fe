import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import HouseImage from "../../component/HouseImage";
import HouseTitle from "../../component/HouseTitle";
import ReservationCard from "../../component/ReservationCard";
import Spinner from "../../component/Spinner";
import IHouse from "../../interface/house";
import { useGetHouseByIdQuery } from "../../store/slice/House/houseApiSlice";
import "./housepage.scss";

function HousePage() {
  const today = new Date();
  const tommorow = new Date(today);
  tommorow.setDate(today.getDate() + 1);

  const param = useParams();
  const id = parseInt(param.id as string);
  const [cookies] = useCookies(["token"]);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [guest, setGuest] = useState<string>("");
  const { data, isLoading, isError } = useGetHouseByIdQuery(id);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleGuest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuest(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newForm = new FormData();

    newForm.append("name", name);
    newForm.append("price", price);
    newForm.append("description", desc);
    newForm.append("city_id", city);
    newForm.append("max_guest", guest);

  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error fetching house data...</div>;
  }

  return (
    <div className="container house-box pt-3 d-flex flex-column gap-3">
      <HouseTitle house={data?.data as IHouse} />
      <HouseImage photos={data?.data?.house_photos} />
      <hr />
      <div className="d-flex flex-column flex-md-row gap-5 justify-content-between">
        <div>
          <p className="text-desc">{data?.data?.description}</p>
        </div>
        <div>
          <ReservationCard price={data?.data?.price as number} />
        </div>
      </div>
      <hr />
    </div>
  );
}

export default HousePage;
