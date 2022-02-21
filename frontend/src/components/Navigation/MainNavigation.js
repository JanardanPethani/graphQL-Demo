import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";

import classes from "./MainNavigation.module.scss";

function MainNavigation() {
  const authContext = useContext(AuthContext);

  return (
    <header className={classes.Header}>
      <div className={classes.Logo}>GrpahQl Event Demo</div>
      <nav className={classes.Nav}>
        <ul>
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
          {!authContext.token && (
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
          )}
          {authContext.token && (
            <Fragment>
              <li>
                <NavLink
                  to="/bookings"
                  className={({ isActive }) =>
                    isActive ? classes.Active : undefined
                  }
                >
                  Your Bookings
                </NavLink>
              </li>
              <li>
                <button
                  className={classes.LogoutBtn}
                  onClick={authContext.logout}
                >
                  Logout
                </button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
