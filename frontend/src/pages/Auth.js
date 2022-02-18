import React, { useContext, useEffect, useRef, useState } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";

import AuthContext from "../context/auth-context";

import classes from "./Auth.module.scss";

// Register user in db
const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      _id
      email
    }
  }
`;

// Login user
const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

function Auth() {
  const email = useRef(null);
  const password = useRef(null);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [login, { loading: loginLoading, error: loginErr, data: loginData }] =
    useLazyQuery(LOGIN_USER);
  const [
    createUser,
    { data: createdUserData, loading: createUserLoading, error: createUserErr },
  ] = useMutation(CREATE_USER);

  const authContext = useContext(AuthContext);

  const switchHandler = (e) => {
    setIsLoginPage((prev) => !prev);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (isLoginPage) {
      login({
        variables: {
          email: email.current.value,
          password: password.current.value,
        },
      });
    } else if (!isLoginPage) {
      createUser({
        variables: {
          email: email.current.value,
          password: password.current.value,
        },
      });
    }
  };

  useEffect(() => {
    if (loginData) {
      authContext.login({
        token: loginData.login.token,
        userId: loginData.login.userId,
        tokenExpiration: loginData.login.tokenExpiration,
      });
    }
  }, [loginData]);

  if (loginLoading || createUserLoading) return "Submitting...";

  if (loginErr) return `Login error! : ${loginErr.message}`;
  if (createUserErr) return `Registration error! : ${createUserErr.message}`;

  return (
    <form className={classes.Form} onSubmit={submitHandler}>
      <div className={classes.FormControl}>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" ref={email} />
      </div>
      <div className={classes.FormControl}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={password} />
      </div>
      <div className={classes.FormActions}>
        <button type="button" onClick={switchHandler}>
          {isLoginPage ? "Switch to Sign-up" : "Switch to Login"}
        </button>
        <button type="submit">{isLoginPage ? "Login" : "Sign-up"}</button>
      </div>
    </form>
  );
}

export default Auth;
