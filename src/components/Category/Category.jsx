import { useState, useEffect, useContext } from "react";
import { cartContext } from "../CartContext/CartContext";
import { CircleLoader } from "react-spinners";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data?.data || []);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const { isLoad } = useContext(cartContext);

  if (isLoad) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-white dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      return;
    }

    fetch("https://ecommerce.routemisr.com/api/v1/subcategories")
      .then((res) => res.json())
      .then((data) => {
        const filteredSubcategories = data?.data?.filter(
          (sub) => sub.category === categoryId
        );
        setSubcategories(filteredSubcategories);
        setSelectedCategory(categoryId);
      })
      .catch((err) => console.error("Error fetching subcategories:", err));
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 px-4 mt-10 mb-10 bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-wrap justify-center gap-2 px-2 md:px-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="w-full xs:w-[90%] sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex justify-center"
          >
            <div className="relative w-full">
              <button
                className="w-full h-[380px] flex flex-col justify-between bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition hover:shadow-lg hover:shadow-blue-700 duration-500"
                onClick={() => handleCategoryClick(category._id)}
              >
                <div className="w-full h-[300px] flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <h2 className="text-lg text-blue-700 dark:text-blue-400 font-medium text-center p-3">
                  {category.name}
                </h2>
              </button>

              {selectedCategory === category._id && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[90%] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg rounded-lg p-4 z-50">
                  <h3 className="text-lg font-semibold text-center mb-2 dark:text-white">
                    Subcategories
                  </h3>
                  {subcategories.length > 0 ? (
                    <ul className="space-y-2 text-center">
                      {subcategories.map((sub) => (
                        <li
                          key={sub._id}
                          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer text-black dark:text-white"
                        >
                          {sub.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      No subcategories available.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
