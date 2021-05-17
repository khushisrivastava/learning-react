import React from "react";
import styled from "styled-components";

import "./Cockpit.css";

const StyledButton = styled.button`
  background-color: ${(props) => (props.alt ? "red" : "green")};
  color: white;
  border: 1px solid blue;
  padding: 16px;
  font: inherit;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.alt ? "salmon" : "lightgreen")};
    color: black;
  }
`;

const cockpit = (props) => {
  const classes = [];
  if (props.persons.length <= 2) classes.push("red");
  if (props.persons.length <= 1) classes.push("bold");
  
  return (
    <div>
      <h1>Hi, This is a React App.</h1>
      <p className={classes.join(" ")}>This is working!</p>
      <StyledButton alt={props.showPerson} onClick={props.clicked}>
        Toogle Name
      </StyledButton>
    </div>
  );
};

export default cockpit;
