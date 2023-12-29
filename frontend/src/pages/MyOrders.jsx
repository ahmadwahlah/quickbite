import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function MyOrders() {
  const [orderData, setOrderData] = useState("");
  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("email"));
    await fetch("http://localhost:8080/api/orderHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
      }),
    }).then(async (res) => {
      let response = await res.json();

      setOrderData(response);
      //   console.log(response);
      //   console.log(response.orderData.order_data);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);
  return (
    <>
      {" "}
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="row mb-5">
          {orderData.length !== 0
            ? Array(orderData).map((data) => {
                return data.orderData
                  ? data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData, i) => {
                          if (arrayData.Order_date) {
                            // Display full row for date
                            return (
                              <div key={i} className="m-auto mt-5">
                                <div className="ms-2 fs-5">
                                  {(data = arrayData.Order_date)}
                                </div>
                                <hr className="bg-success" />
                              </div>
                            );
                          } else {
                            // Display three items in one row with spacing
                            return (
                              <div
                                key={i}
                                className="col-12 col-md-6 col-lg-3 d-flex align-items-center justify-content-center "
                              >
                                <div
                                  className="card mt-3 border-success"
                                  style={{ width: "95%", maxHeight: "" }}
                                >
                                  <img
                                    src={arrayData.img}
                                    className="card-img-top"
                                    alt="..."
                                  />
                                  <div className="card-body">
                                    <h5 className="card-title fs-5">
                                      {arrayData.name}
                                    </h5>
                                    <div className="container  p-0 d-flex justify-content-between">
                                      <div className="d">
                                        <span className=" fs-6">
                                          {arrayData.qty}
                                        </span>
                                        <span className="ms-2 fs-6">
                                          {arrayData.size}
                                        </span>
                                      </div>
                                      <div className="ms-2 h-100  fs-6">
                                        PKR {arrayData.price}/-
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        });
                      })
                  : "";
              })
            : ""}
          {!orderData.orderData && (
            <div className="text-center my-5 fs-2 text-success">
              <div className="m-5"></div>
              No orders yet. Explore our menu and start ordering!
            </div>
          )}
        </div>
      </div>
    </>
  );
}
