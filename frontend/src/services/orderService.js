// src/services/orderService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/"; // adjust if your backend host/port differs

function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.access;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/*
payload shape expected by backend (based on your api/addOrder implementation):
{
  orderItems: [{ product: product_id, quantity: <int>, price: <decimal> }, ...],
  paymentMethod: "cod" | "card" | ...,
  totalPrice: 123.45
}
*/
export const placeOrder = async (cartItems, paymentMethod, totalPrice) => {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const payload = {
    orderItems: cartItems.map((c) => ({
      product: c._id,      // matches your API expectation
      quantity: c.quantity,
      price: c.price,
    })),
    paymentMethod,
    totalPrice,
  };

  const res = await axios.post(`${API_URL}orders/add/`, payload, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
  return res.data;
};
