import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import HouseTitle from "../../component/HouseTitle";
import Spinner from "../../component/Spinner";
import IHouse from "../../interface/house";
import { useGetReservationByIdQuery } from "../../store/slice/Reservation/reservationApiSlice";
import { BalanceFormatter, DateFormatter } from "../../utils/utils";
import "./rdetail.scss";

function ReservationDetail() {
  const today = new Date();
  const tommorow = new Date(today);
  tommorow.setDate(today.getDate() + 1);

  const param = useParams();
  const id = parseInt(param.id as string);
  const [cookies] = useCookies(["token"]);

  const { data, isError, isLoading } = useGetReservationByIdQuery({
    id: id,
    token: cookies.token,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error fetching Reservation Details</div>;
  }

  const rangeDate =
    new Date(data?.data?.check_out_date as unknown as string).getDate() -
    new Date(data?.data?.check_in_date as unknown as string).getDate();

  return (
    <div className="container reserve-detail d-flex flex-row justify-content-around align-items-center">
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
        <p>Check Out Date: {DateFormatter(data?.data?.check_out_date as Date)}</p>
        <p>Reserving for: {rangeDate} day(s)</p>
        <hr />
        <h4 className="mb-4">Pricing Details</h4>
        <p>
          Price: {BalanceFormatter(data?.data?.total_price as number)} x{" "}
          {rangeDate} night(s)
        </p>
        <p className="fw-bold">
          Total Price:{" "}
          {BalanceFormatter(rangeDate * (data?.data?.house.price as number))}
        </p>
      </div>
    </div>
  );
}

export default ReservationDetail;
