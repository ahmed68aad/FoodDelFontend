import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useState } from "react";
import Login from "./components/login/login";
import Cart from "./pages/cart/Cart";
import Placeorder from "./pages/placeorder/Placeorder";
import Verify from "./pages/verify/Verify";
import Myorders from "./pages/myorders/Myorders";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/order" element={<Placeorder />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/myOrders" element={<Myorders />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;