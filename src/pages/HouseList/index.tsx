import HouseCard from "../../component/HouseCard"
import HouseFilter from "../../component/HouseFilter"
import { useSelector } from "react-redux"
import { RootState } from "../../store";
import { useGetHouseByVacancyQuery } from "../../store/slice/House/houseApiSlice"
import Pagination from "../../component/Pagination";
import Spinner from "../../component/Spinner";

function HouseList() {

  const filter = useSelector(
    (state: RootState) => state.filterHouse
  );

    const { data, isLoading, isError } = useGetHouseByVacancyQuery(filter)

    if(isLoading) {
        return (
            <Spinner />
        )
    }

    if(isError) {
        return (
            <div>
                <h1>Error fetching house data</h1>
            </div>
        )
    }

    return (
     <div className="container mt-5">
        <HouseFilter />
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            {data?.data?.data?.map((house) => (
                <HouseCard key={house.id} house={house} />
            ))}
        </div>
        <div className="d-flex justify-content-center align-items-center mt-5">
            <Pagination currentPage={filter.page} totalPage={Math.ceil(data?.data?.count as number / filter.limit)} />
        </div>
     </div>   
    )
}

export default HouseList