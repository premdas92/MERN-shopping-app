import { FaUserCircle, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";
import { fetchCart } from "../slices/cartSlice";
import socket from "../socket/socket"; // Make sure this is shared instance

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Initial cart fetch on mount
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  // 🔁 Real-time sync with WebSocket
  useEffect(() => {
    if (!user?._id) return;

    const handleCartSocketUpdate = (data) => {
      if (data?.userId === user._id) {
        dispatch(fetchCart());
      }
    };

    socket.on("cart_updated", handleCartSocketUpdate);

    return () => {
      socket.off("cart_updated", handleCartSocketUpdate);
    };
  }, [dispatch, user]);

  // 🧮 Derived cart count from Redux state
  const cartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0);

  const hideSearch =
    location.pathname.startsWith("/products/") ||
    location.pathname === "/profile" || location.pathname === "/checkout";

  const handleLogOut = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <>
      <header className="w-full bg-white shadow-md p-6 flex items-center justify-between">
        <div className="text-3xl font-bold text-indigo-600">
          <a href="/">FreshO</a>
        </div>

        <div className="flex-1 mx-6 max-w-2xl">
          {!hideSearch && (
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}
        </div>

        <div className="flex items-center space-x-6 text-gray-600 text-2xl">
          <a href="/profile">
            <FaUserCircle className="hover:text-indigo-600 cursor-pointer" />
          </a>
          <a
            onClick={() => setCartOpen(true)}
            className="relative cursor-pointer"
          >
            <FaShoppingCart className="hover:text-indigo-600" />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </a>
          <a onClick={handleLogOut}>
            <FaSignOutAlt className="hover:text-indigo-600 cursor-pointer" />
          </a>
        </div>
      </header>
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-50 z-40"
          onClick={() => setCartOpen(false)}
        />
      )}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
