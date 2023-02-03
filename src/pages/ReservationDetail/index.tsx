import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../component/Button";
import HouseTitle from "../../component/HouseTitle";
import Spinner from "../../component/Spinner";
import IHouse from "../../interface/house";
import { RootState } from "../../store";
import {
  useCreatePickupMutation,
  useGetReservationByIdQuery,
} from "../../store/slice/Reservation/reservationApiSlice";
import { BalanceFormatter, DateFormatter } from "../../utils/utils";
import "./rdetail.scss";

function ReservationDetail() {
  const today = new Date();
  const tommorow = new Date(today);
  tommorow.setDate(today.getDate() + 1);

  const param = useParams();
  const id = parseInt(param.id as string);
  const [cookies] = useCookies(["token"]);

  const [show, setShow] = useState<boolean>(false);

  const userStore = useSelector((state: RootState) => state.userStore);

  const [createPickup, { isLoading: loadingPickup }] =
    useCreatePickupMutation();
  const { data, isError, isLoading } = useGetReservationByIdQuery({
    id: id,
    token: cookies.token,
  });

  const handlePickup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      window.confirm(
        "Are you sure want to request pickup ? Your current balance will be charged"
      )
    ) {
      await createPickup({
        user_id: userStore.id,
        reservation_id: id,
        token: cookies.token,
      })
        .unwrap()
        .then(() => {
          toast.success("Pickup requested");
          setShow(!show);
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error fetching Reservation Details</div>;
  }

  const rangeDate =
    (new Date(data?.data?.check_out_date as unknown as string).getTime() -
    new Date(data?.data?.check_in_date as unknown as string).getTime()) / (1000 * 60 * 60 * 24);

  return (
    <div className="container reserve-detail d-flex flex-column flex-md-row justify-content-around align-items-center">
      <div>
        <HouseTitle house={data?.data?.house as IHouse} />
        <img
          src={data?.data?.house.house_photos?.[0].photo_url}
          alt={data?.data?.house.name}
          className="rounded medium-image"
        />
      </div>
      <div className="pricing-detail">
        <h3>Reservation Details</h3>
        <hr />
        <h4>Book Details</h4>
        <p className="mt-3">Booking Code: {data?.data?.booking_code}</p>
        <p>Check In Date: {DateFormatter(data?.data?.check_in_date as Date)}</p>
        <p>
          Check Out Date: {DateFormatter(data?.data?.check_out_date as Date)}
        </p>
        <p>Reserving for: {rangeDate} day(s)</p>
        <hr />
        <h4 className="mb-4">Pricing Details</h4>
        <p>
          Price: {BalanceFormatter(data?.data?.house.price as number)} x{" "}
          {rangeDate} night(s)
        </p>
        <p className={`${data?.data?.pickup ? "" : "d-none"}`}>
          Pickup:{" "}
          {data?.data?.user.city_id === data?.data?.house.city.id
            ? BalanceFormatter(100000)
            : BalanceFormatter(300000)}
        </p>
        <p className="fw-bold">
          Total Price: {BalanceFormatter(data?.data?.total_price as number)}
        </p>
        <div className={`${data?.data?.pickup || show ? "d-none" : ""}`}>
          <Button
            label="Request For Pickup"
            type="button"
            disabled={loadingPickup ? true : false}
            handle={(e) => handlePickup(e)}
          />
          <div className="form-text">Pickup Price:</div>
          <div className="form-text">
            Same City: Rp. 100.000 | Others : Rp. 300.000{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationDetail;
