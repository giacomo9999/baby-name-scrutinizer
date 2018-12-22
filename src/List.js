import React from "react";

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

  export default List;
