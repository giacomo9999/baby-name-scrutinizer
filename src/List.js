import React from "react";

class List extends React.Component {
  handleTrashClick = () => {
    console.log("List handling trash for item " + this.props.list_id);
    this.props.onTrashClick(this.props.list_id);
  };

  render() {
    console.log(this.props.topFiveNames[0]);

    const nameList = this.props.topFiveNames.map((name, index) => (
      <tr>
        <td>{index + 1}</td>
        <td>{name}</td>
      </tr>
    ));
    return (
      <div className="ui centered card">
        <div className="content">
          <div className="center aligned">
            <h4>{" - List " + this.props.list_id + " Parameters -"}</h4>
            <div className="ui pink label">
              <h5 className="white">{this.props.year}</h5>
            </div>
            <div className="ui pink label">
              <h5 className="white">{this.props.sex}</h5>
            </div>
            <div className="ui pink label">
              <h5 className="white">{this.props.race}</h5>
            </div>
            <table className="ui celled definition striped table">
              <tbody className="two wide column">{nameList}</tbody>
            </table>
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

export default List;
