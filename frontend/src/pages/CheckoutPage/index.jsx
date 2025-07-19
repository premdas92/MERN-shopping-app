import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartThunk } from "../../slices/cartSlice";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

 // Redirect to /products if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/products");
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    cartItems.forEach((item) => {
      dispatch(clearCartThunk({ productId: item.productId }));
    });

    setOrderPlaced(true);

    setTimeout(() => {
      navigate("/products");
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center animate-bounce">
          <h1 className="text-3xl font-bold text-green-600 mb-3">
            ✅ Order Placed Successfully!
          </h1>
          <p className="text-gray-600 text-lg">Thanks for shopping with us 🎉</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Cart Preview */}
      <div className="mb-8 space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 border rounded-lg p-3 shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md border"
            />
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-600">
                ₹{item.price} × {item.quantity}
              </p>
            </div>
            <span className="font-semibold text-indigo-700">
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}

        <div className="flex justify-between font-semibold border-t pt-3 text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Address Form */}
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-sm"
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-sm"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded shadow-sm"
        />
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={cartItems.length === 0}
        className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition shadow-md cursor-pointer"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
