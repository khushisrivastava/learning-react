import React, { Component } from "react";
import "./App.css";
import Persons from "../Components/Persons/Persons";
import Cockpit from "../Components/Cockpit/Cockpit";

class App extends Component {
  state = {
    persons: [
      { id: 1, name: "Khushi", age: 21 },
      { id: 2, name: "Lavanya", age: 13 },
      { id: 3, name: "Arti", age: 47 },
    ],
  };

  deletePersonHandeler = (personIndex) => {
    // const persons = this.state.persons.slice()
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  changeNameHandeler = (event, personId) => {
    const personIndex = this.state.persons.findIndex((p) => p.id === personId);
    const persons = [...this.state.persons];
    persons[personIndex].name = event.target.value;
    this.setState({ persons: persons });
  };

  togglePersonHandeler = () => {
    const show = this.state.showPerson;
    this.setState({ showPerson: !show });
  };

  render() {
    let person = null;

    if (this.state.showPerson) {
      person = (
        <Persons
          persons={this.state.persons}
          changed={this.changeNameHandeler}
          clicked={this.deletePersonHandeler}
        />
      );
    }

    return (
      <div className="App">
        <Cockpit
          showPerson={this.state.showPerson}
          persons={this.state.persons}
          clicked={this.togglePersonHandeler}
        />
        {person}
      </div>
    );
  }
}

export default App;
