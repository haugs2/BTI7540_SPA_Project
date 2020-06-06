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
      errors: {
        distance: "",
        pace: "",
        date: "",
        comment: "",
      },
    };
    this.onRunEntryAdd = this.onRunEntryAdd.bind(this);
    this.onRunEntryDistanceChange = this.onRunEntryDistanceChange.bind(this);
    this.onRunEntryPaceChange = this.onRunEntryPaceChange.bind(this);
    this.onRunEntryCommentChange = this.onRunEntryCommentChange.bind(this);
    this.onRunEntryDateChange = this.onRunEntryDateChange.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetState() {
    this.setState({
      distance: 0,
      pace: 0,
      comment: "",
      date: "",
      errors: {
        distance: "",
        pace: "",
        date: "",
        comment: "",
      },
    });
  }
  onRunEntryAdd(event) {
    event.preventDefault();
    this.props.onAdd(
      this.state.date,
      this.state.distance,
      this.state.pace,
      this.state.comment
    );
    this.resetState();
  }

  onRunEntryDistanceChange(event) {
    this.setState({ distance: event.target.value });
    this.handleChange(event);
  }

  onRunEntryPaceChange(event) {
    this.setState({ pace: event.target.value });
    this.handleChange(event);
  }

  onRunEntryCommentChange(event) {
    this.setState({ comment: event.target.value });
    this.handleChange(event);
  }

  onRunEntryDateChange(event) {
    this.setState({ date: event.target.value });
    this.handleChange(event);
  }

  handleChange = (event) => {
    event.preventDefault();

    const validDateRegex = RegExp(/^(\d{1,2}).(\d{1,2}).(\d{4})\s*$/);
    const validPaceRegex = RegExp(/^\d+(\:\d{1,2})\s*$/);
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "date":
        errors.date = validDateRegex.test(value)
          ? ""
          : "Date must entered in the format DD.MM.YYYY!";
        break;
      case "distance":
        errors.distance = isNaN(value) ? "Distance must be a number" : "";
        break;
      case "pace":
        errors.pace = validPaceRegex.test(value)
          ? ""
          : "Pace must be entered in colon notation, e.g. 5:20";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // another fake server would be https://my-json-server.typicode.com/haugs2/jsonruns/runs
    let body = JSON.stringify(this.state);
    fetch("http://localhost:4000/runs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: body,
    }).then(function (response) {
      console.log(response);
      return response.json();
    });
    this.onRunEntryAdd(event);
    //event.preventDefault();
  };

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  render() {
    return (
      <div className="RunEntry-container">
        <form className="RunEntry-Inputs" onSubmit={this.handleSubmit}>
          <h3>Fill in run data</h3>
          <div className="RunEntry-Date">
            <label>Date</label>
            <input
              name="date"
              type="text"
              onChange={this.onRunEntryDateChange}
              value={this.state.date}
              defaultValue={this.props.defaultDate || ""}
            ></input>
            {this.state.errors.date.length > 0 && (
              <span className="error">{this.state.errors.date}</span>
            )}
          </div>
          <div className="RunEntry-Numbers">
            <div className="RunEntry-Distance">
              <label>Distance (km)</label>
              <input
                name="distance"
                type="text"
                onChange={this.onRunEntryDistanceChange}
                value={this.state.distance}
                defaultValue={this.props.defaultDistance || ""}
              ></input>
              {this.state.errors.distance.length > 0 && (
                <span className="error">{this.state.errors.distance}</span>
              )}
            </div>
            <div className="RunEntry-Pace">
              <label>Pace (min/km)</label>
              <input
                name="pace"
                type="text"
                onChange={this.onRunEntryPaceChange}
                value={this.state.pace}
                defaultValue={this.props.defaultPace || ""}
              ></input>
              {this.state.errors.pace.length > 0 && (
                <span className="error">{this.state.errors.pace}</span>
              )}
            </div>
          </div>
          <div className="RunEntry-Comment">
            <label>Comment</label>
            <textarea
              name="comment"
              className="RunEntry-Comment"
              type="text"
              onChange={this.onRunEntryCommentChange}
              value={this.state.comment}
              defaultValue={this.props.defaultComment || ""}
            ></textarea>
          </div>
          <input type="submit" value="Add run" />
        </form>
      </div>
    );
  }
}

export default RunEntry;
