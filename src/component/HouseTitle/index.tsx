import IconLocation from "../../assets/icon/Location";
import HouseProps from "../../interface/props/house";

function HouseTitle(props: HouseProps) {
  return (
    <div className="d-flex flex-column">
      <div className="title">
        <h1 className="text-capitalize fs-2">{props.house?.name}</h1>
      </div>
      <div className="d-flex ">
        <IconLocation class="mini"/>
        <p className="fw-light ms-2">{props.house?.city.name}</p>
      </div>
    </div>
  );
}

export default HouseTitle;
