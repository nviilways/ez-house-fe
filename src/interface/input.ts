interface InputConfig {
  label: string;
  type: string;
  name: string;
  value: string;
  min: string;
  max: string;
  handle: (args: unknown) => void;
}

export default InputConfig;
