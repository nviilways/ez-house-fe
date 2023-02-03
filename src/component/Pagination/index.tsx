import ChevronLeft, { ChevronRight } from "../../assets/icon/Chevron";
import PaginationProps from "../../interface/props/pagination";

function Pagination(props: PaginationProps) {
  return (
    <div>
      <button
        className={`btn ${props.currentPage - 1 < 1 ? 'invisible' : ''}`}
        onClick={() => props.setPage(props.currentPage - 1)}
      >
        <ChevronLeft class="mini" />
      </button>
      <button className={`btn ${props.totalPage <= 1 ? 'd-none' : ''}`}>
        {props.currentPage}
      </button>
      <button
        className={`btn ${props.currentPage + 1 > props.totalPage ? 'invisible' : ''}`}
        onClick={() => props.setPage(props.currentPage + 1)}
      >
        <ChevronRight class="mini" />
      </button>

    </div>
  );
}

export default Pagination;
