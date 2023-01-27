import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setIn, setOut } from "../../store/slice/House/houseFilterSlice";
import Input from "../Input";

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
      <Input
        label="Check In"
        type="date"
        name="indate"
        min={today.toISOString().split("T")[0]}
        handle={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setIn(e.target.value))
        }
        value={dateIn}
      />
      <Input
        label="Check In"
        type="date"
        name="indate"
        min={tommorow.toISOString().split("T")[0]}
        handle={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setOut(e.target.value))
        }
        value={dateOut}
      />
    </div>
  );
}

export default HouseFilter;
