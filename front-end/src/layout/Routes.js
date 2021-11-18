import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { today } from "../utils/date-time";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import SeatReservation from "../reservations/SeatReservation";
import NewReservation from "../reservations/NewReservation";
import NewTable from "../tables/NewTable";
import SearchReservation from "../search/SearchReservation";
import EditReservation from "../reservations/EditReservation";



// routes of the application

function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path={`/dashboard`}>
        <Dashboard date={today()} />
      </Route>
      <Route exact path="/reservations/new">
        <NewReservation />
      </Route>
      <Route exact path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route exact path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route exact path="/tables/new">
        <NewTable />
      </Route>
      <Route exact path="/search">
        <SearchReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;