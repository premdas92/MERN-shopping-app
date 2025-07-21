import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartThunk } from "../../slices/cartSlice";
import { placeOrderThunk } from "../../slices/orderSlice";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValidAddress = (address) => {
    const cleaned = address.trim();
    return cleaned.length >= 10 && /[a-zA-Z]/.test(cleaned);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.trim());
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name";
    }

    if (!isValidAddress(formData.address)) {
      newErrors.address =
        "Please enter a valid address (at least 10 characters)";
    }

    if (!isValidPhone(formData.phone)) {
      newErrors.phone =
        "Please enter a valid 10-digit phone number starting with 6-9";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const orderPayload = {
    cartItems: cartItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    })),
    shippingDetails: {
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
    },
    totalAmount: total,
  };

  // Redirect to /products if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/products");
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async() => {
    if (!validate()) return;
   await dispatch(placeOrderThunk(orderPayload));
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
          <p className="text-gray-600 text-lg">
            Thanks for shopping with us 🎉
          </p>
          <p className="text-gray-700 text-lg">
            Redirecting to products page...
          </p>
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            maxLength="50"
            required
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 border rounded shadow-sm ${
              errors.name ? "border-red-500" : "focus:ring-indigo-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-3 border rounded shadow-sm ${
              errors.address ? "border-red-500" : "focus:ring-indigo-500"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact No
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-3 border rounded shadow-sm ${
              errors.phone ? "border-red-500" : "focus:ring-indigo-500"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
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
