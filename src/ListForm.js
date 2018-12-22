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
      console.log("ListForm handling Submit - list ID: "+this.props.list_id);
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

  export default ListForm;