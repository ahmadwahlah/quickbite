import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "./Modal";

import Cart from "../pages/Cart";
import { useCart } from "../contexts/ContextReducer";

export default function Navbar() {
  const [cartView, setCartView] = useState();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    navigate("/login");
  };

  let data = useCart();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            QuickBite
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
              ) : (
                ""
              )}
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myorders"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                {/* <Link className="btn bg-white text-success mx-1" to="/login ">
                  Login
                </Link>

                <Link className="btn bg-white text-success mx-1" to="/signup ">
                  SignUp
                </Link> */}
              </div>
            ) : (
              <div className="d-flex">
                <Link
                  className="btn bg-white text-success mx-1"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  My Cart
                  <Badge className="ms-2" pill bg="danger">
                    {data.length}
                  </Badge>
                </Link>
                {cartView ? (
                  <Modal
                    onClose={() => {
                      setCartView(false);
                    }}
                  >
                    <Cart />
                  </Modal>
                ) : null}
                <Link
                  className="btn bg-white text-danger mx-1"
                  to="/login"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
