import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { login, logout, getUser } from "./services/authService";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import "./App.css";

// ------------------- Main App -------------------
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // Check logged-in user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setUser(data);
    };
    fetchUser();
  }, []);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <Router>
      <div>
        {/* ------------------- HEADER ------------------- */}
        <header className="header">
          <div className="container header-content">
            <Link to="/" className="logo">
              Shoppy
            </Link>
            <nav className="nav">
              {/* Cart */}
              <Link to="/cart">
                Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </Link>

              {/* Authentication Links */}
              {user ? (
                <>
                  <span className="welcome">Hi, {user.username}</span>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Sign In</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </nav>
          </div>
        </header>

        {/* ------------------- ROUTES ------------------- */}
        <main className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route
              path="/products/:id"
              element={<ProductDetails addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />}
            />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/checkout"
              element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />}
            />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// ------------------- ProductList -------------------
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/products/");
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Our Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/products/${product._id}`}>
                <img
                  src={`https://placehold.co/200x150?text=${product.name}`}
                  alt={product.name}
                />
              </Link>
              <h3>{product.name}</h3>
              <p>{product.description.substring(0, 50)}...</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <Link className="btn-outline" to={`/products/${product._id}`}>
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ------------------- ProductDetails -------------------
function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/products/${id}/`
        );
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load product.");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart!");
  };

  return (
    <div className="product-details">
      <img
        src={`https://placehold.co/400x300?text=${product.name}`}
        alt={product.name}
      />
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

// ------------------- Cart Page -------------------
function CartPage({ cartItems, setCartItems }) {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-table">
          <div className="cart-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>Action</span>
          </div>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-row">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
              <span>
                <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                {item.quantity}
                <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <span>
                <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
              </span>
            </div>
          ))}
          <h3 className="subtotal">Subtotal: ${subtotal.toFixed(2)}</h3>
          <Link className="btn" to="/checkout">
            Proceed to Payment
          </Link>
        </div>
      )}
    </div>
  );
}

// ------------------- Login Page -------------------
function LoginPage({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      const userData = await getUser();
      setUser(userData);
      navigate("/");
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
