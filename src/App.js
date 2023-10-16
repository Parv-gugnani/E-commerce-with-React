import React, { Component } from "react";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Context from "./Context";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductList from "./components/ProductList";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      cart: {},
      products: [],
      showMenu: false,
    };

    this.routerRef = React.createRef();
  }

  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user) {
      this.setState({ user: JSON.parse(user) });
    }
  }

  removeFromCart = () => {
    // Implement the removeFromCart function
  };

  addToCart = () => {
    // Implement the addToCart function
  };

  addProduct = () => {
    // Implement the addProduct function
  };

  clearCart = () => {
    // Implement the clearCart function
  };

  checkout = () => {
    // Implement the checkout function
  };

  login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      if (res.status === 200) {
        const { email } = jwt_decode(res.data.accessToken);
        const user = {
          email,
          token: res.data.accessToken,
          accessLevel: email === "admin@example.com" ? 0 : 1,
        };

        this.setState({ user });
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  logout = (e) => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
          logout: this.logout,
        }}
      >
        <Router ref={this.routerRef}>
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
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ showMenu: !this.state.showMenu });
                  }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </label>
              </div>
              <div
                className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}
              >
                <Link to="/products" className="navbar-item">
                  Products
                </Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Link to="/add-product" className="navbar-item">
                    Add Product
                  </Link>
                )}
                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>
                {!this.state.user ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                ) : (
                  <Link to="/" onClick={this.logout} className="navbar-item">
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
}
