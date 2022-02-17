import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.scss";

function MainNavigation() {
  return (
    <header className={classes.Header}>
      <div className={classes.Logo}>GrpahQl Event Demo</div>
      <nav className={classes.Nav}>
        <ul>
          <li>
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                isActive ? classes.Active : undefined
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.Active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                isActive ? classes.Active : undefined
              }
            >
              Bookings
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
