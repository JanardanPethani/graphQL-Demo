import React, { Fragment } from "react";
import classes from "./Modal.module.scss";

function Modal({ title, closeHandler, confirmHandler, children }) {
  return (
    <Fragment>
      <div className={classes.BackDrop}></div>
      <div className={classes.Modal}>
        <div className={classes.Title}>{title}</div>
        <div className={classes.Content}>{children}</div>
        <div className={classes.Footer}>
          <button onClick={closeHandler}>Close</button>
          <button onClick={confirmHandler}>Confirm</button>
        </div>
      </div>
    </Fragment>
  );
}

export default Modal;
