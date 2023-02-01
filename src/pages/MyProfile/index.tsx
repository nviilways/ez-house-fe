import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Button from "../../component/Button";
import Input from "../../component/Input";
import Select from "../../component/Select";
import SelectConfig from "../../interface/select";
import { useGetAllCityQuery } from "../../store/slice/City/cityApiSlice";
import {
  useGetHistoryQuery,
  useGetTransactionQuery,
  useMeQuery,
  useUpdateProfileMutation,
} from "../../store/slice/User/userApiSlice";
import { DateFormatter } from "../../utils/utils";
import "./myprofile.scss";

function MyProfile() {
  const [cookies] = useCookies(["token"]);
  const [isActive, setActive] = useState<string>("profile");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<number>(0);

  const {
    data: profileData,
    isError: profileError,
    isLoading: profileLoading,
  } = useMeQuery(cookies.token);
  const { data: txData } = useGetTransactionQuery(cookies.token);
  const { data: resData } = useGetHistoryQuery(cookies.token);
  const {
    data: cityData,
    isLoading: cityLoading,
    isError: cityError,
  } = useGetAllCityQuery();

  const [updateProfile, { isSuccess: updateSuccess, isError: updateError }] =
    useUpdateProfileMutation();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(parseInt(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name || address || city) {
      await updateProfile({
        input: { full_name: name, address: address, city_id: city },
        token: cookies.token,
      });
    }

    if (updateError) {
      toast.error("Failed to update profile");
    }

    if (updateSuccess) {
      toast("Profile Updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      alert("Noice")
    }
  };

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

  if (profileLoading) {
    return (
      <div className="spinner-border">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (profileError) {
    return <div>Error fetching User Profile...</div>;
  }

  if (cityLoading) {
    return(
      <div className="spinner-border">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  }

  if (cityError || !cityData?.data) {
    return <div>Error fetching City List</div>;
  }

  const options: SelectConfig[] = cityData.data.map((city) => {
    return { label: `${city.name}`, value: `${city.id}` };
  });

  return (
    <div>
      <div className="container mt-5">
        <div className="content d-flex flex-column flex-md-row justify-content-around">
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
          <div className="container d-flex justify-content-center main-content">
            <form
              className="d-flex flex-column flex-md-row"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className={`${isActive === "profile" ? "" : "d-none"}`}>
                <Input
                  type="text"
                  label="Email"
                  name="email"
                  id="email"
                  disabled
                  defaultvalue={profileData?.data?.email}
                />
                <Input
                  type="text"
                  label="Full Name"
                  name="full-name"
                  id="full-name"
                  defaultvalue={profileData?.data?.full_name}
                  handle={(e) => handleName(e)}
                />
                <Input
                  type="text"
                  label="Address"
                  name="address"
                  id="address"
                  defaultvalue={profileData?.data?.address}
                  handle={(e) => handleAddress(e)}
                />
                <Select
                  name="city"
                  label="City"
                  config={options}
                  handle={(e) => handleCity(e)}
                  value={profileData?.data?.city_id}
                />
                <Input
                  type="text"
                  label="Role"
                  name="role"
                  id="role"
                  disabled
                  defaultvalue={profileData?.data?.role.name}
                />
                <Button label="Update Profile" type="submit" />
              </div>
            </form>
            <div
              className={`
                ${isActive === "transaction" ? "" : "d-none"}
              `}
            >
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {txData?.data?.map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.transaction_type.name}</td>
                      <td>{tx.balance}</td>
                      <td>{DateFormatter(tx.created_at)}</td>
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
                      <td>
                        {res.house.name}, {res.house.city.name}
                      </td>
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
