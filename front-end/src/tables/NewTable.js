import { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

// Creates a new table

function NewTable() {
    // cancel click handler
    const cancelClickHandler = () => history.goBack();

  const history = useHistory();
  const [tableName, setTableName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [error, setError] = useState("");

  //change handlers
  const tableNameChangeHandler = (event) => setTableName(event.target.value);
  const capacityChangeHandler = (event) => setCapacity(event.target.value);

  // submit handler
  // upon clicking submit, a new table is
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const newTable = {
      table_name: tableName,
      capacity: Number(capacity),
    };

    try {
      await createTable(newTable, abortController.signal);
    } catch (error) {
      setError(error);
      return;
    }

    history.push(`/dashboard`);
    return () => abortController.abort();
  }

  return (
        <main>
        <div className="headingBar d-md-flex my-3 p-2">
            <h1>New Table</h1>
        </div>
          <ErrorAlert error={error} />
          <form onSubmit={handleSubmit} className="form-group">
            <div className="row mb-3">
              <div className="col-4 form-group">
                <label className="form-label" htmlFor="table_name"> Table Name </label>
                <input
                  className="form-control"
                  name="table_name"
                  id="table_name"
                  required={true}
                  type="text"
                  onChange={tableNameChangeHandler}
                  value={tableName}
    
                />
                <small className="form-text text-muted"> Enter Table Name </small>
              </div>
              <div className="col-4 form-group">
                <label className="form-label" htmlFor="capacity"> Table Capacity </label>
                <input
                  className="form-control"
                  name="capacity"
                  id="capacity"
                  required={true}
                  type="text"
                  onChange={capacityChangeHandler}
                  value={capacity}
    
                />
                <small className="form-text text-muted"> Enter Table Capacity </small>
              </div>
            </div>
            
            <button
              type="submit"
              className="btn btn-dark"
            >
              Submit 
            </button>
            <button
              type="button"
              className="btn btn-dark mx-3"
              onClick={cancelClickHandler}
            >
              Cancel
            </button>
          </form>
        </main>
      );
}

export default NewTable