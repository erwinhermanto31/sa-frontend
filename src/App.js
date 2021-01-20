import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddShift from "./components/add-shift.component";
import Shift from "./components/shift.component";
import ShiftsList from "./components/shift-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/shifts"} className="navbar-brand">
            StaffAny
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/shifts"} className="nav-link">
                Shifts
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/shifts"]} component={ShiftsList} />
            <Route exact path="/add" component={AddShift} />
            <Route path="/shifts/:id" component={Shift} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;