import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [snackbarData, setSnackbarData] = useState({
    showSnackbar: false,
    message: "",
    success: false,
  });
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    geoLocation: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    geoLocation: "",
  });

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    return password.length >= 5;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(info.email)) {
      setErrors({ ...errors, email: "Invalid email address" });
      return;
    }
    if (!validatePassword(info.password)) {
      setErrors({
        ...errors,
        password: "Invalid password",
      });
      return;
    }
    // Reset errors
    setErrors({ email: "", password: "" });

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

      if (!res.success) {
        // Check for specific error messages from the server
        if (res.errors && res.errors.length > 0) {
          const errorMessage = res.errors[0].msg;
          setSnackbarData({
            showSnackbar: true,
            message: errorMessage,
            success: false,
          });
        } else if (res.error && res.error.includes("email")) {
          setSnackbarData({
            showSnackbar: true,
            message: "Email already exists. Please use a different email.",
            success: false,
          });
        } else {
          setSnackbarData({
            showSnackbar: true,
            message: "An unexpected error occurred. Please try again.",
            success: false,
          });
        }
      } else {
        setSnackbarData({
          showSnackbar: true,
          message: "User successfully created!",
          success: true,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2250);
      }
    } catch (error) {
      console.error("Error creating user: ", error);
      setSnackbarData({
        showSnackbar: true,
        message: "An unexpected error occurred. Please try again later.",
        success: false,
      });
    } finally {
      // Always hide the snackbar after a delay
      setTimeout(() => {
        setSnackbarData({ showSnackbar: false, message: "" });
      }, 2000);
    }
  };

  const onChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container mt-4 mt-md-5 d-md-flex ">
        <div className="col-md-3"></div>
        <form onSubmit={handleSubmit} className="mt-lg-5 col-md-6">
          <h1 className="text-center h1">Sign Up</h1>
          <div className="mb-3 mt-2 mt-lg-4">
            <label htmlFor="name" className="form-label">
              Name*
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              name="name"
              autoComplete="true"
              value={info.name}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address*
            </label>
            <input
              id="email"
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              autoComplete="true"
              value={info.email}
              aria-describedby="emailHelp"
              onChange={onChange}
              required
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password*
            </label>
            <input
              id="password"
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              autoComplete="true"
              value={info.password}
              onChange={onChange}
              required
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="geoLocation" className="form-label">
              Address*
            </label>
            <input
              id="geoLocation"
              type="text"
              className="form-control"
              name="geoLocation"
              value={info.geoLocation}
              onChange={onChange}
              required
            />
          </div>
          <button
            type="submit"
            className="my-3 me-3 btn btn-success"
            style={{
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Sign Up
          </button>
          <Link
            className="my-3 btn btn-danger"
            to="/login"
            style={{
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Already a user
          </Link>
        </form>
      </div>

      {/* SnackBar */}
      <div
        className={`toast m-3 m-md-4 position-fixed bottom-0 start-0 text-white ${
          snackbarData.success ? "bg-success" : "bg-danger"
        }  ${snackbarData.showSnackbar ? "show" : ""}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{snackbarData.message}</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() =>
              setSnackbarData({ showSnackbar: false, message: "" })
            }
          ></button>
        </div>
      </div>
    </>
  );
}
