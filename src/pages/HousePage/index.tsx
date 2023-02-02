import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UpdateIcon from "../../assets/icon/Update";
import DeleteHouse from "../../component/DeleteHouse";
import HouseImage from "../../component/HouseImage";
import HouseTitle from "../../component/HouseTitle";
import ReservationCard from "../../component/ReservationCard";
import Spinner from "../../component/Spinner";
import UpdateHouseForm from "../../component/UpdateHouseForm";
import IHouse from "../../interface/house";
import { RootState } from "../../store";
import { useGetHouseByIdQuery } from "../../store/slice/House/houseApiSlice";
import "./housepage.scss";

function HousePage() {
  const today = new Date();
  const tommorow = new Date(today);
  tommorow.setDate(today.getDate() + 1);

  const userStore = useSelector((state:RootState) => state.userStore)

  const [show, setShow] = useState<boolean>(false);

  const param = useParams();
  const id = parseInt(param.id as string);
  const { data, isLoading, isError } = useGetHouseByIdQuery(id);

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
      <div className={`d-flex flex-column justify-content-start ${data?.data?.user_id === userStore.id ? '' : 'd-none'}`}>
        <div className="d-flex flex-column flex-md-row justify-content-evenly">
          <div>
            <label>Update House</label>
            <button className="btn" onClick={() => setShow(!show)}><UpdateIcon class="mini"/></button>
          </div>
          <DeleteHouse house={data?.data as IHouse} />
        </div>
      </div>
      <div className={`update-house ${show ? "" : "d-none"}`}>
        <UpdateHouseForm house={data?.data as IHouse}/>
      </div>
    </div>
  );
}

export default HousePage;
