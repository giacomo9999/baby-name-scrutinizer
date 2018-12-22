import React, { Component } from "react";

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

  export default EditableListList;