import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import app from "../Firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const LogIn = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [truth, setTruth] = useState();
  const emailRef = useRef();

  const handleLogIn = (event) => {
    // stopping form tag from reloading the page
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    // password validation
    // setting error and success to empty string is a must
    setError("");
    setSuccess("");
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Please include at least one uppercase letter.");
      return;
    } else if (!/(?=.*\d)/.test(password)) {
      setError("Password must contain a digit");
      return;
    } else if (password.length < 6) {
      setError("Password must be 6 character long.");
      return;
    }

    // sign in
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setError("");
        setSuccess("Successfully Logged in");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  // handling forget password via email
  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("please provide a valid email address to reset password");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("password reset email sent.");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const seePassword = (isTrue) => {
    if (isTrue) {
      setTruth(isTrue);
    }
  };

  return (
    <div className="w-50 mx-auto">
      <h2>Please log in</h2>
      <form onSubmit={handleLogIn}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            ref={emailRef}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          {/* required prevents empty form submission */}
          <input
            name="password"
            type={truth ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <p>
          <small>
            <button onClick={() => seePassword(true)}>see password</button>
          </small>
        </p>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p>
        <small>
          Forgot password ?{" "}
          <button onClick={handleResetPassword} className="btn btn-link">
            Reset password
          </button>
        </small>
      </p>
      <p>
        <small>
          new to this ? <Link to="/register">Register</Link>
        </small>
      </p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default LogIn;
