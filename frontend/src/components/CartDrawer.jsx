import { useState, useEffect } from "react";

const CartDrawer = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([
    {
      productId: "1",
      product: {
        name: "Fresh Apples",
        price: 120,
        image: "https://cdn.zeptonow.com/production/tr:w-1280,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/09be9600-8578-40e7-8ed7-2a032bcaee0b.jpeg",
      },
      quantity: 2,
    },
    {
      productId: "2",
      product: {
        name: "Carrots",
        price: 50,
        image: "https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/14fd9b8b-82e8-4a8c-9c6b-f306f6d46323.jpeg",
      },
      quantity: 1,
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = "auto"; // restore scroll
    }
  
    return () => {
      document.body.style.overflow = "auto"; // clean up on unmount
    };
  }, [isOpen]);

  const handleQuantityChange = (productId, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const handleRemove = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-lg transition-transform duration-300 z-50 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-red-500 text-2xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 overflow-y-auto h-[calc(100%-170px)] space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center border rounded-lg p-2 gap-3"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.product.name}</h4>
                <p className="text-sm text-gray-600">
                  ₹{item.product.price} × {item.quantity}
                </p>
                <div className="flex items-center mt-1 gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.productId, -1)}
                    className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, 1)}
                    className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="ml-auto text-red-500 hover:text-red-700 text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <button
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
          disabled={cartItems.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;
