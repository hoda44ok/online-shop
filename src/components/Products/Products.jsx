import axios from "axios";
import { useQuery } from "react-query";
import { CircleLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../CartContext/CartContext";

const Products = () => {

  const { addProductToCart } = useContext(cartContext);
  const [isLoad, setisLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  async function addToCart(id) {
    setisLoad(true);
    const data = await addProductToCart(id);
    if (data.status == "success") {
      toast.success('It has been successfully added.', {
        style: {
          background: "#0A1172",
          width: "800px",
          height: "80px",
          color: "white",
        },
      });
      setisLoad(false);
    } else {
      toast.error("Error! Can't add product to cart", {
        style: {
          background: "#0A1172",
          width: "800px",
          height: "80px",
          color: "white",
        },
      });
      setisLoad(false);
    }
  }

  async function getAllProduct() {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    return response.data;
  }

  const { isLoading, data } = useQuery("products", getAllProduct);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-[#0A1172] dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  const products = data?.data || [];
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:w-[90%] mx-auto bg-white dark:bg-gray-900">
      {/* Search Input */}
      <input
        type="search"
        id="name"
        className="bg-slate-50 dark:bg-gray-800 border text-base placeholder-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg block md:w-[80%] w-[70%] ms-16 mt-20 p-2.5"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Products List */}
      <div className="flex flex-wrap justify-center items-center">
        {filteredProducts.map((product, idx) => (
          <div key={idx} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 mb-10">
            <div className="p-3 relative mt-4 hover:shadow-lg hover:shadow-blue-700 transition-all duration-700 rounded-lg group bg-white dark:bg-gray-800">
              <Link to={`/ProductDetails/${product.id}`}>
                <img src={product.imageCover} alt={product.title} className="w-full rounded-lg" />
                <h3 className="mt-3 text-blue-500 dark:text-blue-400">{product.category.name}</h3>
                <h3 className="mt-3 font-medium text-gray-800 dark:text-white">
                  {product.title.split(" ").splice(0, 2).join(" ")}
                </h3>
                <div className="mt-3 flex flex-wrap justify-between items-center">
                  <h3 className="text-gray-800 dark:text-white">{product.price} EGP</h3>
                  <div className="flex items-center">
                    <i className="fa-solid fa-star text-yellow-500"></i> {product.ratingsAverage}
                  </div>
                </div>
                <div className="relative mt-3">
                  <i className="fa-solid fa-heart text-3xl absolute right-3 hover:text-red-600 dark:hover:text-red-500"></i>
                </div>
              </Link>
              <div className="mt-6 relative left-1/2 bottom-[-60px] transform -translate-x-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:bottom-4">
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-blue-700 border text-white font-medium rounded-lg px-6 py-2 md:w-[70%] sm:w-[70%] text-center sm:py-3 md:py-2 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                  disabled={isLoad}
                >
                  {isLoad ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "+ Add"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
