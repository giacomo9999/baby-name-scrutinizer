import React, { Component } from "react";
import ListDashboard from "./ListDashboard";
// import "./App.css";
import axios from "axios";

class App extends Component {
  state = { namesData: [] };

  componentDidMount() {
    axios
      .get(
        "https://data.cityofnewyork.us/api/views/25th-nujf/rows.json?accessType=DOWNLOAD"
      )
      // extract relevant data from response object
      .then(response => {
        console.log(
          "Data retrieved from cityofnewyork.us. Building database..."
        );
        const recordObj = response.data.data.map((entry, index) => ({
          key: "entry_" + index,
          birthYear: entry[8],
          sex: entry[9],
          race: entry[10],
          name: entry[11],
          withThatName: entry[12],
          nameRank: entry[13]
        }));
        recordObj.forEach(entry => {
          if (entry.race === "WHITE NON HISP") {
            entry.race = "WHITE NON HISPANIC";
          }
          if (entry.race === "BLACK NON HISP") {
            entry.race = "BLACK NON HISPANIC";
          }
          if (entry.race === "ASIAN AND PACI") {
            entry.race = "ASIAN AND PACIFIC ISLANDER";
          }
        });

        // create a new state object without mutating the original one
        const newData = Object.assign({}, this.state, { namesData: recordObj });

        // store the new object in the component's state
        this.setState(newData);
        console.log("Database assembled.");

        // check validity of imported data
        // const raceArr = [
        //   "BLACK NON HISPANIC",
        //   "ASIAN AND PACIFIC ISLANDER",
        //   "WHITE NON HISPANIC",
        //   "HISPANIC"
        // ];
        // const yearsArr = ["2011", "2012", "2013", "2014", "2015", "2016"];
        // const sexArr = ["MALE", "FEMALE"];

        // for (let i = 0; i <= raceArr.length - 1; i++) {
        //   for (let j = 0; j <= yearsArr.length - 1; j++) {
        //     for (let k = 0; k <= sexArr.length - 1; k++) {
        //       const filteredNamesData = this.state.namesData.filter(
        //         entry =>
        //           raceArr[i] === entry.race &&
        //           yearsArr[j] === entry.birthYear.toUpperCase() &&
        //           sexArr[k] === entry.sex.toUpperCase()
        //       );

        //       console.log(filteredNamesData[0]);
        //       console.log("---");

        //       if (filteredNamesData.length === 0) {
        //         console.log(
        //           raceArr[i],
        //           yearsArr[j],
        //           sexArr[k],
        //           " ** BAD DATA **"
        //         );
        //       } else {
        //         console.log(raceArr[i], yearsArr[j], sexArr[k]);
        //       }
        //     }
        //   }
        // }
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <ListDashboard namesData={this.state.namesData} />
      </div>
    );
  }
}

export default App;


