import React from "react";

export default function Carousel({ search, setSearch }) {
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" style={{ maxHeight: "600px" }}>
          <div className="carousel-caption" style={{ zIndex: "2" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                aria-label="Search"
              />
              {/* <button
                className="btn btn-outline-success text-white bg-success"
                type="submit"
              >
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img
              // src="https://source.unsplash.com/random/1800x600/?burger"
              src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1800&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1558030137-a56c1b004fa3?q=80&w=1800&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://plus.unsplash.com/premium_photo-1667682942148-a0c98d1d70db?q=80&w=1800&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1605807646983-377bc5a76493?q=80&w=1800&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
