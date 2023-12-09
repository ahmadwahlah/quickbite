import React from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <Carousel />
      </div>

      <div className="m-3">
        <Card />
        <Card />
        <Card />
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
