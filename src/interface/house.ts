import ICity from "./city"
import IPhoto from "./photo"

interface IHouse {
    id: number
    name: string
    price: number
    description: string
    city: ICity
    max_guest: number
    house_photos: IPhoto[]
}

export default IHouse