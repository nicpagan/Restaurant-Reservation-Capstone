import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationDetail from "../reservations/ReservationDetail";
import TableDetail from "../tables/TableDetail";
import { previous, next, today } from "../utils/date-time";
import { Link } from "react-router-dom";

// Dashboard page
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const [tables, setTables] = useState([]);
  const query = useQuery();
  const dateQuery = query.get("date");

  if (dateQuery) date = dateQuery;

    // formats the date variable to be human readable
    const dateObj = new Date(`${date} PDT`);
    const dateString = dateObj.toDateString();

    console.log(dateString)

  // Get request of reservations by date
  useEffect(() => {
    const abortController = new AbortController();

    async function loadReservations() {
      setReservationsError(null);
      try {
        const data = await listReservations({ date }, abortController.signal);
        setReservations(data);
      } catch (error) {
        setReservationsError(error);
      }
    }
    loadReservations();
    return () => abortController.abort();
  }, [date]);

  // loads all tables
  useEffect(() => {
    const abortController = new AbortController();

    async function loadTables() {
      setReservationsError(null);
      try {
        const data = await listTables(abortController.signal);
        setTables(data);
      } catch (error) {
        setTablesError(error);
      }
    }

    loadTables();

    return () => abortController.abort();
  }, []);

  // filters `reservations` with statuses "booked" and "seated"
  const unfinishedReservations = reservations.filter(
    (reservation) => reservation.status !== "finished"
  );

//   return (
//     <main>
//       <h1 className="my-3">Dashboard</h1>
//       <div className="d-md-flex mb-3">
//         <h4 className="mb-0">
//           {reservations.length < 1 && "No "}
//           {`Reservations for`}&nbsp;
//         </h4>
//         <h4 className="fw-bold">{date}</h4>
//       </div>
//       <ErrorAlert error={reservationsError} />
//       <Buttons date={date} />
//       <ReservationDetail reservations={unfinishedReservations} />
//       <br></br>
//       <hr></hr>
//       <div className="d-md-flex mb-3">
//         <h4 className="mb-0">List of Tables</h4>
//       </div>
//       <ErrorAlert error={tablesError} />
//       <TableDetail tables={tables} />
//     </main>
//   );


  return (
    <main>
      <div className="headingBar d-md-flex my-3 p-2">
        <h1>Dashboard</h1>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="d-flex justify-content-center my-3">
        <h4 className="mb-0">Reservations for {dateString}</h4>
      </div>  
      <div className="d-flex justify-content-center mt-3">
        <Link to={`/dashboard?date=${previous(date)}`}>
          <button className="btn btn-dark" type="button">
            <span className="oi oi-arrow-thick-left" />
            &nbsp;Previous Day
          </button>
        </Link>
        <Link to={`/dashboard?date=${today()}`}>
          <button className="btn btn-dark mx-3" type="button">Today</button>
        </Link>
        <Link to={`/dashboard?date=${next(date)}`}>
          <button className="btn btn-dark" type="button">
            Next Day&nbsp;
            <span className="oi oi-arrow-thick-right" />
          </button>
        </Link>
      </div>

      <div className="d-md-flex mb-3 frame">
      <div className="mb-3"> 
        <div className="headingBar my-3 p-2">
            <h2>Reservations</h2>
        </div>
        <ReservationDetail reservations={unfinishedReservations} />
        </div>
        <div className="mb-3 mx-3"> 
          <div className="headingBar my-3 p-2">
              <h2>Tables</h2>
          </div>
            <ErrorAlert error={tablesError} />
            <TableDetail tables={tables} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;