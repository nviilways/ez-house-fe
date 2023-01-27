import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import HouseCard from "../../component/HouseCard"
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
                <HouseCard key={house.id} house={house} />
            ))}
        </div>
     </div>   
    )
}

export default HouseList