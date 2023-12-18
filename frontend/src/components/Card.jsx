import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatchCart, useCart } from "../contexts/ContextReducer";

export default function Card({ foodItem, options }) {
  const [value, setValue] = useState(1);
  const [size, setSize] = useState("");

  let dispatch = useDispatchCart();
  let data = useCart();

  // final price
  let finalPrice = value * parseInt(options[size]);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }

    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: value,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          img: foodItem.img,
          price: finalPrice,
          qty: value,
          size: size,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      img: foodItem.img,
      price: finalPrice,
      qty: value,
      size: size,
    });
    // console.log(data);
  };
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  //  size of item
  let priceOptions = Object.keys(options);
  const priceRef = useRef();
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  //  quantity of item
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
      <div className="card mt-3" style={{ width: "20rem", maxHeight: "" }}>
        <img
          // src="https://source.unsplash.com/random/1920x1080/?burger"
          src={foodItem.img}
          className="card-img-top"
          alt="..."
          style={{}}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          {/* <p className="card-text">{foofItem.description}</p> */}
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
              <select
                className="mx-5 p-2 h-100 bg-success rounded text-white"
                ref={priceRef}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              >
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
            <div className="d-flex my-2 h-100 fs-5">PKR {finalPrice}/-</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
