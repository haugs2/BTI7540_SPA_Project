import React, { Component } from "react";
import RunEntry from "./RunEntry";
import RunEntryList from "./RunEntryList";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      runentries: [],
      /*runentries: [
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
          id: 3,
          date: "07.05.2020",
          distance: "11",
          pace: "5:40",
          comment: "Long run",
        },
      ]*/
    };
    this.addRun = this.addRun.bind(this);
    this.removeRun = this.removeRun.bind(this);
  }

  componentDidMount() {
    fetch("https://my-json-server.typicode.com/haugs2/jsonruns/runs")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          runentries: json,
        });
      });
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

  removeRun(idToDelete) {
    let runentries = this.state.runentries;
    for (var i = 0; i < runentries.length; i++) {
      if (runentries[i].id == idToDelete) {
        runentries.splice(i, 1);
      }
    }
    this.setState({
      runentries: runentries,
    });
  }

  render() {
    var { isLoaded, runentries } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <RunEntry onAdd={this.addRun}></RunEntry>
          <RunEntryList
            runentries={this.state.runentries.sort((a, b) =>
              a.date > b.date ? -1 : 1
            )}
            removeItem={this.removeRun}
          ></RunEntryList>
        </div>
      );
    }
  }
}

export default App;
