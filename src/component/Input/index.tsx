import InputConfig from "../../interface/input";

function Input(props: InputConfig) {
  return (
    <div>
      <label className="form-label">{props.label}</label>
      <input
        type={props.type}
        min={props.min}
        max={props.max}
        className="form-control"
        value={props.value}
        name={props.name}
        onChange={props.handle}
      />
    </div>
  );
}

export default Input;
