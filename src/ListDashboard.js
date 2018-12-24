import React from "react";
// import "./App.css";
import EditableListList from "./EditableListList";
import ToggleableListForm from "./ToggleableListForm";

class ListDashboard extends React.Component {
  state = {
    lists: [
      {
        list_id: "(sample)",
        year: "2011",
        sex: "Female",
        race: "Asian/Pacific",
        topFiveNames: ["SOPHIA", "CHLOE", "EMILY", "OLIVIA", "EMMA"]
      }
    ]
  };

  handleCreateFormSubmit = list => {
    // console.log('ListDashboard now handling CreateFormSubmit.');
    this.createList(list);
  };

  handleEditFormSubmit = attrs => {
    console.log("ListDashboard now handling EditFormSubmit.");
    console.log(attrs);
    this.updateList(attrs);
  };

  handleTrashClick = listId => {
    this.deleteList(listId);
  };

  deleteList = listId => {
    console.log("ListDashboard now deleting list " + listId);
    this.setState({
      lists: this.state.lists.filter(list => list.list_id !== listId)
    });
  };

  getResults = entry => {
    if (this.props.namesData.length === 0) {
      console.log("data is not in yet.");
      return [];
    } else {
      // use .filter to return only records from DB that match year/sex/race arguments
      const adjRaceObj = {
        Black: "BLACK NON HISP",
        "Asian/Pacific": "ASIAN AND PACIFIC ISLANDER",
        White: "WHITE NON HISP",
        Hispanic: "HISPANIC"
      };

      console.log(entry.year, entry.sex.toUpperCase(), adjRaceObj[entry.race]);

      const filteredNamesData = this.props.namesData.filter(
        record =>
          record.birthYear === entry.year &&
          record.sex === entry.sex.toUpperCase() &&
          record.race === adjRaceObj[entry.race]
      );

      if (filteredNamesData.length === 0) {
        console.log("cannot match request parameters to DB.");
        return ["one or more arguments not in DB"];
      }
      const topFive = [];
      for (let i = 0; i <= 4; i++) {
        topFive.push(filteredNamesData[i].name.toUpperCase());
      }
      console.log(topFive);
      return topFive;
    }
  };

  createList = list => {
    const nameArr = this.getResults(list);
    function newList(attrs = {}, listLength) {
      const list = {
        list_id: attrs.list_id || listLength + 1,
        year: attrs.year || "Year",
        sex: attrs.sex || "Sex",
        race: attrs.race || "Ethnicity",
        topFiveNames: nameArr || []
      };
      return list;
    }
    console.log("ListDashboard now creating list...");
    const l = newList(list, this.state.lists.length);
    this.setState({
      lists: this.state.lists.concat(l)
    });
  };

  updateList = attrs => {
    console.log("ListDashboard now updating state with list.");
    console.log(attrs);
    this.setState({
      lists: this.state.lists.map(list => {
        if (list.list_id === attrs.list_id) {
          return Object.assign({}, list, {
            list_id: attrs.list_id,
            year: attrs.year,
            sex: attrs.sex,
            race: attrs.race
          });
        } else {
          return list;
        }
      })
    });
  };

  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <div />
          <h1>The NYC Baby Name Scrutinizer</h1>
          <a href="https://opendata.cityofnewyork.us/">
            <h4>Source: https://opendata.cityofnewyork.us/</h4>
          </a>
          <EditableListList
            lists={this.state.lists}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
          />
          <ToggleableListForm onFormSubmit={this.handleCreateFormSubmit} />
        </div>
      </div>
    );
  }
}

export default ListDashboard;
