interface InputConfig {
  label: string;
  type: string;
  name: string;
  id: string;
  value?: string;
  min?: string;
  max?: string;
  handle?: (args: any) => void;
}

export default InputConfig;
