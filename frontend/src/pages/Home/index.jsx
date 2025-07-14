import { useSelector } from "react-redux";
import { getProducts } from "../../slices/productSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductList from "../../components/ProductList";

const Home = () => {
  const [selectedCategory, setSelectCategory] = useState("Fruits");

  const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
  const {
    data: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ category: selectedCategory }));
  }, [dispatch, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main content container */}
      <div className="flex-1 flex justify-center px-4">
        <div className="flex w-full max-w-[1400px] gap-6 py-6">
          {/* Left Sidebar */}
          <aside className="w-64 bg-white shadow-md p-4">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              Categories
            </h2>
            <ul className="space-y-2">
              <li
                className={`cursor-pointer text-gray-700 hover:text-indigo-600 hover:bg-[#9869d680] flex gap-4 items-center ${
                  selectedCategory === "Fruits" ? "bg-[#9869d680]" : ""
                }`}
                onClick={() => setSelectCategory("Fruits")}
              >
                <span className="inline-block h-12 w-12 rounded-full bg-[#F7F0FA]">
                  <img
                    src="https://cdn.zeptonow.com/production/tr:w-90,ar-160-161,pr-true,f-auto,q-80/cms/sub_category/7e51d0f6-ee57-42f3-98f9-945033ad3e5f.png"
                    alt="category-img"
                  />
                </span>
                <p> Fruits</p>
              </li>
              <li
                className={`cursor-pointer text-gray-700 hover:text-indigo-600 hover:bg-[#9869d680] flex gap-4 items-center ${
                  selectedCategory === "Vegetables" ? "bg-[#9869d680]" : ""
                }`}
                onClick={() => setSelectCategory("Vegetables")}
              >
                <span className="inline-block h-12 w-12 rounded-full bg-[#F7F0FA]">
                  <img
                    src="https://cdn.zeptonow.com/production/tr:w-90,ar-160-161,pr-true,f-auto,q-80/cms/sub_category/694c07e0-542b-49db-a596-b1f4f4935342.png"
                    alt="category-img"
                  />
                </span>
                <p> Vegetables</p>
              </li>
            </ul>
          </aside>

          {/* Products Section */}
          <main className="flex-1 overflow-y-auto">
            <h1 className="text-2xl font-bold text-indigo-800 mb-4">
              Products
            </h1>
            {loading && <p>Loading products...</p>}
            {error && <p className="text-red-600">{error}</p>}
            <ProductList products={products} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
