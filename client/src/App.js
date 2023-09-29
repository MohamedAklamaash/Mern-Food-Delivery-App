import React from 'react'
import Home from './pages/Home'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from "./pages/SignUp"
import Login from './pages/Login';
import {CartProvider} from "./components/ContextReducer.js"
import Cart from './screen/Cart';
import MyOrders from './pages/MyOrders';
const App = () => {
  return (
    <div>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myOrders" element={<MyOrders/>} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App