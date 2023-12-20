import "./App.css";
// import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import { CartProvider } from "./contexts/ContextReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
