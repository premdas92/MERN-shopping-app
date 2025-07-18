import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchProductById } from "../../slices/productSlice";
import BackButton from "../../components/Backbutton";

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { productDetail } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById({ id }));
    }
  }, [dispatch, id]);


  // if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BackButton label="Back to Products" />
      <img
        src={productDetail?.image}
        alt={productDetail?.name}
        className="w-full h-96 object-cover rounded"
      />
      <h3 className="text-3xl font-bold mt-4">{productDetail?.name}</h3>
      <p className="mt-2 text-lg text-gray-700">₹{productDetail?.price}</p>
      <p className="mt-4 text-gray-600">
      {productDetail?.weight
          ? `${productDetail?.weight}${productDetail?.unit}`
          : `Pack of ${productDetail?.packSize}`}
      </p>
      <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
