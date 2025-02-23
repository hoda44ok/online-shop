import { useState, useEffect } from "react";

const Subcategory = ({ categoryId }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);
    fetch("https://ecommerce.routemisr.com/api/v1/subcategories")
      .then((res) => res.json())
      .then((data) => {
        // Filter subcategories that belong to the selected category
        const filteredSubcategories = data?.data?.filter(
          (subcategory) => subcategory.category === categoryId
        );
        setSubcategories(filteredSubcategories || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching subcategories:", err);
        setSubcategories([]);
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="py-5 text-center bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4"></h2>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading subcategories...</p>
      ) : subcategories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {subcategories.map((subcategory) => (
            <button
              key={subcategory._id}
              className="p-3 border rounded-lg shadow-md bg-white hover:bg-gray-200 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 w-full"
            >
              {subcategory.name}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300">No subcategories available.</p>
      )}
    </div>
  );
};

export default Subcategory;
