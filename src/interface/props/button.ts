export interface ButtonProps {
    label: string
    type: "button" | "submit" | "reset" | undefined
    class?: string
    handle?: (args: any) => void
}