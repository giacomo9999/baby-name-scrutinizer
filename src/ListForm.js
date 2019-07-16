// Rendered by EditableList

import React from "react";

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
    if (
      this.state.year !== "" &&
      this.state.sex !== "" &&
      this.state.race !== ""
    ) {
      console.log("ListForm handling Submit - list ID: " + this.props.list_id);
      this.props.onFormSubmit({
        list_id: this.props.list_id,
        year: this.state.year,
        sex: this.state.sex,
        race: this.state.race
      });
    } else {
      alert("Year, Sex and Ethnicity must *all* be assigned values.");
    }
  };

  render() {
    const submitText = this.props.list_id ? "Update" : "Create";
    return (
      <div className="global_wrapper_bordered">
        <div className="global_wrapper_flex">
          <select
            className="dropdown"
            name="year"
            value={this.state.year}
            onChange={this.handleChange}
          >
            <option value="">Year </option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
          </select>

          <select
            className="dropdown"
            name="sex"
            value={this.state.sex}
            onChange={this.handleChange}
          >
            <option value="">Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            className="dropdown"
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
        <div className="global_wrapper_flex">
          <button className="button_basic" onClick={this.handleSubmit}>
            {submitText}
          </button>
          <button className="button_basic" onClick={this.props.onFormClose}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default ListForm;
