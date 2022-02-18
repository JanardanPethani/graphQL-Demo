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
                <button
                  className={classes.LogoutBtn}
                  onClick={() => {
                    authContext.logout();
                  }}
                >
                  Logout
                </button>
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
            </Fragment>
          )}
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
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
