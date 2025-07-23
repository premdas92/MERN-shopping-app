import { useSelector } from "react-redux";
import { getProducts } from "../../slices/productSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductList from "../../components/ProductList";
import { productCategories } from "../../constants/product-categories";

const Home = () => {
  const [selectedCategory, setSelectCategory] = useState(
    productCategories[0].name
  );

  const dispatch = useDispatch();
  const { data: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ category: selectedCategory }));
  }, [dispatch, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex justify-center px-4">
        <div className="flex w-full max-w-[1400px] gap-6 py-6">
          <aside className="w-64 bg-white shadow-md p-4">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              Categories
            </h2>
            <ul className="space-y-2">
              {productCategories.map((data, index) => {
                return (
                  <li
                    key={`${data.name}.${index}`}
                    className={`cursor-pointer text-gray-700 hover:text-indigo-600 hover:bg-[#9869d680] flex gap-4 items-center ${
                      selectedCategory === data.name ? "bg-[#9869d680]" : ""
                    }`}
                    onClick={() => setSelectCategory(data.name)}
                  >
                    <span className="inline-block h-12 w-12 rounded-full bg-[#F7F0FA]">
                      <img src={data.img} alt={`category-img-${data.name}`} />
                    </span>
                    <p>{data.name}</p>
                  </li>
                );
              })}
            </ul>
          </aside>

          <main className="flex-1 overflow-y-auto">
            <h1 className="text-2xl font-bold text-indigo-800 mb-4">
              Products
            </h1>
            {loading && <p>Loading products...</p>}
            <ProductList products={products} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
