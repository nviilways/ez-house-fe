export interface ButtonProps {
    label: string
    type: "button" | "submit" | "reset" | undefined
    class?: string
    disabled?: boolean
    handle?: (args: any) => void
}