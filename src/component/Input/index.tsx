import InputConfig from "../../interface/input";

function Input(props: InputConfig) {
  return (
    <div>
      <label className="form-label mt-3" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        type={props.type}
        min={props.min}
        max={props.max}
        id={props.id}
        className="form-control"
        defaultValue={props.defaultvalue}
        value={props.value}
        disabled={props.disabled}
        name={props.name}
        onChange={props.handle}
        required={props.required}
        minLength={props.minlength}
        accept={props.accept}
        multiple={props.multiple}
        autoFocus={props.auto}
      />
    </div>
  );
}

export default Input;
