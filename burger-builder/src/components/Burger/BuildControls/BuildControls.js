import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const CONTROLS = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>${props.price.toFixed(2)}</strong>
    </p>
    {CONTROLS.map((ctrl) => (
      <BuildControl
        add={() => props.add(ctrl.type)}
        remove={() => props.remove(ctrl.type)}
        key={ctrl.label}
        label={ctrl.label}
        disable={props.disabled[ctrl.type]}
      />
    ))}
    <button className={classes.OrderButton} disabled={props.purchasable}>ORDER NOW</button>
  </div>
);

export default buildControls;
