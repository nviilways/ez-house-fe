import { Link } from "react-router-dom";
import HouseProps from "../../interface/props/house";

function HouseCard(props: HouseProps) {
  return (
    <Link to={`/house/${props.house.id}`} className="col-3">
      <div className="card">
        <img
          src={
            props.house.house_photos !== undefined
              ? props.house.house_photos[0].photo_url
              : ""
          }
          className="card-img-top"
          alt={props.house.name + "-thumbnail"}
        />
        <div className="card-body">
          <h5 className="card-title">{props.house.name}</h5>
          <p className="card-text">{props.house.city.name}</p>
          <p className="card-subtitle">{props.house.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default HouseCard;
