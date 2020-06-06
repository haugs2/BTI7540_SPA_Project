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
  }

  removeListItem(id) {
    return this.props.removeItem(id);
  }

  editListItem(id) {
    return this.props.handleEdit(id);
  }

  render() {
    return (
      <div className="container-RunEntryList">
        <ul>
          {this.props.runentries.map((runentry) => {
            return this.props.editingIds.includes(runentry.id) ? (
              <EditRunForm
                defaultDate={runentry.date}
                defaultPace={runentry.pace}
                defaultComment={runentry.comment}
                defaultDistance={runentry.distance}
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
