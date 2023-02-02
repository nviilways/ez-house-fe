import ICity from "./city"
import IPhoto from "./photo"

interface IHouse {
    id: number
    name: string
    price: number
    description: string
    address: string
    city: ICity
    max_guest: number
    house_photos: IPhoto[] | undefined
}

export default IHouse
