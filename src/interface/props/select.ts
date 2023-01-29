import SelectConfig from "../select"

interface SelectProps {
    name: string
    label: string
    value: string | number
    handle?: (args: any) => void
    config: SelectConfig[]
}

export default SelectProps