import { Link } from "react-router-dom";
import HouseProps from "../../interface/props/house";
import "./card.scss"
import placeholderImg from "../../placeholder.png"

function HouseCard(props: HouseProps) {

  const balance = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <Link to={`/house/${props.house.id}`} className="col">
      <div className="card mb-3">
        <img
          src={
            props.house.house_photos !== undefined
              ? props.house.house_photos[0].photo_url
              : placeholderImg
          }
          className="card-img-top img img-fluid"
          alt={props.house.name + "-thumbnail"}
        />
        <div className="card-body">
          <h5 className="card-title">{props.house.name}</h5>
          <p className="card-text">{props.house.city.name}</p>
          <p className="card-subtitle">{balance(props.house.price)} night</p>
        </div>
      </div>
    </Link>
  );
}

export default HouseCard;
