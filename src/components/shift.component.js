import React, { Component } from "react";
import ShiftDataService from "../services/shift.service";

export default class Shift extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.getShift = this.getShift.bind(this);
    this.updateShift = this.updateShift.bind(this);
    this.deleteShift = this.deleteShift.bind(this);

    this.state = {
      currentShift: {
        id: null,
        name: "",
        start_time: "",
        end_time: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getShift(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentShift: {
          ...prevState.currentShift,
          name: name
        }
      };
    });
  }

  onChangeStartTime(e) {
    const start_time = e.target.value;
    
    this.setState(prevState => ({
      currentShift: {
        ...prevState.currentShift,
        start_time: start_time
      }
    }));
  }

  onChangeEndTime(e) {
    const end_time = e.target.value;
    
    this.setState(prevState => ({
      currentShift: {
        ...prevState.currentShift,
        end_time: end_time
      }
    }));
  }

  getShift(id) {
    ShiftDataService.get(id)
      .then(response => {
        this.setState({
          currentShift: response.data.shift
        });
        console.log(response.data.shift);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateShift() {
    ShiftDataService.update(
      this.state.currentShift.id,
      this.state.currentShift
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Shift was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteShift() {    
    ShiftDataService.delete(this.state.currentShift.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/shifts')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentShift } = this.state;

    return (
      <div>
        {currentShift ? (
          <div className="edit-form">
            <h4>Shift</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentShift.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="start_time">Start Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="start_time"
                  value={currentShift.start_time}
                  onChange={this.onChangeStartTime}
                />
              </div>
              <div className="form-group">
                <label htmlFor="end_time">End Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="end_time"
                  value={currentShift.end_time}
                  onChange={this.onChangeEndTime}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteShift}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateShift}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Shift...</p>
          </div>
        )}
      </div>
    );
  }
}