import React from "react";
import { useState } from "react";

export default function Card() {
  // setting quantity of items
  const [value, setValue] = useState(1);

  const increment = () => {
    if (value < 9) {
      setValue((prevValue) => prevValue + 1);
    }
  };

  const decrement = () => {
    if (value > 1) {
      setValue((prevValue) => prevValue - 1);
    }
  };
  return (
    <div>
      {" "}
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src="https://source.unsplash.com/random/1920x1080/?burger"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick</p>
          <div className="container h-100 w-100 ">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-success btn-sm p-2"
                onClick={decrement}
                disabled={value <= 1}
              >
                -
              </button>
              <span className="h4 m-2">{value}</span>
              <button
                className="btn btn-success btn-sm p-2"
                onClick={increment}
                disabled={value >= 9}
              >
                +
              </button>
              <select className="mx-5 p-2 h-100 bg-success rounded text-white">
                <option key={"Half"} value={"Half"}>
                  Half
                </option>
                <option key={"Full"} value={"Full"}>
                  Full
                </option>
              </select>
            </div>
            <div className="container"></div>
            <div className="d-flex my-2 h-100 fs-5">Total Price</div>
          </div>
        </div>
      </div>
    </div>
  );
}
