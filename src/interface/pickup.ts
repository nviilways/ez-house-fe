interface IPickup {
    id: number
    user_id: number
    reservation_id: number
    pickup_status_id: number
    pickup_status: IPickupStatus
}

interface IPickupStatus {
    id: number
    status: string
}

export default IPickup