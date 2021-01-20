import React, { Component } from "react";
import ShiftDataService from "../services/shift.service";

export default class AddShift extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.saveShift = this.saveShift.bind(this);
    this.newShift = this.newShift.bind(this);

    this.state = {
      id: null,
      name: "",
      start_time: "",
        end_time: "",

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeStartTime(e) {
    this.setState({
      start_time: e.target.value
    });
  }

  saveShift() {
    var data = {
      name: this.state.name,
      start_time: this.state.start_time
    };

    ShiftDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          start_time: response.data.start_time,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newShift() {
    this.setState({
      id: null,
      name: "",
      start_time: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newShift}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="start_time">Start Time</label>
              <input
                type="text"
                className="form-control"
                id="start_time"
                required
                value={this.state.start_time}
                onChange={this.onChangeStartTime}
                name="start_time"
              />
            </div>

            <button onClick={this.saveShift} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}