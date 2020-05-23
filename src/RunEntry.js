import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style/RunEntry.css";

class RunEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 0,
      pace: 0,
      comment: "",
      date: "",
    };
    this.onRunEntryAdd = this.onRunEntryAdd.bind(this);
    this.onRunEntryDistanceChange = this.onRunEntryDistanceChange.bind(this);
    this.onRunEntryPaceChange = this.onRunEntryPaceChange.bind(this);
    this.onRunEntryCommentChange = this.onRunEntryCommentChange.bind(this);
    this.onRunEntryDateChange = this.onRunEntryDateChange.bind(this);
  }

  onRunEntryAdd() {
    //to be implemented
    return;
  }

  onRunEntryDistanceChange(event) {
    this.setState({ distance: event.target.value });
  }

  onRunEntryPaceChange(event) {
    this.setState({ pace: event.target.value });
  }

  onRunEntryCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  onRunEntryDateChange(event) {
    this.setState({ date: event.target.value });
  }

  render() {
    return (
      <form className="RunEntry-Inputs">
        <h3>My latest run</h3>
        <div className="RunEntry-Date">
          <label>Date</label>
          <input
            type="text"
            onChange={this.onRunEntryDateChange}
            value={this.state.date}
          ></input>
        </div>
        <div className="RunEntry-Numbers">
          <div className="RunEntry-Distance">
            <label>Distance (km)</label>
            <input
              type="text"
              onChange={this.onRunEntryDistanceChange}
              value={this.state.distance}
            ></input>
          </div>
          <div className="RunEntry-Pace">
            <label>Pace (min/km)</label>
            <input
              type="text"
              onChange={this.onRunEntryPaceChange}
              value={this.state.pace}
            ></input>
          </div>
        </div>
        <div className="RunEntry-Comment">
          <label>Comment</label>
          <textarea
            className="RunEntry-Comment"
            type="text"
            onChange={this.onRunEntryCommentChange}
            value={this.state.comment}
          ></textarea>
        </div>
        <button onClick={this.onRunEntryAdd}>Add Run</button>
      </form>
    );
  }
}

export default RunEntry;
