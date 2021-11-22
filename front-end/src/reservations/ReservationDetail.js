import CancelReservation from "./CancelReservation";


// Defines display of reservations and the interactive buttons
//'Edit', 'Seat' and 'Cancel' buttons show only if the reservation status is "booked"

function ReservationDetail({ reservations = [] }) {



  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr className="bg-dark text-white">
              <th scope="col">#</th>
              <th scope="col">Guest Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Party</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.reservation_id}>
                <th className="align-middle" scope="row">
                  {reservation.reservation_id}
                </th>
                <td className="align-middle">
                  {reservation.first_name} {reservation.last_name}
                </td>
                <td className="align-middle">{reservation.mobile_number}</td>
                <td className="align-middle">{reservation.reservation_date}</td>
                <td className="align-middle">{reservation.reservation_time}</td>
                <td className="align-middle">{reservation.people}</td>
                <td
                  className="align-middle"
                  data-reservation-id-status={reservation.reservation_id}
                >
                  {reservation.status}
                </td>

                {/* If 'reservation.status' is booked, display these buttons */}
                {reservation.status === "booked" ? (
                  <>
                    <td>
                      <a
                        className="btn btn-block btn-sm btn-dark mr-3"
                        href={`/reservations/${reservation.reservation_id}/seat`}
                      >
                        Seat
                      </a>
                      <a
                        className="btn btn-block btn-sm btn-dark mr-3"
                        href={`/reservations/${reservation.reservation_id}/edit`}
                      >
                        Edit
                      </a>
                      <CancelReservation reservation={reservation} />
                    </td>
                  </>
                ) : (
                  <>
                    <td></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ReservationDetail;
