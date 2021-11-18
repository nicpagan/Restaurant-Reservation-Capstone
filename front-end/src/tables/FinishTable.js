import { useHistory } from "react-router-dom";
import { deleteTableReservation } from "../utils/api";

// Defines the 'finish' table button function

function FinishTable({ table_id }) {
  const history = useHistory();

  // click handler
  async function finishClickHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();

    // after clicking the 'Finish' button, user is prompted with dialog
    const finishTable = window.confirm(
      "\nIs this table ready to seat new guests? This cannot be undone."
    );

    if (!finishTable) return history.push("/dashboard"); // goes back to dashboard after 'cancel' is clicked

    // deletes table reservation
    try {
      await deleteTableReservation(table_id, abortController.signal);
    } catch (error) {
      console.log(error.message);
    }

    window.location.reload();
    
    return () => abortController.abort();
  }

  return (
    <button
      type="button"
      className="btn btn-dark"
      data-table-id-finish={table_id}
      onClick={(e) => finishClickHandler(e)}
    >
      Finish
    </button>
  );
}

export default FinishTable