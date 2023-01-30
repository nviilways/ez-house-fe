import InputConfig from "../../interface/input";

function Input(props: InputConfig) {
  return (
    <div>
      <label className="form-label" htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        min={props.min}
        max={props.max}
        id={props.id}
        className="form-control"
        value={props.value}
        name={props.name}
        onChange={props.handle}
      />
    </div>
  );
}

export default Input;
