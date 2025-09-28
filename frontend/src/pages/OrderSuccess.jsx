import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function OrderSuccess() {
  const loc = useLocation();
  const order = loc.state?.order;

  return (
    <div className="text-center mt-20 p-8 bg-white rounded-3xl shadow-lg max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-green-600 mb-4">✅ Order confirmed!</h1>
      <p className="text-gray-700 mb-4">
        {order?.order_id ? `Order #${order.order_id} placed successfully.` : "Your order was placed successfully."}
      </p>
      <Link to="/" className="bg-blue-600 text-white py-2 px-6 rounded">
        Back to Shop
      </Link>
    </div>
  );
}
