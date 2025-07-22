import { useState, useMemo, useEffect } from "react";
import { debounce } from "../../utility/utility";
import { searchProducts } from "../../api/searchApi";
import { useSelector } from "react-redux";
import ProductList from "../../components/ProductList";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const query = useSelector((state) => state.search.query);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (q) => {
        if (!q.trim()) {
          setResults([]);
          return;
        }
        try {
          const res = await searchProducts(q);
          setResults(res);
        } catch (err) {
          console.error("Search error:", err);
        }
      }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  console.log(results, "PP");

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mt-4 grid grid-cols-1 gap-4">
        {results?.data?.length === 0 ? (
          <p className="text-gray-500">No results found</p>
        ) : (
         <ProductList products={results?.data} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
