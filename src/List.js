import React from "react";

class List extends React.Component {
  handleTrashClick = () => {
    console.log("List handling trash for item " + this.props.list_id);
    this.props.onTrashClick(this.props.list_id);
  };

  render() {
    console.log(this.props.topFiveNames[0]);
    const itemStyle = {
      listStyleType: "none"
    };
    const nameList = this.props.topFiveNames.map((name, index) => (
      <li style={itemStyle}>
        <div className="ui big violet label">{index + 1 + ".  " + name}</div>
        <br />
      </li>
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
            <div className="left aligned">
              <ul>{nameList}</ul>
            </div>

            <div className="ui selection list">
              <i className="item">
                <div className="ui big red horizontal circular label">Fruit</div>
                Kumquats
              </i>
              <a className="item">
                <div className="ui purple horizontal label">Candy</div>
                Ice Cream
              </a>
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
