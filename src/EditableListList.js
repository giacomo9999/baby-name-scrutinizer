// Rendered by ListDashboard
// Renders all instances of EditableList

import React from "react";
import EditableList from "./EditableList";

// child of ListDashboard
class EditableListList extends React.Component {
  render() {
    // console.log('EditableListList updating the lists.')
    const lists = this.props.lists.map((list) => (
      <EditableList
        key={"list-" + list.list_id}
        list_id={list.list_id}
        year={list.year}
        sex={list.sex}
        race={list.race}
        topFiveNames={list.topFiveNames}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
      />
    ));
    return <div>{lists}</div>;
  }
}

export default EditableListList;
