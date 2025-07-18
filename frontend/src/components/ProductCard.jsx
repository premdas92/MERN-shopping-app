import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import { useDispatch } from "react-redux";
import { updateCart, fetchCart, addToCartThunk } from "../slices/cartSlice";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const handleCartUpdate = (updatedProduct) => {
      if (updatedProduct._id === product._id) {
        setQuantity(updatedProduct.quantity);
      }
    };
    socket.on("cart_updated", handleCartUpdate);
    return () => {
      socket.off("cart_updated", handleCartUpdate);
    };
  }, [product._id]);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const itemInCart = cartItems.find((item) => item.productId === product._id);
    if (itemInCart) {
      setQuantity(itemInCart.quantity);
    } else {
      setQuantity(0);
    }
  }, [cartItems, product._id]);

  const updateInCartAPI = async (qty = 1) => {
    try {
      dispatch(updateCart({ productId: product._id, quantity: qty }));
      // Emit socket event
      if (user?._id) {
        socket.emit("cart_updated", {
          userId: user._id,
          product: {
            ...product,
            quantity: qty,
          },
        });
      }
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  const handleAdd = async (e) => {
    try {
      e.stopPropagation();
      setQuantity(1);
      dispatch(addToCartThunk({ productId: product._id, quantity: 1 }));
      // Emit socket event
      if (user?._id) {
        socket.emit("cart_updated", {
          userId: user._id,
          product: {
            ...product,
            quantity: 1,
          },
        });
      }
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  const increment = async (e) => {
    e.stopPropagation();
    const newQty = quantity + 1;
    setQuantity(newQty);
    await updateInCartAPI(newQty);
  };

  const decrement = async (e) => {
    e.stopPropagation();
    if (quantity === 1) {
      setQuantity(0);
      await updateInCartAPI(0);
      return;
    }
    const newQty = quantity - 1;
    setQuantity(newQty);
    await updateInCartAPI(newQty);
  };
  return (
    <div
      key={product._id}
      className="bg-white p-4 shadow rounded cursor-pointer"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-40 object-cover w-full rounded"
      />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">
        {product.weight
          ? `${product.weight}${product.unit}`
          : `Pack of ${product.packSize}`}
      </p>
      <p className="mt-1 font-medium text-indigo-800">₹{product.price}</p>
      <div className="mt-4">
        {quantity === 0 ? (
          <button
            onClick={(e) => handleAdd(e)}
            className="w-full text-sm bg-indigo-600 text-white py-1.5 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Add
          </button>
        ) : (
          <div className="flex justify-between items-center gap-2">
            <button
              onClick={(e) => decrement(e)}
              className="bg-indigo-600 text-white w-8 h-8 rounded-full text-lg font-semibold hover:bg-indigo-700 cursor-pointer"
            >
              −
            </button>
            <span className="text-sm font-medium text-gray-800">
              {quantity}
            </span>
            <button
              onClick={(e) => increment(e)}
              className="bg-indigo-600 text-white w-8 h-8 rounded-full text-lg font-semibold hover:bg-indigo-700 cursor-pointer"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
