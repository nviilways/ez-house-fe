import InputConfig from "../../interface/input";

function Textarea(props: Omit<InputConfig, "type">) {
  return (
    <div>
      <label className="form-label mt-3" htmlFor={props.id}>{props.label}</label>
      <textarea
        id={props.id}
        className="form-control"
        defaultValue={props.defaultvalue}
        value={props.value}
        disabled = {props.disabled}
        name={props.name}
        onChange={props.handle}
        required = {props.required}
        minLength= {props.minlength}
      />
    </div>
  );
}

export default Textarea;
