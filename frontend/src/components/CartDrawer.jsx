import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket/socket";
import { deleteCartItemThunk, fetchCart, updateCart, updateItemFromSocket } from "../slices/cartSlice";

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { cartItems: reduxCartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [localCartItems, setLocalCartItems] = useState([]);

  // 1. Join socket room once
  useEffect(() => {
    if (!user?._id) return;
    const userId = user._id;
    socket.emit("join_room", userId);
    console.log(`Joined socket room: ${userId}`);
  }, [user]);

  // 2. Fetch cart when drawer opens
  useEffect(() => {
    if (isOpen && user?._id) {
      dispatch(fetchCart());
    }
  }, [isOpen, user, dispatch]);

  // 3. Sync Redux cart to local state when drawer opens
  useEffect(() => {
    if (isOpen) {
      setLocalCartItems(reduxCartItems);
    }
  }, [reduxCartItems, isOpen]);

  // 4. Listen for cart updates via socket
  useEffect(() => {
    const handleCartUpdate = (product) => {
      dispatch(updateItemFromSocket(product));
    };

    socket.on("cart_updated", handleCartUpdate);
    return () => {
      socket.off("cart_updated", handleCartUpdate);
    };
  }, [dispatch]);

  const handleQuantityChange = (productId, delta) => {
  const item = localCartItems.find((i) => i.productId === productId);
  if (!item) return;

  const newQty = item.quantity + delta;

  // 1. If new quantity is 0 → remove item
  if (newQty <= 0) {
    setLocalCartItems((prev) =>
      prev.filter((i) => i.productId !== productId)
    );

    if (user?._id) {
      socket.emit("cart_updated", {
        userId: user._id,
        product: {
          ...item,
          _id: item.productId,
          quantity: 0,
        },
      });
    }
    dispatch(deleteCartItemThunk({
    productId: productId,
  }));
    return;
  }

  // 2. Else → update item
  const updatedItem = { ...item, quantity: newQty };

  setLocalCartItems((prev) =>
    prev.map((i) => (i.productId === productId ? updatedItem : i))
  );

  if (user?._id) {
    socket.emit("cart_updated", {
      userId: user._id,
      product: {
        ...updatedItem,
        _id: updatedItem.productId,
      },
    });
  }

  dispatch(updateCart({
    productId: updatedItem.productId,
    quantity: updatedItem.quantity,
  }));
};


  const handleRemove = (productId) => {
    setLocalCartItems((prev) => prev.filter((item) => item.productId !== productId));

    const item = localCartItems.find((i) => i.productId === productId);
    if (user?._id && item) {
      socket.emit("cart_updated", {
        userId: user._id,
        product: {
          ...item,
          _id: item.productId,
          quantity: 0,
        },
      });
    }
  };

  const total = localCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <div
        className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-lg transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-170px)] space-y-4">
          {localCartItems.length === 0 ? (
            <p className="text-center text-gray-500">Cart is empty</p>
          ) : (
            localCartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center border rounded-lg p-2 gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} × {item.quantity}
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
            disabled={localCartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
