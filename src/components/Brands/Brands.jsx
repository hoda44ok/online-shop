import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { CircleLoader } from "react-spinners";

const Brands = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  async function getAllBrands() {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    return response.data;
  }

  const { isLoading, data } = useQuery("products", getAllBrands);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-white dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  return (
    <div className="md:w-[95%] mx-auto min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-wrap justify-center gap-5 px-6 mt-10 mb-10">
        {data?.data.map((item, index) => (
          <div
            key={index}
            className="w-full xs:w-[90%] sm:w-1/2 md:w-1/4 lg:w-1/5 p-3 flex justify-center"
          >
            <div
              className="w-full max-w-[1000px] h-[250px] flex flex-col justify-between bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-800 transition duration-500 cursor-pointer"
              onClick={() => setSelectedBrand(item)}
            >
              {/* Image */}
              <div className="w-full h-[200px] flex items-center justify-center p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full max-h-[85%] object-cover"
                />
              </div>
              {/* Title */}
              <h2 className="text-lg font-medium text-center p-3 text-zinc-600 dark:text-white">
                {item.name}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBrand && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 px-4">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-[90%] sm:w-[70%] md:w-[45%] max-w-[500px] relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedBrand(null)}
              className="absolute top-2 right-2 text-black dark:text-white hover:text-red-600 transition duration-300"
            >
              <i className="fa-solid fa-xmark fa-xl"></i>
            </button>
            {/* Brand Name */}
            <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 text-center">
              {selectedBrand.name}
            </h2>

            {/* Brand Image */}
            <img
              src={selectedBrand.image}
              alt={selectedBrand.name}
              className="w-full h-32 sm:h-40 object-contain my-4"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;
