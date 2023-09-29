import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Cart from "../screen/Cart";
import ReactDom from "react-dom";
import { useCart } from "./ContextReducer";
import Modal from "../Modal";

function Navbar(props) {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location = "/login";
  };
  const handleCart = () => {
    setCartView(true);
  };
  
  return (
    <>
    {console.log("Cart-View Globally:",cartView)}
      <nav className="navbar navbar-expand-lg navbar-light bg-ligh">
        <a className="navbar-brand fs-1" href="/">
          FoodApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse d-flex align-content-between  "
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                <span className="sr-only fs-4 ">Home</span>
              </a>
              {localStorage.getItem("authToken") ? (
                <li
                  className="nav-item active"
                  onClick={() => setCartView(true)}
                >
                  <a className="nav-link" href="/myOrders">
                    <span>My Orders</span>
                  </a>
                </li>
              ) : (
                " "
              )}
            </li>
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex align-items-end justify-content-end">
              <ul style={{ listStyle: "none" }}>
                <li className="nav-item active">
                  <a
                    className="nav-link fs-4 btn text-white  btn-success "
                    href="/login"
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/signup"
                    className="nav-link text-white fs-4 btn btn-success  "
                  >
                    SignUp
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex  align-items-end justify-content-end">
              <div onClick={handleCart} className="btn text-bg-danger">
                MyCart{"  "}
                <Badge>{data.length}</Badge>
                {cartView ? (
                  <>
                    <Modal onClose={()=>setCartView(false)} >
                      <Cart />
                    </Modal>
                  </>
                ) : (
                  null
                )}
              </div>

              <div
                className="btn fst-italic text-bg-danger"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
