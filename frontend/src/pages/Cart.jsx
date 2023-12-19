import React from "react";
import { useCart, useDispatchCart } from "../contexts/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <>
        <div className="m-5 w-100 text-success text-center fs-3">
          The Cart is Empty!
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
      dispatch({ type: "DROP" });
    }
  };

  return (
    <>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md text-white">
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
                    <img
                      src=""
                      alt="delete"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 mt-2"> Total Price : PKR {totalPrice}/-</h1>
        </div>
        <div>
          <button
            className="btn bg-success mt-4 text-white"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>
    </>
  );
}
