import { useState } from "react";
import { useHistory } from "react-router";
import { listReservations } from "../utils/api";
import ReservationDetail from "../reservations/ReservationDetail";

// Allows user to search reservations by mobile number

function SearchReservation() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);

  const history = useHistory();
  const cancelClickHandler = () => history.goBack();

  // change handler
  const mobileNumberChangeHandler = (event) =>
    setMobileNumber(event.target.value);
  async function findClickHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();

    const data = await listReservations(
      { mobile_number: mobileNumber },
      abortController.signal
    );
    setReservations(data);

    return () => abortController.abort();
  }

  return (
      <main>
      <div className="headingBar d-md-flex my-3 p-2">
          <h1>Lookup a Reservation</h1>
      </div>
      <h4>Search for a reservation by mobile number:</h4>
        <form onSubmit={findClickHandler} className="form-group">
          <div className="row mb-3">
            <div className="col-4 form-group">
              <input
                name="mobile_number"
                type="text"
                className="form-control"
                id="inputMobileNumber"
                required={true}
                onChange={mobileNumberChangeHandler}
              ></input>
              <small className="form-text text-muted"> Enter a customer's phone number </small>
            </div>
          </div>
          
          <button
            type="submit"
            className="btn btn-dark"
          >
            Find 
          </button>
          <button
            type="button"
            className="btn btn-dark mx-3"
            onClick={cancelClickHandler}
          >
            Cancel
          </button>
        </form>

        {reservations.length < 1 ? (
        <div className="d-md-flex mb-3">
          <h4 className="my-3">(No reservations found.)</h4>
        </div>
      ) : (
        <>
          <div className="d-md-flex mb-3">
            <h4 className="my-3">{`Reservations for ${mobileNumber}`}</h4>
          </div>
          <ReservationDetail reservations={reservations} />
        </>
      )}
      </main>
    )
}

export default SearchReservation