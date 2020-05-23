import React, { Component } from "react";
import PropTypes from "prop-types";

class RunEntryList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.runentries.map(function (runentry) {
            return (
              <li key={runentry.id}>
                {runentry.date}: {runentry.distance}km, {runentry.pace}min/km,{" "}
                {runentry.comment}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RunEntryList;
