import React from "react";
import ListForm from "./ListForm";
import List from "./List";


// child of EditableListList
// EditableList -- if editFormOpen is true, display ListForm; if not, display List. 
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
            topFiveNames={this.props.topFiveNames}
            onEditClick={this.handleEditClick}
            onTrashClick={this.props.onTrashClick}
          />
        );
      }
    }
  }

  export default EditableList;
