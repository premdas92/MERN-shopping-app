import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.stopPropagation();
    setQuantity(1);
  };

  const increment = (e) => {
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  const decrement = (e) => {
    e.stopPropagation();
    if (quantity === 1) return setQuantity(0);
    setQuantity((prev) => prev - 1);
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
