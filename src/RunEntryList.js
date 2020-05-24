import React, { Component } from "react";
import PropTypes from "prop-types";
import RunEntryListItem from "./RunEntryListItem";
import "./style/RunEntryList.css";

class RunEntryList extends Component {
  constructor(props) {
    super(props);
    this.removeListItem = this.removeListItem.bind(this);
  }

  removeListItem(id) {
    return this.props.removeItem(id);
  }
  render() {
    return (
      <div className="container-RunEntryList">
        <ul>
          {this.props.runentries.map((runentry) => {
            return (
              <RunEntryListItem
                id={runentry.id}
                date={runentry.date}
                distance={runentry.distance}
                pace={runentry.pace}
                comment={runentry.comment}
                onDelete={this.removeListItem}
              ></RunEntryListItem>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RunEntryList;
