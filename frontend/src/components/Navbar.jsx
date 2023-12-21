import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Modal from "./Modal";
import Cart from "../pages/Cart";
import { useCart } from "../contexts/ContextReducer";

// icons
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { IoIosListBox } from "react-icons/io";
import { BsPersonFillAdd } from "react-icons/bs";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";

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
          <Link
            className="navbar-brand fs-1 fst-italic"
            to="/"
            style={{
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
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
                <li className="nav-item ">
                  <Link
                    className="nav-link active d-flex ms-4 px-1 btn bg-success text-white align-items-center  "
                    aria-current="page"
                    to="/"
                    style={{
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <FaHome size={20} className="  me-1" />
                    <div className="fs-6 ">Home</div>
                  </Link>
                </li>
              ) : (
                ""
              )}

              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active d-flex ms-2 px-1 btn bg-success text-white align-items-center"
                    aria-current="page"
                    to="/myorders"
                    style={{
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <IoIosListBox size={20} className="  me-1" />
                    <div className="fs-6 ">Order History</div>
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="d-flex btn bg-white text-success mx-1 align-items-center"
                  to="/login "
                  style={{
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <PiSignInBold size={20} className="  me-1" />
                  <div className="fs-6 "> Sign In</div>
                </Link>

                <Link
                  className="d-flex btn bg-white text-success mx-1 align-items-center"
                  to="/signup "
                  style={{
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <BsPersonFillAdd size={20} className="  me-1" />
                  <div className="fs-6 "> Sign Up</div>
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <Link
                  className="d-flex align-items-center btn bg-white text-success mx-2 position-relative"
                  onClick={() => {
                    setCartView(true);
                  }}
                  style={{
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <FaShoppingCart size={20} className="  me-1" />
                  <div className="fs-6 "> Cart</div>
                  {data.length > 0 ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {data.length}
                    </span>
                  ) : (
                    ""
                  )}
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
                  className="d-flex align-items-center btn bg-white text-danger mx-2"
                  to="/login"
                  onClick={handleLogout}
                  style={{
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <PiSignOutBold size={20} className="  me-1" />
                  <div className="fs-6 "> Logout</div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
