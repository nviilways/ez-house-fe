export interface ButtonProps {
    label: string
    type: "button" | "submit" | "reset" | undefined
    handle?: (args: any) => void
}