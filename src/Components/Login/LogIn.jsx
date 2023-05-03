import React, { useState } from "react";

const LogIn = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
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
      <p className="text-danger">{error}</p>
    </div>
  );
};

export default LogIn;
