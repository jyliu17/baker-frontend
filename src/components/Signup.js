import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignUp({ setCurrentUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // POST /signup
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.errors) {
      
          setErrors(data.errors);
        } else {
          setCurrentUser(data);
          history.push("/bakers");
        }
      });
  }

  const { username, password } = formData;

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h1>Signup</h1>

      <label>Username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={handleChange}
      />

      {errors.map((error) => {
        return <p key={error}>{error}</p>;
      })}
      <input type="submit" value="Signup" />
    </form>
  );
}

export default SignUp;