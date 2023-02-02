import { ButtonProps } from "../../interface/props/button"

function Button(props: ButtonProps) {

    return(
        <button className={`form-control mt-3 btn btn-primary ${props.class}`} type={props.type} disabled={props.disabled} onClick={props.handle} >
            {props.label}
        </button>
    )
}

export default Button