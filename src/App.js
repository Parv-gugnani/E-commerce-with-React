import React, { useState, useRef } from "react";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";

import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductList from "./components/ProductList";

import Context from "./Context";

function App() {
  const [state, setState] = useState({
    user: null,
    cart: {},
    products: [],
    showMenu: false,
  });

  const routerRef = useRef();

  const removeFromCart = () => {
    // Implement the removeFromCart function
  };

  const addToCart = () => {
    // Implement the addToCart function
  };

  const login = () => {
    // Implement the login function
  };

  const addProduct = () => {
    // Implement the addProduct function
  };

  const clearCart = () => {
    // Implement the clearCart function
  };

  const checkout = () => {
    // Implement the checkout function
  };

  const logout = () => {
    // Implement the logout function
  };

  return (
    <Context.Provider
      value={{
        ...state,
        removeFromCart,
        addToCart,
        login,
        addProduct,
        clearCart,
        checkout,
        logout,
      }}
    >
      <Router ref={routerRef}>
        <div className="App">
          <nav
            className="navbar container"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <b className="navbar-item is-size-4">ecommerce</b>
              <label
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                onClick={() => {
                  setState({ ...state, showMenu: !state.showMenu });
                }}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </label>
            </div>
            <div className={`navbar-menu ${state.showMenu ? "is-active" : ""}`}>
              <Link to="/products" className="navbar-item">
                Products
              </Link>
              {state.user && state.user.accessLevel < 1 && (
                <Link to="/add-product" className="navbar-item">
                  Add Product
                </Link>
              )}
              <Link to="/cart" className="navbar-item">
                Cart
                <span className="tag is-primary" style={{ marginLeft: "5px" }}>
                  {Object.keys(state.cart).length}
                </span>
              </Link>
              {!state.user ? (
                <Link to="/login" className="navbar-item">
                  Login
                </Link>
              ) : (
                <Link to="/" onClick={logout} className="navbar-item">
                  Logout
                </Link>
              )}
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/products" element={<ProductList />} />
          </Routes>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
