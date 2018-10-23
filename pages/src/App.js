import React, { Component } from 'react';
import './App.css';
import { Welcome, PersonChoose, CarInfo, Driver, Rider, Confirm } from './components/Steps.js';
import { states } from './components/States.js';
import { StateMachine } from './components/StateMachine.js';

class App extends Component {
  state = {
    response: ''
  }

  constructor(props) {
    super(props);
      this.state = {
          currentState: states.WELCOME,
          name: null,
          phone: null,
          driver: null,
          capacity: null,
          address: null
    };
    this._next = this._next.bind(this);
    this._back = this._back.bind(this);
    this._saveFields = this._saveFields.bind(this);
    this.stateMachine = new StateMachine();
  }

  callApi = async(endpoint) => {
    const response = await fetch("/api/" + endpoint);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  _saveFields(obj) {
    this.setState(obj);
  }

  _next(desiredState) {
    let currentState = this.state.currentState;
    console.log(desiredState)
    let nextState = this.stateMachine.transitionTo(currentState, desiredState);
    this.setState({
      currentState: nextState
    });
  }

  _back(desiredState) {
    console.log(desiredState)
    let currentState = this.state.currentState;
    this.setState({
      currentState: this.stateMachine.transitionFrom(currentState, desiredState)
    });
  }

  /*
   * Just a note -- you'll see the _next and _back functions
   * get passed around to child components alot. This is not
   * a very good practice, and in the real-world it would be
   * better to use a library like redux to handle application
   * state.
   */
  _currentStep() {
    console.log(this.state.driver);
      switch (this.state.currentState) {
      case states.WELCOME:
          return (<Welcome next={this._next} />);
      case states.PERSON_CHOOSE:
          return (<PersonChoose
                  saveForm={this._saveFields}
                  back={this._back}
                  next={this._next} />);
      case states.CAR_DETAIL:
          return (<CarInfo
                  saveForm={this._saveFields}
                  back={this._back}
                  next={this._next} />);
      case states.DRIVER:
          return (<Driver
                  saveForm={this._saveFields}
                  back={this._back}
                  next={this._next} />);
      case states.RIDER:
          return (<Rider
                  saveForm={this._saveFields}
                  back={this._back}
                  next={this._next} />);
      case states.CONFIRM:
          return (<Confirm
                  back={this._back}
                  next={this._next} />);
      default:
          return (<Welcome next={this._next} />);
      }
  }
  render() {
    return (
      <div className="App">
        <div>
          {this._currentStep()}
        </div>
      </div>
    );
  }
}

export default App;
