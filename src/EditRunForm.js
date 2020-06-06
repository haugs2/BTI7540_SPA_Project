import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style/RunEntryListItem.css";
import "./style/EditRunForm.css";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
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
            <input type="text" defaultValue={this.props.defaultDate}></input>
          </div>

          <div className="RunEntryListItem-item">
            <label className="RunEntryListItem-label">Distance:</label>
            <input
              type="text"
              defaultValue={this.props.defaultDistance}
            ></input>
          </div>
          <div className="RunEntryListItem-item">
            <label className="RunEntryListItem-label">Pace:</label>
            <input type="text" defaultValue={this.props.defaultPace}></input>
          </div>

          <div className="RunEntryListItem-item">
            <label className="RunEntryListItem-label">Comment: </label>
            <input type="text" defaultValue={this.props.defaulComment}></input>
          </div>
          <button className="RunEntryListItem-btn">
            <FaSave></FaSave>
          </button>
        </div>
      </li>
    );
  }
}

export default RunEntryListItem;
