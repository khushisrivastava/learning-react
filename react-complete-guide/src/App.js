import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Khushi', age: 21 },
      { name: 'Lavanya', age: 13 }
    ]
  }

  switchNameHandeler = () => {
    this.setState({
      persons: [
        { name: 'Khushi Srivastava', age: 21 },
        { name: 'Lavanya Srivastava', age: 13 }
      ]
    })
  }

  changeNameHandeler = (event) => {
    this.setState({
      persons: [
        { name: 'Khushi', age: 21 },
        { name: event.target.value, age: 13 }
      ]
    })
  }

  render() {
    const style = {
      backgroundColor: 'white',
      border: '1px solid blue',
      padding: '16px',
      cursor: 'pointer'
    }

    return (
      <div className="App">
        <h1>Hi, This is a React App.</h1>
        <button style={style} onClick={this.switchNameHandeler}>Switch Name</button>
        <Person click={this.switchNameHandeler} name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person change={this.changeNameHandeler} name={this.state.persons[1].name} age={this.state.persons[1].age}/>
      </div>
    );
  }
}

export default App;
