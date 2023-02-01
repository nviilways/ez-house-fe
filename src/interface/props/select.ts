import SelectConfig from "../select"

interface SelectProps {
    name: string
    label: string
    defaultvalue?: string | number
    value?: string | number
    handle?: (args: any) => void
    config: SelectConfig[]
}

export default SelectProps