import ReservationTable from "../../component/ReservationTable"

function Reservation() {

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Your Booking History</h2>
            <ReservationTable />
        </div>
    )
}

export default Reservation