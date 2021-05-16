import React from 'react';
import styled from 'styled-components';
// import './Person.css';

const StyleDiv = styled.div`
    width: 60%;
    margin: 10px auto;
    padding: 16px;
    text-align: center;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    
    @media (min-width: 500px) {
        width: 450px;
    }
`;

const person = (props) => {
    return (
        <StyleDiv>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <input onChange={props.change} type='text' value={props.name}/>
        </StyleDiv>
    )

};

export default person;