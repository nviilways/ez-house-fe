import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetHistoryQuery } from "../../store/slice/User/userApiSlice";
import { BalanceFormatter, DateFormatter } from "../../utils/utils";
import Spinner from "../Spinner";

function ReservationTable() {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const { data: resData, isError, isLoading } = useGetHistoryQuery(cookies.token);

  if(isLoading) {
    return <Spinner />
  }

  if(isError) {
    return (
        <div>Error fetching Booking history</div>
    )
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Booking Code</th>
            <th scope="col">House</th>
            <th scope="col">Check In Date</th>
            <th scope="col">Check Out Date</th>
            <th scope="col">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {resData?.data?.map((res) => (
            <tr key={res.id} onClick={() => navigate(`/reservation/${res.id}`)} >
              <td>{res.id}</td>
              <td>{res.booking_code}</td>
              <td>
                {res.house.name}, {res.house.city.name}
              </td>
              <td>{DateFormatter(res.check_in_date)}</td>
              <td>{DateFormatter(res.check_out_date)}</td>
              <td>{BalanceFormatter(res.total_price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationTable;
