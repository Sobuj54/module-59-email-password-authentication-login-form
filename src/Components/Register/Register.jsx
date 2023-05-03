import React, { useState } from "react";
import app from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAuth,
} from "firebase/auth";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    // event.preventDefault() will stop form tag from refreshing the page
    event.preventDefault();
    // collect form data
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    setError("");
    // js regular expression password validation
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Please add at least one uppercase.");
      return;
    } else if (!/(?=.*\d)/.test(password)) {
      setError("Please include at least one number.");
      return;
    } else if (password.length < 6) {
      setError("password must contain at least 6 digit");
      return;
    }

    // create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        // resetting or clearing the input fields in the form
        event.target.reset();
        setSuccess("User has been created successfully.");
        sendVerificationEmail(result.user);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
      });
  };

  const sendVerificationEmail = (user) => {
    sendEmailVerification(user).then((result) => {
      console.log(result);
      alert("please verify your email address.");
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
      <p>
        <small>
          Already have an account ? <Link to="/login">Login</Link>
        </small>
      </p>
      <p className="text-danger">{error}</p>
      <p>{success}</p>
    </div>
  );
};

export default Register;
