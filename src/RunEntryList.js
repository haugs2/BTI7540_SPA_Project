import React, { Component } from "react";
import PropTypes from "prop-types";
import RunEntryListItem from "./RunEntryListItem";
import RunEntry from "./RunEntry";
import EditRunForm from "./EditRunForm";
import "./style/RunEntryList.css";
import { FaTheRedYeti } from "react-icons/fa";

class RunEntryList extends Component {
  constructor(props) {
    super(props);
    this.removeListItem = this.removeListItem.bind(this);
    this.editListItem = this.editListItem.bind(this);
    this.editDoneListItem = this.editDoneListItem.bind(this);
    this.parsePaceNumber = this.parsePaceNumber.bind(this);
  }

  removeListItem(id) {
    return this.props.removeItem(id);
  }

  editListItem(id, dist, pace, date, comment) {
    return this.props.handleEdit(id);
  }

  editDoneListItem(id, dist, pace, date, comment) {
    return this.props.handleEditDone(id, dist, pace, date, comment);
  }

  parsePaceNumber(pacenumber) {
    let minutes = Math.trunc(pacenumber);
    let seconds = Math.round((pacenumber % 1) * 60);
    return minutes.toString().concat(":").concat(seconds.toString());
  }

  render() {
    return (
      <div className="container-RunEntryList">
        <ul>
          {this.props.runentries.map((runentry) => {
            return this.props.editingIds.includes(runentry.id) ? (
              <EditRunForm
                id={runentry.id}
                defaultDate={runentry.date}
                defaultPace={this.parsePaceNumber(runentry.pace)}
                defaultComment={runentry.comment}
                defaultDistance={runentry.distance}
                onEditDone={this.editDoneListItem}
              ></EditRunForm>
            ) : (
              <RunEntryListItem
                id={runentry.id}
                date={runentry.date}
                distance={runentry.distance}
                pace={runentry.pace}
                comment={runentry.comment}
                onDelete={this.removeListItem}
                onEdit={this.editListItem}
              ></RunEntryListItem>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RunEntryList;
