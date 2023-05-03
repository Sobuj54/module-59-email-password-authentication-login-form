import React, { useState } from "react";
import app from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    // event.preventDefault() will stop form tag from refreshing the page
    event.preventDefault();
    // collect form data
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
    // create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
      });
  };

  const handleEmailChange = (event) => {
    //setEmail(event.target.value);
  };

  const handlePasswordOnBlur = (event) => {
    // console.log(event.target.value);
  };

  return (
    <div className="w-50 mx-auto">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="p-2 mb-2 rounded w-50"
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          placeholder="email"
          required
        />
        <br />
        <input
          className="p-2 mb-2 rounded w-50"
          onBlur={handlePasswordOnBlur}
          type="password"
          name="password"
          id="password"
          placeholder="password"
          required
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
      <p className="text-danger">{error}</p>
    </div>
  );
};

export default Register;
