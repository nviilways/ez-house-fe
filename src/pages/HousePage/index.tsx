import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import HouseImage from "../../component/HouseImage";
import HouseTitle from "../../component/HouseTitle";
import ReservationCard from "../../component/ReservationCard";
import Spinner from "../../component/Spinner";
import IHouse from "../../interface/house";
import { useGetHouseByIdQuery } from "../../store/slice/House/houseApiSlice";
import "./housepage.scss"

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

    await fetch(`${process.env.REACT_APP_URL}/houses/${param.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
      body: newForm,
    })
      .then((res) => {
        if (res.ok) {
          alert(res.statusText);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (isLoading) {
    <Spinner />
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
          <ReservationCard price={data?.data?.price as number}/>
        </div>
      </div>
      <div className="accordion" id="accordionParent">
        <div className="accordion-item">
          <h2 className="accordion-header" id="updateHeading">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#updateAccordion"
              aria-expanded="false"
              aria-controls="updateAccordion"
            >
              Update Form
            </button>
          </h2>
          <div
            id="updateAccordion"
            className="accordion-collapse collapse"
            aria-labelledby="updateHeading"
            data-bs-parent="#accordionParent"
          >
            <div className="accordion-body">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={(e) => handleName(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    onChange={(e) => handlePrice(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    onChange={(e) => handleDesc(e)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">City Id</label>
                  <input
                    type="text"
                    name="city-id"
                    className="form-control"
                    onChange={(e) => handleCity(e)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Max Guest</label>
                  <input
                    type="text"
                    name="max-guest"
                    className="form-control"
                    onChange={(e) => handleGuest(e)}
                  />
                </div>
                <button type="submit" className="form-control btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HousePage;
