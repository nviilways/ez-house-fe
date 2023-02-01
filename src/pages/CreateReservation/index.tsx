import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../component/Button";
import HouseTitle from "../../component/HouseTitle";
import Input from "../../component/Input";
import Spinner from "../../component/Spinner";
import IHouse from "../../interface/house";
import { RootState } from "../../store";
import { useGetHouseByIdQuery } from "../../store/slice/House/houseApiSlice";
import { setIn, setOut } from "../../store/slice/House/houseFilterSlice";
import { useCreateReservationMutation } from "../../store/slice/Reservation/reservationApiSlice";
import { BalanceFormatter } from "../../utils/utils";
import "./reservation.scss";

function CreateReservation() {
  const today = new Date();
  const tommorow = new Date(today);
  tommorow.setDate(today.getDate() + 1);

  const param = useParams();
  const dispatch = useDispatch();
  const id = parseInt(param.id as string);

  const { dateIn, dateOut } = useSelector(
    (state: RootState) => state.filterHouse
  );

  const [cookies] = useCookies(["token"]);
  const { data, isError, isLoading } = useGetHouseByIdQuery(id);
  const [createReservation] = useCreateReservationMutation();

  const handleReservation = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await createReservation({
      input: {
        check_in_date: dateIn,
        check_out_date: dateOut,
        house_id: data?.data?.id as number,
      },
      token: cookies.token,
    })
      .unwrap().then(() => {
        toast.success("Reservation Success")
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  if (isLoading) {
    <Spinner />;
  }

  if (isError) {
    <div>Error fetching House Data...</div>;
  }

  return (
    <div className="container reservation-detail mt-5 gap-5 box d-flex flex-column flex-md-row">
      <div className="house-detail">
        <HouseTitle house={data?.data as IHouse} />
        <img
          src={data?.data?.house_photos?.[0].photo_url}
          alt={data?.data?.name}
          className="rounded medium-image"
        />
      </div>
      <div className="pricing-detail">
        <h3>Reservation Details</h3>
        <hr />
        <h4>Book Details</h4>
        <Input
          type="date"
          label="Date In"
          name="datein"
          id="datein"
          min={today.toISOString().split("T")[0]}
          defaultvalue={dateIn}
          handle={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setIn(e.target.value))
          }
        />
        <Input
          type="date"
          label="Date Out"
          name="dateout"
          id="dateout"
          min={tommorow.toISOString().split("T")[0]}
          defaultvalue={dateOut}
          handle={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setOut(e.target.value))
          }
        />
        <p className="mt-3">
          Reserving for:{" "}
          {new Date(dateOut).getDate() - new Date(dateIn).getDate()} day(s)
        </p>
        <hr />
        <h4 className="mb-4">Pricing Details</h4>
        <p>
          Price: {BalanceFormatter(data?.data?.price as number)} x{" "}
          {new Date(dateOut).getDate() - new Date(dateIn).getDate()} night(s)
        </p>
        <p className="fw-bold">
          Total Price:{" "}
          {BalanceFormatter(
            (new Date(dateOut).getDate() - new Date(dateIn).getDate()) *
              (data?.data?.price as number)
          )}
        </p>
        <Button
          type="button"
          label="Pay Now"
          handle={(e) => handleReservation(e)}
        />
      </div>
    </div>
  );
}

export default CreateReservation;
