import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [snackbarData, setSnackbarData] = useState({
    showSnackbar: false,
    message: "",
  });
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
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

    // Validate email and password before submitting
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

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 400) {
          // Validation errors or incorrect credentials
          setSnackbarData({
            showSnackbar: true,
            message:
              // errorData.errors[0].msg ||
              "Invalid credentials. Please try again!",
          });
        } else {
          // Other server errors
          setSnackbarData({
            showSnackbar: true,
            message: "Unable to process your request. Please try again later.",
          });
        }
        return;
      }

      const res = await response.json();

      if (!res.success) {
        // Authentication error
        setSnackbarData({
          showSnackbar: true,
          message: "Invalid credentials. Please try again!",
        });
      } else {
        localStorage.setItem("email", info.email);
        localStorage.setItem("authToken", res.authToken);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setSnackbarData({
        showSnackbar: true,
        message: "An unexpected error occurred. Please try again later.",
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
          <h1 className="text-center h1">Sign In</h1>
          <div className="mb-3 mt-2 mt-lg-4">
            <label htmlFor="email" className="form-label">
              Email Address
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
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              autoComplete="true"
              value={info.password}
              onChange={onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
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
            Sign In
          </button>
          <Link
            className="my-3 btn btn-danger"
            to="/signup"
            style={{
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            I'm a new user
          </Link>
        </form>
      </div>

      {/* SnackBar */}
      <div
        className={`toast m-3 m-md-4 position-fixed bottom-0 start-0 text-white bg-danger ${
          snackbarData.showSnackbar ? "show" : ""
        }`}
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
