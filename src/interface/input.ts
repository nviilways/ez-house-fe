interface InputConfig {
  label: string;
  type: string;
  name: string;
  id: string;
  value?: string;
  defaultvalue?: string;
  disabled?: boolean
  min?: string;
  max?: string;
  handle?: (args: any) => void;
}

export interface UpdateProfileInput {
  full_name: string
  address: string
  city_id: number
}

export interface CreateReservationInput {
  check_in_date: string
  check_out_date: string
  house_id: number
}

export default InputConfig;
