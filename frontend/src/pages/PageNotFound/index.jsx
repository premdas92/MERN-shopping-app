import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
        >
          <FaArrowLeft className="mr-2" />
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
