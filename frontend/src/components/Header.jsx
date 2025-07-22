import { FaUserCircle, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import CartDrawer from "./CartDrawer";
import { fetchCart } from "../slices/cartSlice";
import socket from "../socket/socket";
import { debounce } from "../utility/utility";
import { setQuery } from "../slices/searchSlice";

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useSelector((state) => state.cart, shallowEqual);
  const { user } = useSelector((state) => state.auth, shallowEqual);

  // Initial cart fetch on mount
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  // Real-time sync with WebSocket
  useEffect(() => {
    if (!user?._id) return;

    const handleCartSocketUpdate = debounce((data) => {
      if (data?.userId === user._id) {
        dispatch(fetchCart());
      }
    }, 300);

    socket.on("cart_updated", handleCartSocketUpdate);

    return () => {
      socket.off("cart_updated", handleCartSocketUpdate);
    };
  }, [dispatch, user]);

  const cartCount = useMemo(() => {
    return cartItems?.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const hideSearch =
    location.pathname.startsWith("/products/") ||
    location.pathname === "/profile" ||
    location.pathname === "/checkout" ||
    location.pathname === "/";

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
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              onFocus={() => {
                if (location.pathname !== "/search") {
                  navigate("/search");
                }
              }}
              onChange={(e) => {
                const q = e.target.value;
                dispatch(setQuery(q));
                if (location.pathname !== "/search") {
                  navigate("/search");
                }
              }}
            />
          )}
        </div>

        {user?.name && (
          <div className="flex gap-[15px]">
            <div className="flex items-center gap-1 text-lg font-medium text-gray-800">
              <span>Welcome,</span>
              <span className="text-indigo-600 font-semibold">
                {user?.name}
              </span>
            </div>

            <div className="flex items-center space-x-6 text-gray-600 text-2xl">
              <a onClick={() => navigate("/profile")} title="Profile">
                <FaUserCircle className="hover:text-indigo-600 cursor-pointer" />
              </a>
              <a
                title="Cart"
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
              <a onClick={handleLogOut} title="Logout">
                <FaSignOutAlt className="hover:text-indigo-600 cursor-pointer" />
              </a>
            </div>
          </div>
        )}
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

export default React.memo(Header);
