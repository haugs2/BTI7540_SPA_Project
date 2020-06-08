import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style/RunEntryListItem.css";
import "./style/EditRunForm.css";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { IconContext } from "react-icons";

class EditRunForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      distance: this.props.defaultDistance,
      pace: this.props.defaultPace,
      comment: this.props.defaultComment,
      date: this.props.defaultDate,
      errors: {
        distance: "",
        pace: "",
        date: "",
        comment: "",
      },
    };
    this.onRemoveRunEntryFromListClicked = this.onRemoveRunEntryFromListClicked.bind(
      this
    );
    this.onEditRunEntryFromListClicked = this.onEditRunEntryFromListClicked.bind(
      this
    );
    this.onRunEntryDistanceChange = this.onRunEntryDistanceChange.bind(this);
    this.onRunEntryPaceChange = this.onRunEntryPaceChange.bind(this);
    this.onRunEntryCommentChange = this.onRunEntryCommentChange.bind(this);
    this.onRunEntryDateChange = this.onRunEntryDateChange.bind(this);
    this.parsePaceString = this.parsePaceString.bind(this);
  }

  onRemoveRunEntryFromListClicked(event) {
    event.preventDefault();
    let idToDelete = this.props.id;
    this.props.onDelete(idToDelete);
  }

  onEditRunEntryFromListClicked(event) {
    event.preventDefault();
    let idToEdit = this.props.id;
    this.props.onEdit(idToEdit);
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

  // the pace is internally stored as a decimal number, e.g. 5:30 min/km pace corresponds to the number 5.5
  parsePaceString(pacestring) {
    if (pacestring) {
      let pacestring_arr = pacestring.toString().split(":");
      let integer_part = parseFloat(pacestring_arr[0]);
      let fractional_part = parseFloat(pacestring_arr[1]) / 60;
      return integer_part + fractional_part;
    } else {
      return 0;
    }
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

    let body = JSON.stringify({
      date: this.state.date,
      pace: this.parsePaceString(this.state.pace),
      distance: this.state.distance,
      comment: this.state.comment,
    });
    console.log(body);
    // URL to the object we are about to update
    let url = "http://localhost:4000/runs/".concat(this.state.id);
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
      body: body,
    }).then(function (response) {
      console.log(response);
      return response.json();
    });

    this.props.onEditDone();
    //event.preventDefault();
  };

  render() {
    return (
      <li key={this.props.id}>
        <div className="RunEntryListItem-container">
          <div className="RunEntryListItem-item">
            <label className="RunEntryListItem-label">Date:</label>
            <input
              className="EditInputField"
              name="date"
              type="text"
              value={this.state.date}
              onChange={this.onRunEntryDateChange}
            ></input>
            {this.state.errors.date.length > 0 && (
              <span className="error">{this.state.errors.date}</span>
            )}
          </div>

          <div className="RunEntryListItem-item">
            <label className="RunEntryListItem-label">Distance:</label>
            <input
              className="EditInputField"
              name="distance"
              type="text"
              value={this.state.distance}
              onChange={this.onRunEntryDistanceChange}
            ></input>
            {this.state.errors.distance.length > 0 && (
              <span className="error">{this.state.errors.distance}</span>
            )}
          </div>
          <div className="RunEntryListItem-item">
            <label className="RunEntryListItem-label">Pace:</label>
            <input
              className="EditInputField"
              name="pace"
              type="text"
              value={this.state.pace}
              onChange={this.onRunEntryPaceChange}
            ></input>
            {this.state.errors.pace.length > 0 && (
              <span className="error">{this.state.errors.pace}</span>
            )}
          </div>

          <div className="RunEntryListItem-item">
            <label className="RunEntryListItem-label">Comment: </label>
            <input
              className="EditInputField"
              name="comment"
              type="text"
              value={this.state.comment}
              onChange={this.onRunEntryCommentChange}
            ></input>
            {this.state.errors.comment.length > 0 && (
              <span className="error">{this.state.errors.comment}</span>
            )}
          </div>
          <button
            className="EditRunForm-Submit"
            type="submit"
            value="Save Changes"
            onClick={this.handleSubmit}
          >
            <FaSave></FaSave>
          </button>
        </div>
      </li>
    );
  }
}

export default EditRunForm;
