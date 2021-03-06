// Rendered by App.js
// Renders EditableListList and ToggleableListForm

import React from "react";
import EditableListCatalog from "./EditableListCatalog";
import ToggleableListForm from "./ToggleableListForm";

class ListDashboard extends React.Component {
  state = {
    lists: [
      {
        list_id: "(sample)",
        year: "2011",
        sex: "Female",
        race: "Asian/Pacific",
        topFiveNames: ["SOPHIA", "CHLOE", "EMILY", "OLIVIA", "EMMA"],
      },
    ],
  };

  handleCreateFormSubmit = (list) => {
    // console.log('ListDashboard now handling CreateFormSubmit.');
    this.createList(list);
  };

  handleEditFormSubmit = (attrs) => {
    console.log("ListDashboard now handling EditFormSubmit.");
    console.log(attrs);
    this.updateList(attrs);
    console.log(`List ${attrs.list_id} updated.`);
  };

  handleTrashClick = (listId) => {
    this.deleteList(listId);
  };

  deleteList = (listId) => {
    console.log("ListDashboard now deleting list " + listId);
    this.setState({
      lists: this.state.lists.filter((list) => list.list_id !== listId),
    });
  };

  getResults = (entry) => {
    if (this.props.namesData.length === 0) {
      console.log("data is not in yet.");
      return [];
    } else {
      // use .filter to return only records from DB that match year/sex/race arguments
      const adjRaceObj = {
        Black: "BLACK NON HISPANIC",
        "Asian/Pacific": "ASIAN AND PACIFIC ISLANDER",
        White: "WHITE NON HISPANIC",
        Hispanic: "HISPANIC",
      };

      console.log(
        "getResults says: ",
        entry.year,
        entry.sex.toUpperCase(),
        adjRaceObj[entry.race]
      );

      const filteredNamesData = this.props.namesData.filter(
        (record) =>
          record.birthYear === entry.year &&
          record.sex.toUpperCase() === entry.sex.toUpperCase() &&
          record.race.toUpperCase() === adjRaceObj[entry.race]
      );

      console.log("Filtered Names Data: ", filteredNamesData);

      if (filteredNamesData.length === 0) {
        console.log("cannot match request parameters to DB.");
        return ["one or more arguments not in DB"];
      }

      const correctedTopFive = ["", "", "", "", ""];
      filteredNamesData
        .filter((entry) => entry.nameRank <= 5)
        .forEach(
          (entry) =>
            (correctedTopFive[entry.nameRank - 1] = entry.name.toUpperCase())
        );

      console.log("Corrected names...", correctedTopFive);
      return correctedTopFive;
    }
  };

  createList = (list) => {
    const nameArr = this.getResults(list);
    function newList(attrs = {}, listLength) {
      const list = {
        list_id: attrs.list_id || listLength + 1,
        year: attrs.year || "Year",
        sex: attrs.sex || "Sex",
        race: attrs.race || "Ethnicity",
        topFiveNames: nameArr || [],
      };
      return list;
    }
    console.log("ListDashboard now creating list...");
    const l = newList(list, this.state.lists.length);
    this.setState({
      lists: this.state.lists.concat(l),
    });
  };

  updateList = (attrs) => {
    console.log("ListDashboard now updating state with list.");
    console.log(
      `New attrs: ${attrs.list_id}, ${attrs.year}, ${attrs.sex}, ${attrs.race}`
    );
    attrs.topFiveNames = this.getResults(attrs);
    this.setState({
      lists: this.state.lists.map((list) => {
        console.log("Setting state with revised list...");
        if (list.list_id === attrs.list_id) {
          return Object.assign({}, list, {
            list_id: attrs.list_id,
            year: attrs.year,
            sex: attrs.sex,
            race: attrs.race,
            topFiveNames: attrs.topFiveNames,
          });
        } else {
          return list;
        }
      }),
    });
  };

  render() {
    return (
      <div className="container-outer">
        <div className="container-inner">
          <h3>The NYC </h3>
          <h1>Baby Name Scrutinizer</h1>
          <a href="https://opendata.cityofnewyork.us/">
            <h4>Source: https://opendata.cityofnewyork.us/</h4>
          </a>
        </div>

        <div>
          <EditableListCatalog
            lists={this.state.lists}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
          />
          <br />
          <ToggleableListForm onFormSubmit={this.handleCreateFormSubmit} />
        </div>
      </div>
    );
  }
}

export default ListDashboard;
