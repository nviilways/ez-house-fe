import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setIn, setOut } from "../../store/slice/House/houseFilterSlice";

function HouseFilter() {
  const today = new Date();
  const tommorow = new Date(today);
  tommorow.setDate(today.getDate() + 1);

  const { dateIn, dateOut } = useSelector(
    (state: RootState) => state.filterHouse
  );
  const dispatch = useDispatch();

  return (
    <div className="d-flex mb-5 gap-5">
      <div>
        <label className="form-label">Check In</label>
        <input
          type="date"
          min={today.toISOString().split("T")[0]}
          className="form-control"
          value={dateIn}
          name="indate"
          onChange={(e) => dispatch(setIn(e.target.value))}
        />
      </div>
      <div>
        <label className="form-label">Check Out</label>
        <input
          type="date"
          min={tommorow.toISOString().split("T")[0]}
          className="form-control"
          value={dateOut}
          name="outdate"
          onChange={(e) => dispatch(setOut(e.target.value))}
        />
      </div>
    </div>
  );
}

export default HouseFilter;
