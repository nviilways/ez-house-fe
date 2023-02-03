import HouseCard from "../../component/HouseCard"
import HouseFilter from "../../component/HouseFilter"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store";
import { useGetHouseByVacancyQuery } from "../../store/slice/House/houseApiSlice"
import Pagination from "../../component/Pagination";
import Spinner from "../../component/Spinner";
import Select from "../../component/Select";
import SelectConfig from "../../interface/select";
import { setLimit, setPage } from "../../store/slice/House/houseFilterSlice";

function HouseList() {

  const filter = useSelector(
    (state: RootState) => state.filterHouse
  );

    const { data, isLoading, isError } = useGetHouseByVacancyQuery(filter)
    const dispatch = useDispatch()

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

    const limitConfig: SelectConfig[] = [
        {label: '1', value: 1},
        {label: '5', value: 5},
        {label: '10', value: 10},
        {label: '20', value: 20},
    ]

    return (
     <div className="container mt-5">
        <HouseFilter />
        <div className="d-flex justify-content-start mb-4">
            <Select label="Items per page" name="limit" config={limitConfig} value={filter.limit} handle={(e) => dispatch(setLimit(e.target.value))} />
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            {data?.data?.data?.map((house) => (
                <HouseCard key={house.id} house={house} />
            ))}
        </div>
        <div className="d-flex justify-content-center align-items-center mt-5">
            <Pagination currentPage={data?.data?.page as number} totalPage={Math.ceil(data?.data?.count as number / (data?.data?.limit as number))} setPage={(page) => dispatch(setPage(page))} />
        </div>
     </div>   
    )
}

export default HouseList