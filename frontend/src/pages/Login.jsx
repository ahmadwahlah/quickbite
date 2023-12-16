import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: info.email,
          password: info.password,
        }),
      });

      const res = await response.json();
      console.log(res);

      if (!res.success) {
        alert("Enter valid credentials");
      } else {
        localStorage.setItem("authToken", res.authToken);
        navigate("/");
      }
    } catch (error) {
      console.log("Error creating user: ", error);
    }
  };

  const onChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              name="email"
              autoComplete="true"
              value={info.email}
              aria-describedby="emailHelp"
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              name="password"
              autoComplete="true"
              value={info.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link className="m-3 btn btn-danger" to="/signup">
            I'm a new user
          </Link>
        </form>
      </div>
    </>
  );
}
