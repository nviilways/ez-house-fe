import { useDispatch } from "react-redux";
import ChevronLeft, { ChevronRight } from "../../assets/icon/Chevron";
import PaginationProps from "../../interface/props/pagination";
import { setPage } from "../../store/slice/House/houseFilterSlice";

function Pagination(props: PaginationProps) {
  const dispatch = useDispatch();
  console.log(props.totalPage)

  return (
    <div>
      <button
        className={`btn ${props.currentPage - 1 < 1 ? 'd-none' : ''}`}
        onClick={() => dispatch(setPage(props.currentPage - 1))}
      >
        <ChevronLeft class="mini" />
      </button>
      <button className={`btn ${props.totalPage === 1 ? 'd-none' : ''}`}>
        {props.currentPage}
      </button>
      <button
        className={`btn ${props.currentPage + 1 > props.totalPage ? 'd-none' : ''}`}
        onClick={() => dispatch(setPage(props.currentPage + 1))}
      >
        <ChevronRight class="mini" />
      </button>

    </div>
  );
}

export default Pagination;
