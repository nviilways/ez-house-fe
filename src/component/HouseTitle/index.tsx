import IconLocation from "../../assets/icon/Location";
import PersonIcon from "../../assets/icon/Person";
import HouseProps from "../../interface/props/house";

function HouseTitle(props: HouseProps) {
  return (
    <div className="d-flex flex-column">
      <div className="title">
        <h1 className="text-capitalize fs-2">{props.house?.name}</h1>
      </div>
      <div className="d-flex ">
        <IconLocation class="mini" />
        <p className="fw-light ms-2">{props.house.address}, {props.house?.city.name}</p>
      </div>
      <div className="d-flex ">
        <PersonIcon class="mini" />
        <p className="fw-light ms-2">{props.house.max_guest} Person(s)</p>
      </div>
    </div>
  );
}

export default HouseTitle;
