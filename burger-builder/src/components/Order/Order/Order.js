import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  const ingredients = [];
  for (let ing in props.ingredients) {
    ingredients.push({ name: ing, amt: props.ingredients[ing] });
  }

  const ingOutput = ingredients.map((ig) => (
    <span key={ig.name}
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}>
      {ig.name} ({ig.amt})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingOutput}</p>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default order;
