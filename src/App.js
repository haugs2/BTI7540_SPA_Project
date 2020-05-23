import React, { Component } from "react";
import RunEntry from "./RunEntry";
import RunEntryList from "./RunEntryList";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runentries: [
        {
          id: 1,
          date: "04.05.2020",
          distance: "5",
          pace: "4:45",
          comment: "Threshold run",
        },
        {
          id: 2,
          date: "05.05.2020",
          distance: "6",
          pace: "5:30",
          comment: "Easy run",
        },
        {
          id: 2,
          date: "07.05.2020",
          distance: "11",
          pace: "5:40",
          comment: "Long run",
        },
      ],
    };
    this.addRun = this.addRun.bind(this);
  }

  addRun(date, distance, pace, comment) {
    let runentries = this.state.runentries;
    let maxId = 0;
    for (let run of runentries) {
      if (run.id > maxId) {
        maxId = run.id;
      }
    }
    runentries.unshift({
      id: maxId + 1,
      date: date,
      distance: distance,
      pace: pace,
      comment: comment,
    });
    this.setState({
      runentries: runentries,
    });
  }

  render() {
    return (
      <div className="App">
        <RunEntry></RunEntry>
        <RunEntryList runentries={this.state.runentries}></RunEntryList>
      </div>
    );
  }
}

export default App;
