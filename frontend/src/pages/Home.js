import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <Card />
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
