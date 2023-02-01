import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReservationProps } from "../../interface/props/reservationcard";
import { RootState } from "../../store";
import { BalanceFormatter } from "../../utils/utils";
import Input from "../Input";

function ReservationCard(props: ReservationProps) {
  const { dateIn, dateOut } = useSelector(
    (state: RootState) => state.filterHouse
  );

    const pricing = () => {
        const formattedDateIn = new Date(dateIn)
        const formattedDateOut = new Date(dateOut)
        const dayRange = formattedDateOut.getDate() - formattedDateIn.getDate()
        
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
          disabled
          defaultvalue={dateIn}
        />
        <Input
          type="date"
          label="Date Out"
          name="dateout"
          id="dateout"
          disabled
          defaultvalue={dateOut}
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
