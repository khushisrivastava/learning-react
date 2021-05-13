import React from 'react';
import './Person.css';

const person = (props) => {
    return (
        <div className='Person'>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <input onChange={props.change} type='text'/>
        </div>
    )

};

export default person;