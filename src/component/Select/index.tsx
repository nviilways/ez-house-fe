import SelectProps from "../../interface/props/select";

function Select(props: SelectProps) {
  return (
    <div>
      <label className="form-label mt-3">{props.label}</label>
      <select
        className="form-select"
        name={props.name}
        value={props.value}
        onChange={props.handle}
      >
        {props.config.map((select) => (
          <option key={select.value} value={select.value}>
            {select.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
