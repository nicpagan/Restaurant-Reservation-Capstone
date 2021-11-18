import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { listTables, updateSeat } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationSeat() {
  const history = useHistory();
  const cancelClickHandler = () => history.goBack();

  const {reservation_id} = useParams();
  const [tables, setTables] = useState([]);
  const [tableFormData, setTableFormData] = useState({});
  const [error, setError] = useState(null);

  // fetches table and error data
  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    listTables()
      .then(setTables)
      .catch(setError);

    return () => abortController.abort();
  }, []);  

  // submit click handler
  const submitClickHandler = (event) => {
    event.preventDefault();
    const tableObj = JSON.parse(tableFormData);
    updateSeat(tableObj.table_id, reservation_id)
    .then((response) => {
        console.log('RES', response)
      const newTables = tables.map((table) => {
        return table.table_id === response.table_id ? response : table
      })
      setTables(newTables)
      history.push('/dashboard')
    })
    
    .catch(setError);
    }

// change handlers
const tableFormChangeHandler = (event) => setTableFormData(event.target.value)


  // if 'tables' is true, then display the following:  
  if (tables) {
    return (
      <> 
        <div className="headingBar d-md-flex my-3 p-2">
          <h1> Seat The Current Reservation </h1>
        </div>
        
        <ErrorAlert error={error} />
        <div className="mb-3">
          <h3> Current Reservation: {reservation_id} </h3>
        </div>
        
        <form className="form-group" onSubmit={submitClickHandler}>
          <div className="col mb-3">
            <label className="form-label" htmlFor="table_id"> Select Table </label>
              <select
                className="form-control"
                name="table_id"
                id="table_id"
                onChange={tableFormChangeHandler}
              >
                <option value=""> Table Name - Capacity </option>
                {tables.map((table) => (
                  <option 
                    key={table.table_id}
                    value={JSON.stringify(table)}
                    required={true}
                    >
                      {table.table_name} - {table.capacity}
                    </option>
                ))} 
              </select>
          </div>
          <button className="btn btn-dark mx-3" type="submit"> Submit </button>
          <button type="button" onClick={cancelClickHandler} className="btn btn-dark"> Cancel </button>
        </form>
      </>
    );
  } else {
    return (
      <div className="headingBar d-md-flex my-3 p-2">
        <h1> No open tables to seat </h1>
      </div>
    )
  }
}


export default ReservationSeat;








// import { useEffect, useState } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import { readReservation, listTables, updateTable } from "../utils/api";
// import ErrorAlert from "../layout/ErrorAlert";

// // Allows existing reservation to be assigned a table using the 'seat' button.

// function SeatReservation() {
//   const { reservation_id } = useParams();
//   const [reservation, setReservation] = useState({});
//   const [tables, setTables] = useState([]);
//   const [tableId, setTableId] = useState(0);
//   const [error, setError] = useState("");
//   const history = useHistory();

//   // submit handler
//   // upon submission, assign table to reservation
//   const submitHandler = async (event) => {
//     event.preventDefault();

//     const abortController = new AbortController();
//     const updatedTable = {
//       table_id: tableId,
//       reservation_id: reservation.reservation_id,
//     };
//     try {
//       await updateTable(updatedTable, abortController.signal);
//     } catch (error) {
//       setError(error);
//       return;
//     }
//     history.push("/dashboard");
//     return () => abortController.abort();
//   };


//   // fetches list of all tables
//   useEffect(() => {
//     const abortController = new AbortController();

//     async function loadTables() {
//       const data = await listTables(abortController.signal);
//       setTables(data);
//     }

//     loadTables();

//     return () => abortController.abort();
//   }, []);

//   // fetches reservation based off of 'reservation_id'
//   useEffect(() => {
//     const abortController = new AbortController();

//     async function loadReservation() {
//       const data = await readReservation(
//         reservation_id,
//         abortController.signal
//       );
//       setReservation(data);
//     }

//     loadReservation();

//     return () => abortController.abort();
//   }, [reservation_id]);

  
//   // filter tables without an assigned reservation
//   const unassignedTables = tables.filter((table) => !table.reservation_id);

//   return (
//     <div>
//       <h1>Seat The Current Reservation</h1>
//       <div className="d-md-flex mb-3">
//         <h4>Assign Table Number to Reservation</h4>
//       </div>
//       {error && <ErrorAlert error={error} />}
//       <hr></hr>
//       <form className="row g-3" onSubmit={submitHandler}>
//         <div className="col-md-6">
//           <select
//             name="table_id"
//             className="form-select"
//             onChange={(e) => setTableId(e.target.value)}
//           >
//             <option defaultValue> -- Select Table -- </option>
//             {unassignedTables.map((table) =>
//               table.capacity >= reservation.people ? (
//                 <option
//                   value={table.table_id}
//                   key={table.table_id}
//                 >{`${table.table_name} - ${table.capacity}`}</option>
//               ) : (
//                 <option
//                   value={table.table_id}
//                   key={table.table_id}
//                   disabled
//                 >{`${table.table_name} - ${table.capacity}`}</option>
//               )
//             )}
//           </select>
//         </div>
//         <div className="col-md-6">
//           <button className="btn btn-primary" type="submit">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default SeatReservation