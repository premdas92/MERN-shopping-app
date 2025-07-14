import { FaUserCircle, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const hideSearchRoutes = ["/profile", "/checkout", "/settings"];
  // const hideSearch = hideSearchRoutes.includes(location.pathname) 
  
  const hideSearch =
    location.pathname.startsWith("/products/") ||
    location.pathname === "/profile";

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
        <a onClick={() => setCartOpen(true)}>
          <FaShoppingCart className="hover:text-indigo-600 cursor-pointer" />
        </a>
        <a onClick={handleLogOut}>
          <FaSignOutAlt className="hover:text-indigo-600 cursor-pointer" />
        </a>
      </div>
    </header>

    <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
    
  );
};

export default Header;
