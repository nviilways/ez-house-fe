import HouseCard from "../../component/HouseCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  useGetHouseByHostQuery,
} from "../../store/slice/House/houseApiSlice";
import Pagination from "../../component/Pagination";
import Spinner from "../../component/Spinner";
import Select from "../../component/Select";
import SelectConfig from "../../interface/select";
import { useCookies } from "react-cookie";
import HostFilter from "../../component/HostFilter";
import { useState } from "react";
import CreateIcon from "../../assets/icon/Create";
import CreateHouseForm from "../../component/CreateHouseForm";
import { setLimitHost, setPageHost } from "../../store/slice/House/houseHostSlice";
import "./houselist.scss"

function HouseList() {
  const filter = useSelector((state: RootState) => state.filterHost);
  const [cookies] = useCookies(["token"]);

  const [show, setShow] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetHouseByHostQuery({
    token: cookies.token,
    filter: filter,
  });

  const dispatch = useDispatch();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div>
        <h1>Error fetching house data</h1>
      </div>
    );
  }

  const limitConfig: SelectConfig[] = [
    { label: "1", value: 1 },
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "20", value: 20 },
  ];

  return (
    <div className="container house-list main-layout mt-5">
      <HostFilter />
      <div className="d-flex justify-content-start mb-4">
        <Select
          label="Items per page"
          name="limit"
          config={limitConfig}
          value={filter.limit}
          handle={(e) => dispatch(setLimitHost(e.target.value))}
        />
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        {data?.data?.data?.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Pagination
          currentPage={data?.data?.page as number}
          totalPage={Math.ceil(
            (data?.data?.count as number) / (data?.data?.limit as number)
          )}
          setPage={(page) => dispatch(setPageHost(page))}
        />
      </div>
      <hr />
      <div className="d-flex flex-column justify-content-start">
        <div>
          <p>Create New House</p>
          <button className="btn" onClick={() => setShow(!show)}><CreateIcon class="mini"/></button>
        </div>
      </div>
      {show && <CreateHouseForm />}
    </div>
  );
}

export default HouseList;