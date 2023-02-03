import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReservationProps } from "../../interface/props/reservationcard";
import { RootState } from "../../store";
import { setIn, setOut } from "../../store/slice/House/houseFilterSlice";
import { BalanceFormatter } from "../../utils/utils";
import Input from "../Input";

function ReservationCard(props: ReservationProps) {
  const today = new Date();
  const tommorow = new Date(today);
  tommorow.setDate(today.getDate() + 1);

  const dispatch = useDispatch();

  const { dateIn, dateOut } = useSelector(
    (state: RootState) => state.filterHouse
  );

    const pricing = () => {
        const formattedDateIn = new Date(dateIn)
        const formattedDateOut = new Date(dateOut)
        const dayRange = (formattedDateOut.getTime() - formattedDateIn.getTime()) / (1000 * 60 * 60 * 24)
        
        return dayRange * props.price
    }

  return (
    <div className="card">
      <div className="card-header">Reservation</div>
      <div className="card-body">
        <Input
          type="date"
          label="Date In"
          name="datein"
          id="datein"
          min={today.toISOString().split("T")[0]}
          defaultvalue={dateIn}
          handle={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setIn(e.target.value))}
        />
        <Input
          type="date"
          label="Date Out"
          name="dateout"
          id="dateout"
          min={tommorow.toISOString().split("T")[0]}
          defaultvalue={dateOut}
          handle={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setOut(e.target.value))}
        />
        <p className="card-text pt-5">
          Total price: {BalanceFormatter(pricing())}
        </p>
        <Link to="reservation" className="btn mt-5 btn-primary">
          Reserve Now
        </Link>
      </div>
    </div>
  );
}

export default ReservationCard;
