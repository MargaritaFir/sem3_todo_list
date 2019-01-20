import React, { Component } from 'react';
import  List from './components/List';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container container-padding">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h2 className="text-center">React & Express ToDo List</h2>
            <List />
          </div>
        </div>
      </div>
    );
  }
}

export default App;