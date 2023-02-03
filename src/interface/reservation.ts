import IHouse from "./house"
import IPickup from "./pickup"
import IProfile from "./profile"

interface IReservation {
    id: number
    house: IHouse
    user: IProfile
    check_in_date: Date
    check_out_date: Date
    total_price: number
    booking_code: string
    pickup: IPickup
}

export default IReservation