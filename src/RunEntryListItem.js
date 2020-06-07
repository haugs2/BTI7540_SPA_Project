import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style/RunEntryListItem.css";
import { FaEdit } from "react-icons/fa";
import { IconContext } from "react-icons";

class RunEntryListItem extends Component {
  constructor(props) {
    super(props);
    this.onRemoveRunEntryFromListClicked = this.onRemoveRunEntryFromListClicked.bind(
      this
    );
    this.onEditRunEntryFromListClicked = this.onEditRunEntryFromListClicked.bind(
      this
    );
  }

  onRemoveRunEntryFromListClicked(event) {
    event.preventDefault();
    let idToDelete = this.props.id;
    let url = "http://localhost:4000/runs/".concat(idToDelete);
    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // We convert the React state to JSON and send it as the POST body
    }).then(function (response) {
      console.log(response);
      return response.json();
    });
    this.props.onDelete(idToDelete);
  }

  onEditRunEntryFromListClicked(event) {
    event.preventDefault();
    let idToEdit = this.props.id;
    this.props.onEdit(idToEdit);
  }

  render() {
    return (
      <li key={this.props.id}>
        <div className="RunEntryListItem-container">
          <div className="RunEntryListItem-item">
            <label className="RunEntryListItem-label">Date:</label>
            {this.props.date}
          </div>

          <div className="RunEntryListItem-item">
            <label className="RunEntryListItem-label">Distance:</label>
            {this.props.distance} km
          </div>
          <div className="RunEntryListItem-item">
            <label className="RunEntryListItem-label">Pace:</label>
            {this.props.pace} min/km
          </div>

          <div className="RunEntryListItem-item">
            <label className="RunEntryListItem-label">Comment: </label>
            {this.props.comment}
          </div>
          <button
            className="RunEntryListItem-btn"
            onClick={this.onEditRunEntryFromListClicked}
          >
            <IconContext.Provider value={{ color: "white" }}>
              <FaEdit color="white"></FaEdit>
            </IconContext.Provider>
          </button>
          <button
            className="RunEntryListItem-btn"
            onClick={this.onRemoveRunEntryFromListClicked}
          >
            x
          </button>
        </div>
      </li>
    );
  }
}

export default RunEntryListItem;
