import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

// Defines the reservation form

function ReservationForm({
    submitClickHandler,
    setFirstName,
    setLastName,
    setMobileNumber,
    setParty,
    setDate,
    setTime,
    firstName,
    lastName,
    mobileNumber,
    party,
    date,
    time,
    error
}) {
    
  const history = useHistory();
  const cancelClickHandler = () => history.goBack();

// change handlers
  const firstNameChangeHandler = (event) => setFirstName(event.target.value);
  const lastNameChangeHandler = (event) => setLastName(event.target.value);
  const mobileNumberChangeHandler = (event) =>
    setMobileNumber(event.target.value);
const partyChangeHandler = (event) => setParty(event.target.value);

  const dateChangeHandler = (event) => setDate(event.target.value);
  const timeChangeHandler = (event) => setTime(event.target.value);


  return (
    <>
    <ErrorAlert error={error} />
    <form onSubmit={submitClickHandler}>
    <div className="row mb-3">
          <div className="col-4 form-group">
            <label className="form-label" htmlFor="first_name">
              First Name
            </label>
            <input
              className="form-control"
              id="first_name"
              name="first_name"
              type="text"
              onChange={firstNameChangeHandler}
              required={true}
              value={firstName}
              
            />
            <small className="form-text text-muted"> Enter First Name </small>
          </div>
          <div className="col-4">
            <label className="form-label" htmlFor="last_name">
              Last Name
            </label>
            <input
              className="form-control"
              id="last_name"
              name="last_name"
              type="text"
              onChange={lastNameChangeHandler}
              required={true}
              value={lastName}
            />
            <small className="form-text text-muted"> Enter Last Name </small>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 form-group">
            <label className="form-label" htmlFor="mobile_number">
              Mobile Number
            </label>
            <input
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              type="text"
              onChange={mobileNumberChangeHandler}
              required={true}
              placeholder= "0000000000"
              value={mobileNumber}
            />
            <small className="form-text text-muted"> Enter Mobile Number (ex: 0000000000) </small>
          </div>
          <div className="col-4 form-group">
            <label className="form-label" htmlFor="mobile_number">
              Party Size
            </label>
            <input
              className="form-control"
              id="people"
              name="people"
              type="number"
              onChange={partyChangeHandler}
              required={true}
              value={party}
            />
            <small className="form-text text-muted"> Enter Party Size </small>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4 form-group"> 
          <label>
            Reservation Date
          </label>
          <input
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            type="text"
            onChange={dateChangeHandler}
            required={true}
            placeholder='DDMMYYYY'
            value={date}
          />
          <small className="form-text text-muted"> Enter Reservation Date (ex: DDMMYYYY) </small>
          <small className="form-text text-muted">(Closed on Tuesdays) </small>

          </div>
          <div className="col-4 form-group"> 
          <label>
            Reservation Time
          </label>
          <input
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            type="time"
            onChange={timeChangeHandler}
            required={true}
            placeholder='reservation time'
            value={time}
          />
          <small className="form-text text-muted"> Enter Reservation Time </small>
          </div> 
        </div>
        <button type="submit" className="btn btn-dark mx-3"> Submit</button>
        <button type="button" className="btn btn-dark" onClick={cancelClickHandler}> Cancel </button>
    </form>
</>
);
}

export default ReservationForm


