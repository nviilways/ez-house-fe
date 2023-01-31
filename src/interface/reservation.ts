import IHouse from "./house"

interface IReservation {
    id: number
    house: IHouse
    check_in_date: Date
    check_out_date: Date
    total_price: number
    booking_code: string
}

export default IReservation