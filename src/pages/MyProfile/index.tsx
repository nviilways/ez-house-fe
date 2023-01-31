import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Button from "../../component/Button";
import {
  useGetHistoryQuery,
  useGetTransactionQuery,
  useMeQuery,
} from "../../store/slice/User/userApiSlice";
import { DateFormatter } from "../../utils/utils";
import "./myprofile.scss";

function MyProfile() {
  const [cookies] = useCookies(["token"]);
  const [isActive, setActive] = useState<string>("profile");
  const { data, isError, isLoading } = useMeQuery(cookies.token);
  const { data: txData } = useGetTransactionQuery(cookies.token);
  const { data: resData } = useGetHistoryQuery(cookies.token);

  const handleProfile = () => {
    setActive("profile");
  };

  const handleTransaction = () => {
    setActive("transaction");
  };

  const handleHistory = () => {
    setActive("history");
  };

  useEffect(() => {}, [isActive]);
  
  if (isLoading) {
    return (
      <div className="spinner-border">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching User Profile...</div>;
  }

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-around">
          <div className="sidebar">
            <div className="d-flex flex-column">
              <Button type="button" label="My Profile" handle={handleProfile} />
              <Button
                type="button"
                label="My Transaction"
                handle={handleTransaction}
              />
              <Button type="button" label="My Booking" handle={handleHistory} />
            </div>
          </div>
          <div className="d-flex justify-content-start main-content">
            <div className={`${isActive === "profile" ? "" : "d-none"}`}>
              <p>Name : {data?.data?.full_name}</p>
              <p>Email: {data?.data?.email}</p>
              <p>
                Address: {`${data?.data?.address}, ${data?.data?.city.name}`}
              </p>
              <p>User Role: {data?.data?.role.name}</p>
            </div>
            <div
              className={`
                ${isActive === "transaction" ? "" : "d-none"}
              `}
            >
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Type</th>
                    <th scope="col">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {txData?.data?.map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.id}</td>
                      <td>{tx.transaction_type.name}</td>
                      <td>{tx.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`${isActive === "history" ? "" : "d-none"}`}>
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
                    <tr key={res.id}>
                      <td>{res.id}</td>
                      <td>{res.booking_code}</td>
                      <td>{res.house.name}</td>
                      <td>{DateFormatter(res.check_in_date)}</td>
                      <td>{DateFormatter(res.check_out_date)}</td>
                      <td>{res.total_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
