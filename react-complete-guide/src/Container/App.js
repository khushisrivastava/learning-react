import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import Person from '../Components/Persons/Person/Person';


const StyledButton = styled.button` 
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  border: 1px solid blue;
  padding: 16px;
  font: inherit;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color: black;
  }
`;

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Khushi', age: 21 },
      { id: 2, name: 'Lavanya', age: 13 },
      { id: 3, name: 'Arti', age: 47 }
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

    const classes = [];
    if (this.state.persons.length <= 2) classes.push('red')
    if (this.state.persons.length <= 1) classes.push('bold')

    return (
      <div className="App">
        <h1>Hi, This is a React App.</h1>
        <p className={classes.join(' ')}>This is working!</p>
        <StyledButton alt={this.state.showPerson} onClick={this.togglePersonHandeler}>Toogle Name</StyledButton>
        {person}
      </div>
    );
  }
}

export default App;
