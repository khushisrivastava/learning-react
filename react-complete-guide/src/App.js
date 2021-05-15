import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Khushi', age: 21 },
      { id: 2, name: 'Lavanya', age: 13 }
    ]
  }

  deletePersonHandeler = (personIndex) => {
    // const persons = this.state.persons.slice()
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1)
    this.setState({persons: persons});
  }

  changeNameHandeler = (event, personId) => {
        const personIndex = this.state.persons.findIndex(p => p.id === personId);
        const persons = [...this.state.persons];
        persons[personIndex].name = event.target.value;
        this.setState({persons: persons})
  }

  togglePersonHandeler = () => {
	const show = this.state.showPerson
	this.setState({showPerson: !show})
  }

  render() {
    const style = {
      backgroundColor: 'white',
      border: '1px solid blue',
      padding: '16px',
      cursor: 'pointer'
    }

    let person = null

    if (this.state.showPerson) {
        person = (
            <div>
                {this.state.persons.map((person, index) => <Person 
                click={() => this.deletePersonHandeler(index)} 
                name={person.name} 
                age={person.age}
                key={person.id} 
                change={(event) => this.changeNameHandeler(event, person.id)} />)}
            </div>
        );
    }

    return (
      <div className="App">
        <h1>Hi, This is a React App.</h1>
        <button style={style} onClick={this.togglePersonHandeler}>Toogle Name</button>
        {person}
      </div>
    );
  }
}

export default App;
