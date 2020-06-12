import React, { Component } from "react";
import RunEntry from "./RunEntry";
import RunEntryList from "./RunEntryList";
import "./App.css";
import { FaRunning } from "react-icons/fa";
import parsePaceNumber, { parsePaceString } from "./utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      runentries: [],
      editingIds: [],
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
    this.setRunToEdit = this.setRunToEdit.bind(this);
    this.removeRunToEdit = this.removeRunToEdit.bind(this);
    this.loadData = this.loadData.bind(this);
    this.parsePaceString = parsePaceString.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch("https://my-running-db.herokuapp.com/runs")
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
      pace: this.parsePaceString(pace),
      comment: comment,
    });
    this.setState({
      runentries: runentries,
    });
  }

  setRunToEdit(idToEdit) {
    let runsToEdit = this.state.editingIds;
    runsToEdit.push(idToEdit);
    this.setState({
      editingIds: runsToEdit,
    });
  }

  removeRunToEdit(idNoLongerEdit, distance, pace, date, comment) {
    let runsToEdit = this.state.editingIds;
    let runentries = this.state.runentries;
    for (var i = 0; i < runsToEdit.length; i++) {
      if (runsToEdit[i] == idNoLongerEdit) {
        runsToEdit.splice(i, 1);
      }
    }
    for (var i = 0; i < runentries.length; i++) {
      if (runentries[i].id == idNoLongerEdit) {
        runentries[i].distance = distance;
        runentries[i].pace = this.parsePaceString(pace);
        runentries[i].date = date;
        runentries[i].comment = comment;
      }
    }

    this.setState({
      editingIds: runsToEdit,
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
          <h1 className="App-title">
            <FaRunning />
            <span className="App-title-text">Running Diary</span>
          </h1>
          <RunEntry onAdd={this.addRun}></RunEntry>
          <RunEntryList
            runentries={this.state.runentries.sort((a, b) =>
              new Date(a.date.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3")) >
              new Date(b.date.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"))
                ? -1
                : 1
            )}
            removeItem={this.removeRun}
            editingIds={this.state.editingIds}
            handleEdit={this.setRunToEdit}
            handleEditDone={this.removeRunToEdit}
          ></RunEntryList>
        </div>
      );
    }
  }
}

export default App;
