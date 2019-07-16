// Rendered By ListDashboard
// Renders ListForm

import React from "react";
import ListForm from "./ListForm";

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
        <div className="global_wrapper_flex">
          <button className="button_basic" onClick={this.handleFormOpen}>
            Create New List
          </button>
        </div>
      );
    }
  }
}

export default ToggleableListForm;
