import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from '../logo.svg';
import './App.css';
import { simpleAction, newPage } from '../actions/simpleAction';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <pre>
        {
          JSON.stringify(this.props.simpleReducer)
        }
        </pre>
        <button onClick={() => {this.props.simpleAction()}}>Test redux action</button>
        <button onClick={() => {this.props.newPage('/homepage')}}>BUTTON</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 });

 const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction()),
  newPage: (path) => dispatch(newPage(path))
 });

export default connect(mapStateToProps, mapDispatchToProps)(App);
