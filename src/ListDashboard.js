import React, { Component } from "react";
import "./App.css";

class ListDashboard extends React.Component {
  state = {
    lists: [
      {
        list_id: "1",
        year: "2011",
        sex: "Female",
        race: "Asian/Pacific"
      },
      {
        list_id: "2",
        year: "2015",
        sex: "Male",
        race: "Hispanic"
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

  createList = list => {
    function newList(attrs = {}, listLength) {
      const list = {
        list_id: attrs.list_id || listLength + 1,
        year: attrs.year || "Project",
        sex: attrs.sex || "Sex",
        race: attrs.race || "Ethnicity"
      };
      return list;
    }
    console.log("ListDashboard now creating list.");
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
