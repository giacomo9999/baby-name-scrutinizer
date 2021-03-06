// Rendered by EditableList

import React from "react";

class List extends React.Component {
  handleTrashClick = () => {
    console.log("List handling trash for item " + this.props.list_id);
    this.props.onTrashClick(this.props.list_id);
  };

  render() {
    console.log(
      `List displaying top five names for list: ${this.props.topFiveNames}`
    );

    const nameList = this.props.topFiveNames.map((name, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{name}</td>
      </tr>
    ));
    return (
      <div className="container-inner">
        <div className="list_header">
          <h4>{" - List " + this.props.list_id + " Parameters -"}</h4>
          <div className="container_flex">
            <div className="list-parameter-tag-box">
              <h5>{this.props.year}</h5>
            </div>
            <div className="list-parameter-tag-box">
              <h5>{this.props.sex}</h5>
            </div>
            <div className="list-parameter-tag-box">
              <h5>{this.props.race}</h5>
            </div>
          </div>
        </div>

        <div className="container_flex">
          <table >
            <tbody>{nameList}</tbody>
          </table>
        </div>

        <div className="container_grid">
          <div />
          <i className="fas fa-edit" onClick={this.props.onEditClick} />
          <i className="fas fa-trash" onClick={this.handleTrashClick} />
        </div>
      </div>
    );
  }
}

export default List;
