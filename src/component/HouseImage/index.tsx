import { ImageProps } from "../../interface/props/image"
import "./image.scss"

function HouseImage(props: ImageProps) {

    return(
        <div className={`d-flex flex-column flex-lg-row justify-content-${props.photos?.length as number >= 4 ? "between" : "start"}`}>
            <div>
                <img className="medium-image me-2" src={props.photos?.[0].photo_url} alt={props.photos?.[0].photo_url} />
            </div>
            <div className="row row-cols-auto">
                {props.photos?.slice(1).map((photo) => (
                    <div key={photo.id} className="col right-col" >
                        <img className="small-image" src={photo.photo_url} alt={photo.photo_url} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HouseImage