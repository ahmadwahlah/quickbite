import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    geoLocation: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: info.name,
          email: info.email,
          password: info.password,
          location: info.geoLocation,
        }),
      });

      const res = await response.json();
      console.log(res);
      if (!res.success) {
        alert("Enter valid credentials");
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
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              name="name"
              autoComplete="true"
              value={info.name}
              onChange={onChange}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="geoLocation" className="form-label">
              Address
            </label>
            <input
              id="geoLocation"
              type="text"
              className="form-control"
              name="geoLocation"
              value={info.geoLocation}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link className="m-3 btn btn-danger" to="/login">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}
