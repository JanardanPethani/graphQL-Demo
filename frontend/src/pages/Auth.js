import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";

import classes from "./Auth.module.scss";

// Define mutation
const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      _id
      email
    }
  }
`;

function Auth() {
  const email = useRef(null);
  const password = useRef(null);
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const submitHandler = (e) => {
    e.preventDefault();
    createUser({
      variables: {
        email: email.current.value,
        password: password.current.value,
      },
    });
  };

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

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
        <button type="button">Sign-up</button>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default Auth;
