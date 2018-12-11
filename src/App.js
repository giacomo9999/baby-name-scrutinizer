import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Jim's First Deployed React App</h1>
          <p>Now with extra cheese!</p>
          
        </header>
      </div>
    );
  }
}

export default App;
