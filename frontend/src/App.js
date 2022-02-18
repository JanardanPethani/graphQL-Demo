import { Fragment, useState } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import AuthContext from "./context/auth-context";

import classes from "./App.module.scss";

import AuthPage from "./pages/Auth";
import Events from "./pages/Events";
import Bookings from "./pages/Bookings";
import MainNavigation from "./components/Navigation/MainNavigation";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = ({ token, userId, tokenExpiration }) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    setUserId(userId);
    setToken(token);
  };
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setToken(null);
    setUserId(null);
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ token, userId, login, logout }}>
        <MainNavigation />
        <main className={classes.Main}>
          <Routes>
            {!token && (
              <Fragment>
                <Route path="/" exact element={<Navigate to="/auth" />} />
                <Route
                  path="/bookings"
                  exact
                  element={<Navigate to="/auth" />}
                />
                <Route path="/auth" element={<AuthPage />} />
              </Fragment>
            )}
            {token && (
              <Fragment>
                <Route path="/" exact element={<Navigate to="/events" />} />
                <Route path="/auth" exact element={<Navigate to="/events" />} />
                <Route path="/bookings" element={<Bookings />} />
              </Fragment>
            )}
            <Route path="/events" element={<Events />} />
          </Routes>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
