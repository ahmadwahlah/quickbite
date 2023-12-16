import React from "react";
import { useState } from "react";

export default function Card({ name, desc, options, src }) {
  //options
  let priceOptions = Object.keys(options);

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
    <div className="d-flex align-items-center justify-content-center">
      {" "}
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          // src="https://source.unsplash.com/random/1920x1080/?burger"
          src={src}
          className="card-img-top"
          alt="..."
          style={{}}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          {/* <p className="card-text">{desc}</p> */}
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
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
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
