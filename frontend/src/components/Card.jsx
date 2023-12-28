import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatchCart, useCart } from "../contexts/ContextReducer";

export default function Card({ foodItem, options }) {
  const [snackbarData, setSnackbarData] = useState({
    showSnackbar: false,
    message: "",
    success: false,
  });
  const [value, setValue] = useState(1);
  const [size, setSize] = useState("");

  let dispatch = useDispatchCart();
  let data = useCart();

  // final price
  let finalPrice = value * parseInt(options[size]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setSnackbarData({
        showSnackbar: true,
        message: "Please sign in to add items to the cart.",
        success: false,
      });
      setTimeout(() => {
        setSnackbarData({ showSnackbar: false, message: "" });
      }, 2000);
      return;
    }

    const matchingItemIndex = data.findIndex(
      (item) => item.id === foodItem._id
    );

    if (matchingItemIndex !== -1) {
      // If any item with the same ID exists, check if any has the same size
      const matchingSizeIndex = data.findIndex(
        (item) => item.id === foodItem._id && item.size === size
      );

      if (matchingSizeIndex !== -1) {
        // If an item with the same ID and size exists, update its quantity and price
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: value,
          size: size,
        });
      } else {
        // If no item with the same size exists, add a new item with the specified size and price
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          img: foodItem.img,
          price: finalPrice,
          qty: value,
          size: size,
        });
      }
    } else {
      // If no item with the same ID exists, add a new item with the specified size and price
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        img: foodItem.img,
        price: finalPrice,
        qty: value,
        size: size,
      });
    }

    // console.log(data);
    setSnackbarData({
      showSnackbar: true,
      message: "Item successfully added to the cart.",
      success: true,
    });
    setTimeout(() => {
      setSnackbarData({ showSnackbar: false, message: "" });
    }, 1800);
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
    <>
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
            <h5 className=" card-title fs-5 ms-2">{foodItem.name}</h5>
            {/* <p
            className="card-text"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 1,
            }}
          >
            {foodItem.description}
          </p> */}
            <div className=" h-100 w-100 ms-2">
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-success btn-sm fs-6 "
                  onClick={decrement}
                  disabled={value <= 1}
                >
                  -
                </button>
                <span className="h4 m-2 fs-5">{value}</span>
                <button
                  className="btn btn-success btn-sm fs-6"
                  onClick={increment}
                  disabled={value >= 9}
                >
                  +
                </button>
                <select
                  className="mx-5 py-1 h-100 bg-success rounded text-white fs-6"
                  ref={priceRef}
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                >
                  {priceOptions.map((data) => {
                    return (
                      <option className="fs-6" key={data} value={data}>
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
              style={{
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Add to Cart
            </button>
          </div>
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
        style={{ zIndex: 1000 }}
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
