import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    // event.preventDefault() will stop form tag from refreshing the page
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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
        />
        <br />
        <input
          className="p-2 mb-2 rounded w-50"
          onBlur={handlePasswordOnBlur}
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
