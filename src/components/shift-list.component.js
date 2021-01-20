import React, { Component } from "react";
import ShiftDataService from "../services/shift.service";
import { Link } from "react-router-dom";

export default class ShiftsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveShifts = this.retrieveShifts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveShift = this.setActiveShift.bind(this);
    this.removeAllShifts = this.removeAllShifts.bind(this);

    this.state = {
      shifts: [],
      currentShift: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveShifts();
  }

  retrieveShifts() {
    ShiftDataService.getAll()
      .then(response => {
        this.setState({
          shifts: response.data.data.shift
        });
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveShifts();
    this.setState({
      currentShift: null,
      currentIndex: -1
    });
  }

  setActiveShift(shift, index) {
    this.setState({
      currentShift: shift,
      currentIndex: index
    });
  }

  removeAllShifts() {
    ShiftDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { shifts, currentShift, currentIndex } = this.state;
    console.log(this.state)
    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Shifts List</h4>

          <ul className="list-group">
            {shifts &&
              shifts.map((shift, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveShift(shift, index)}
                  key={index}
                >
                  {shift.name}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentShift ? (
            <div>
              <h4>Shift</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentShift.name}
              </div>
              <div>
                <label>
                  <strong>Start Time:</strong>
                </label>{" "}
                {currentShift.start_time}
              </div>
              <div>
                <label>
                  <strong>End Time:</strong>
                </label>{" "}
                {currentShift.end_time}
              </div>

              <Link
                to={"/shifts/" + currentShift.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Shift...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}