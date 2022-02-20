import React from "react";
import classes from "./Spinner.module.scss";

function Spinner() {
  return (
    <svg className={classes.Spinner} viewBox='0 0 50 50'>
      <circle
        className={classes.Path}
        cx='25'
        cy='25'
        r='20'
        fill='none'
        strokeWidth='5'
      ></circle>
    </svg>
  );
}

export default Spinner;
