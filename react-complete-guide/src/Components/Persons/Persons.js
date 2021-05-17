import React from "react";
import Person from "./Person/Person";

const persons = (props) =>
  props.persons.map((person, index) => (
    <Person
      click={() => props.clicked(index)}
      name={person.name}
      age={person.age}
      key={person.id}
      change={(event) => props.changed(event, person.id)}
    />
  ));

export default persons;
