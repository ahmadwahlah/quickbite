import React, { useState } from "react";
import { useCart, useDispatchCart } from "../contexts/ContextReducer";

import { MdDelete } from "react-icons/md";

export default function Cart() {
  const [snackbarData, setSnackbarData] = useState({
    showSnackbar: false,
    message: "",
    success: false,
  });

  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <>
        <div className="my-5 w-100 text-success text-center fs-2">
          Your Cart is Empty!
        </div>
      </>
    );
  }
  let totalPrice = data.reduce((total, food) => {
    return total + food.price;
  }, 0);

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("email");
    const response = await fetch("http://localhost:8080/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    console.log("Order Response: ", response.json());
    if (response.status === 200) {
      setSnackbarData({
        showSnackbar: true,
        message: "Thank you! Your order is confirmed.",
        success: true,
      });
      setTimeout(() => {
        setSnackbarData({ showSnackbar: false, message: "" });
        dispatch({ type: "DROP" });
      }, 2000);
    }
  };

  return (
    <>
      <div
        className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md text-white"
        style={{ height: "80%", overflowY: "auto" }}
      >
        <table className="table">
          <thead
            className="text-success fs-4"
            style={{ borderBottom: "2px solid white" }}
          >
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr
                className="text-white"
                key={index}
                style={{ transition: "color 0.3s", ":hover": { color: "red" } }}
              >
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <MdDelete
                      size={24}
                      style={{
                        color: "#cc0000",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                        setSnackbarData({
                          showSnackbar: true,
                          message: "Item successfully removed from your cart.",
                          success: false,
                        });
                        setTimeout(() => {
                          setSnackbarData({ showSnackbar: false, message: "" });
                        }, 2000);
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 mt-4"> Total Price : PKR {totalPrice}/-</h1>
        </div>
        <div>
          <button
            className="btn bg-success mt-3 mb-4 text-white"
            onClick={handleCheckOut}
            style={{
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Check Out
          </button>
        </div>
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
