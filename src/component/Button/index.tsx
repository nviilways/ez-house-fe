import { ButtonProps } from "../../interface/props/button"

function Button(props: ButtonProps) {

    return(
        <button className="form-control mt-3 btn btn-primary" type={props.type} >
            {props.label}
        </button>
    )
}

export default Button