import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import IHouse from "../../interface/house"
import StandardResponse from "../../interface/response"

function HouseList() {
    const [name, setName] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [sortCol, setSortCol] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>('')
    const [checkIn, setCheckIn] = useState<Date>()
    const [checkOut, setCheckOut] = useState<Date>()
    const [data, setData] = useState<StandardResponse<IHouse[]>>()

    useEffect(() => {
     fetch(`${process.env.REACT_APP_URL}/houses`, {
            method: "GET",
        }).then((res) => {
            if(!res.ok) {
                alert('error fetch')
            }

            return res.json()
        }).then((data: StandardResponse<IHouse[]>) => {
            setData(data)
        })
    }, [name, city, sortCol, sortBy, checkIn, checkOut])

    return (
     <div className="container mt-5">
        <div className="row">
            {data?.data?.map((house) => (
                <Link to={`/house/${house.id}`} key={house.id} className="col-3">
                    <div className="card">
                        <img src={house.house_photos !== undefined ? house.house_photos[0].photo_url : ""} className="card-img-top" alt={house.name + "-thumbnail"} />
                        <div className="card-body">
                            <h5 className="card-title">{house.name}</h5>
                            <p className="card-text">{house.city.name}</p>
                            <p className="card-subtitle">{house.price}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
     </div>   
    )
}

export default HouseList