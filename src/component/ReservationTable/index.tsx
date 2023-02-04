import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { setPageRes } from "../../store/slice/Reservation/reservationSlice";
import { useGetHistoryQuery } from "../../store/slice/User/userApiSlice";
import { BalanceFormatter, DateFormatter } from "../../utils/utils";
import Pagination from "../Pagination";
import Spinner from "../Spinner";

function ReservationTable() {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filterRes);
  const {
    data: resData,
    isError,
    isLoading,
  } = useGetHistoryQuery({ token: cookies.token, filter: filter });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error fetching Booking history</div>;
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
          {resData?.data?.data?.map((res) => (
            <tr key={res.id} onClick={() => navigate(`/reservation/${res.id}`)}>
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

      <div className="d-flex justify-content-center align-items-center mt-5">
        <Pagination
          currentPage={resData?.data?.page as number}
          totalPage={Math.ceil(
            (resData?.data?.count as number) / (resData?.data?.limit as number)
          )}
          setPage={(page) => dispatch(setPageRes(page))}
        />
      </div>
    </div>
  );
}

export default ReservationTable;
