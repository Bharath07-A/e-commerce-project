import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import qrImage from "../assets/qr.jpeg";
import { placeOrder } from "../services/orderService";

export default function CheckoutPage({ cartItems = [], setCartItems }) {
  const [loading, setLoading] = useState(false);
  const [paymentMethod] = useState("qr"); // or "cod" etc.
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((s, it) => s + it.price * it.quantity, 0);

  const handleConfirm = async () => {
    try {
      // Make sure user is logged in
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.access) {
        alert("Please log in to complete payment.");
        navigate("/login");
        return;
      }

      setLoading(true);
      // call backend to create order
      const result = await placeOrder(cartItems, paymentMethod, subtotal);
      // result should contain created order info
      // Clear cart
      if (typeof setCartItems === "function") setCartItems([]);
      setLoading(false);
      // Navigate to success page (or show message)
      navigate("/order-success", { state: { order: result } });
    } catch (err) {
      setLoading(false);
      console.error(err);
      // try to show backend error message if available
      const message = err.response?.data || err.message || "Payment failed";
      alert(typeof message === "string" ? message : JSON.stringify(message));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-lg mt-10 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Payment</h1>
      <p className="text-gray-600 mb-4">Scan the QR code below to complete your payment:</p>

      <div className="flex justify-center">
        <img src={qrImage} alt="Payment QR" className="w-64 h-64 border-4 border-gray-200 rounded-xl shadow-lg" />
      </div>

      <p className="mt-6 text-gray-700 font-medium">After payment, click below to confirm your order.</p>

      <div className="mt-6">
        <button
          onClick={handleConfirm}
          disabled={loading || cartItems.length === 0}
          className={`w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition duration-300 ease-in-out ${loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Confirming..." : `Confirm Payment ($${subtotal.toFixed(2)})`}
        </button>
      </div>
    </div>
  );
}
