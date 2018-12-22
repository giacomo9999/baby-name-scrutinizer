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

class EditableListList extends React.Component {
  render() {
    // console.log('EditableListList updating the lists.')
    const lists = this.props.lists.map(list => (
      <EditableList
        key={"list-" + list.list_id}
        list_id={list.list_id}
        year={list.year}
        sex={list.sex}
        race={list.race}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
      />
    ));
    return <div id="lists">{lists}</div>;
  }
}

class EditableList extends React.Component {
  state = {
    editFormOpen: false
  };

  handleEditClick = () => {
    // console.log("EditableList now handling edit.");
    this.openForm();
  };

  handleFormClose = () => {
    // console.log('EditableList Handling close for the form.');
    this.closeForm();
  };

  handleSubmit = list => {
    // console.log('EditableList Submitting the form.');
    this.props.onFormSubmit(list);
    this.closeForm();
  };

  closeForm = () => {
    // console.log('EditableList closing the form.');
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    // console.log('EditableList opening the form.');
    this.setState({ editFormOpen: true });
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <ListForm
          list_id={this.props.list_id}
          year={this.props.year}
          sex={this.props.sex}
          race={this.props.race}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <List
          list_id={this.props.list_id}
          year={this.props.year}
          sex={this.props.sex}
          race={this.props.race}
          onEditClick={this.handleEditClick}
          onTrashClick={this.props.onTrashClick}
        />
      );
    }
  }
}

class ListForm extends React.Component {
  state = {
    list_id: this.props.list_id || "",
    year: this.props.year || "",
    sex: this.props.sex || "",
    race: this.props.race || ""
  };

  handleChange = e => {
    // console.log('ListForm Changing ' + e.target.name)
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate() {
    // console.log('ListForm Current Selections: ' + this.state.year + ' ' + this.state.sex + ' ' + this.state.race);
  }

  handleSubmit = () => {
    console.log("ListForm handling Submit.");
    this.props.onFormSubmit({
      list_id: this.props.list_id,
      year: this.state.year,
      sex: this.state.sex,
      race: this.state.race
    });
  };

  render() {
    const submitText = this.props.list_id ? "Update" : "Create";
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <select
              className="ui dropdown"
              name="year"
              value={this.state.year}
              onChange={this.handleChange}
            >
              <option value="">Year</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2015">2016</option>
            </select>

            <select
              className="ui dropdown"
              name="sex"
              value={this.state.sex}
              onChange={this.handleChange}
            >
              <option value="">Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select
              className="ui dropdown"
              name="race"
              value={this.state.race}
              onChange={this.handleChange}
            >
              <option value="">Ethnicity</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Hispanic">Hispanic</option>
              <option value="Asian/Pacific">Asian/Pacific</option>
            </select>
          </div>
        </div>
        <div className="extra content">
          <div className="ui two bottom attached buttons">
            <button
              className="ui basic pink button"
              onClick={this.handleSubmit}
            >
              {submitText}
            </button>
            <button
              className="ui basic black button"
              onClick={this.props.onFormClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class ToggleableListForm extends React.Component {
  state = {
    isOpen: false
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmit = list => {
    this.props.onFormSubmit(list);
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <ListForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div className="ui basic content center aligned segment">
          <button
            className="ui basic button icon"
            onClick={this.handleFormOpen}
          >
            <i className="plus icon" />
          </button>
        </div>
      );
    }
  }
}

class List extends React.Component {
  handleTrashClick = () => {
    console.log("List handling trash for item " + this.props.list_id);
    this.props.onTrashClick(this.props.list_id);
  };

  render() {
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="center aligned">
            <h4>{" - List " + this.props.list_id + " Parameters -"}</h4>
            <div className="ui pink label">
              <h4 className="white">{this.props.year}</h4>
            </div>
            <div className="ui pink label">
              <h4 className="white">{this.props.sex}</h4>
            </div>
            <div className="ui pink label">
              <h4 className="white">{this.props.race}</h4>
            </div>
          </div>
        </div>
        <div className="extra content">
          <span
            className="right floated edit icon"
            onClick={this.props.onEditClick}
          >
            <i className="edit icon" />
          </span>
          <span
            className="right floated trash icon"
            onClick={this.handleTrashClick}
          >
            <i className="trash icon" />
          </span>
        </div>
      </div>
    );
  }
}

export default ListDashboard;
