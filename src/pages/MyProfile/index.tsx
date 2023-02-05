import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../component/Button";
import Input from "../../component/Input";
import NotFound from "../../component/NotFound";
import Pagination from "../../component/Pagination";
import Select from "../../component/Select";
import Spinner from "../../component/Spinner";
import SelectConfig from "../../interface/select";
import { RootState } from "../../store";
import { useGetAllCityQuery } from "../../store/slice/City/cityApiSlice";
import {
  useGetTransactionQuery,
  useMeQuery,
  useUpdateProfileMutation,
  useUpgradeRoleMutation,
} from "../../store/slice/User/userApiSlice";
import { setUserStateAll } from "../../store/slice/User/userSlice";
import { setPageTx } from "../../store/slice/User/userTxFilSlice";
import { BalanceFormatter, DateFormatter } from "../../utils/utils";
import "./myprofile.scss";

function MyProfile() {
  const [cookies, , removeCookies] = useCookies(["token"]);
  const [isActive, setActive] = useState<string>("profile");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<number>(0);

  const userStore = useSelector((state: RootState) => state.userStore);
  const filter = useSelector((state: RootState) => state.filterTx);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data,
    isError: profileError,
    isLoading: profileLoading,
  } = useMeQuery(cookies.token);
  const { data: txData } = useGetTransactionQuery({token: cookies.token, filter: filter});
  const {
    data: cityData,
    isLoading: cityLoading,
    isError: cityError,
  } = useGetAllCityQuery();

  const [updateProfile, { isSuccess: updateSuccess, isError: updateError }] =
    useUpdateProfileMutation();

  const [upgradeRole, { isSuccess: upgradeSuccess, isError: upgradeError }] =
    useUpgradeRoleMutation();

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
        id: userStore.id,
      });
    } else {
      toast.error("Please fill the form to update", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleUpgrade = async () => {
    if (
      window.confirm(
        "Upgrading to Host will log you out of this session, do you want to continue ?"
      )
    ) {
      await upgradeRole(cookies.token);
    }
  };

  useEffect(() => {
    if (updateError) {
      toast.error("Failed to update profile", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (updateSuccess) {
      toast.success("Profile Updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (upgradeSuccess) {
      toast.success("Profile Upgraded ! Logging out");
      removeCookies("token");
      dispatch(setUserStateAll(0));
      navigate("/login");
    }

    if (upgradeError) {
      toast.error("Failed to Upgrade Profile");
    }
  }, [
    updateSuccess,
    updateError,
    upgradeSuccess,
    upgradeError,
    dispatch,
    navigate,
    removeCookies,
  ]);

  if (profileLoading) {
    return <Spinner />;
  }

  if (profileError) {
    return <div>Error fetching User Profile...</div>;
  }

  if (cityLoading) {
    return <Spinner />;
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
              <Button
                type="button"
                label="My Profile"
                handle={() => setActive("profile")}
              />
              <Button
                type="button"
                label="My Transaction"
                handle={() => setActive("transaction")}
              />
              <Button
                class={`${userStore.role_id === 3 ? "d-none" : ""}`}
                type="button"
                label="Upgrade to Host"
                handle={handleUpgrade}
              />
            </div>
          </div>
          <div className="container d-flex justify-content-center main-content">
            <form
              className="d-flex flex-column flex-md-row gap-5"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className={`${isActive === "profile" ? "" : "d-none"}`}>
                <Input
                  type="text"
                  label="Email"
                  name="email"
                  id="email"
                  disabled
                  defaultvalue={data?.data?.email}
                />
                <Input
                  type="text"
                  label="Full Name"
                  name="full-name"
                  id="full-name"
                  defaultvalue={data?.data?.full_name}
                  handle={(e) => handleName(e)}
                />
                <Input
                  type="text"
                  label="Address"
                  name="address"
                  id="address"
                  defaultvalue={data?.data?.address}
                  handle={(e) => handleAddress(e)}
                />
                <Select
                  name="city"
                  label="City"
                  config={options}
                  handle={(e) => handleCity(e)}
                  defaultvalue={data?.data?.city_id}
                />
                <Input
                  type="text"
                  label="Role"
                  name="role"
                  id="role"
                  disabled
                  defaultvalue={data?.data?.role.name}
                />
                <Button label="Update Profile" type="submit" />
              </div>
              <div className={`${isActive === "profile" ? "" : "d-none"}`}>
                <div>
                  <Input
                    type="number"
                    label="Wallet ID"
                    name="wallet"
                    id="wallet"
                    disabled
                    defaultvalue={data?.data?.wallet.id as number}
                  />
                  <Input
                    type="text"
                    label="Wallet Balance"
                    name="balance"
                    id="balance"
                    disabled
                    defaultvalue={BalanceFormatter(
                      data?.data?.wallet.balance as number
                    )}
                  />
                </div>
              </div>
            </form>
            <div
              className={`
                ${isActive === "transaction" ? "" : "d-none"}
              `}
            >
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Type</th>
                      <th scope="col">Balance</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  {txData?.data?.count === 0 && <NotFound />}
                  <tbody>
                    {txData?.data?.data?.map((tx) => (
                      <tr key={tx.id}>
                        <td>{tx.transaction_type.name}</td>
                        <td>{tx.balance}</td>
                        <td>{DateFormatter(tx.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-5">
                <Pagination
                  currentPage={txData?.data?.page as number}
                  totalPage={Math.ceil(
                    (txData?.data?.count as number) /
                      (txData?.data?.limit as number)
                  )}
                  setPage={(page) => dispatch(setPageTx(page))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
