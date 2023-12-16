import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  const [search, setSearch] = useState("");

  const [foodItems, setFoodItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    food_items();
    food_categories();
  }, []);

  const food_items = async () => {
    let response = await fetch("http://localhost:8080/api/food_items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    // console.log(response);
    setFoodItems(response);
  };

  const food_categories = async () => {
    let responseCategories = await fetch(
      "http://localhost:8080/api/food_categories",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    responseCategories = await responseCategories.json();
    // console.log(responseCategories);
    setFoodCategories(responseCategories);
  };
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <Carousel search={search} setSearch={setSearch} />
      </div>

      <div className="container">
        {foodCategories != []
          ? foodCategories.map((data) => {
              return (
                <div key={data._id} className="row mb-3 ">
                  <div className="fs-3 my-3">{data.CategoryName}</div>
                  <hr />
                  {foodItems != []
                    ? foodItems
                        .filter((item) => {
                          return (
                            item.CategoryName === data.CategoryName &&
                            item.name
                              .toLowerCase()
                              .includes(search.toLocaleLowerCase())
                          );
                        })
                        .map((filterItems) => {
                          return (
                            <div
                              key={filterItems._id}
                              className="col-12 col-md-6 col-lg-3 "
                            >
                              <Card
                                name={filterItems.name}
                                desc={filterItems.description}
                                options={filterItems.options[0]}
                                src={filterItems.img}
                              />
                            </div>
                          );
                        })
                    : []}
                </div>
              );
            })
          : []}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
