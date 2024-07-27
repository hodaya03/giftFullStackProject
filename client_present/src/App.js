import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { UserProvider } from "./components/UserContext";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Product from "./components/Product";
import Payment from "./components/Payment";
import Gift from "./components/Gifts";
import CreatingBusinessAccount from "./components/CreatingBusinessAccount";
import CategoryDetails from "./components/CategoryDetails";
import BuyGift from "./components/BuyGift";

function App() {
  return (
    <div className="App">
      <UserProvider>
        {/* <Router> */}
        <Routes>
          <Route path="/login" index element={<LogIn />} />
          <Route path="/home/payment" element={<Payment />} />
          <Route path="/home/product" element={<Product />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/gift/:idGift" element={<Gift />} />
          <Route
            path="/creatingBusinessAccount"
            element={<CreatingBusinessAccount />}
          />
          <Route path="/category/:name" element={<CategoryDetails />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/home/buyGift" element={<BuyGift />} />
          <Route path="/checkout" element={<Payment />} />
          <Route index element={<Navigate to="/login" />} />
        </Routes>
        {/* </Router> */}
      </UserProvider>
    </div>
  );
}

export default App;
