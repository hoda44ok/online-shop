import axios from "axios";
import { useQuery } from "react-query";
import { CircleLoader } from "react-spinners";
import HomeSlider from "./../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../CartContext/CartContext";
import { wishlistContext } from "../WishListContext/WishListContext";

const Home = () => {
  const { addProductToCart } = useContext(cartContext);
  const { addToWishlist } = useContext(wishlistContext);
  const [isLoad, setIsLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistItems, setWishlistItems] = useState(new Set());

  async function addToCart(id) {
    setIsLoad(true);
    const data = await addProductToCart(id);
    if (data.status === "success") {
      toast.success("Product added to cart!", {
        style: { background: "#0A1172", color: "white" },
      });
    } else {
      toast.error("Error adding to cart.");
    }
    setIsLoad(false);
  }

  async function addToWishList(id) {
    setIsLoad(true);
    const data = await addToWishlist(id);
    if (data.status === "success") {
      setWishlistItems((prev) => new Set([...prev, id]));
      toast.success("Added to Wishlist!", {
        style: { background: "#0A1172", color: "white" },
      });
    } else {
      toast.error("Error adding to wishlist.");
    }
    setIsLoad(false);
  }

  async function getAllProduct() {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    return response.data;
  }

  const { isLoading, data } = useQuery("products", getAllProduct);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#0A1172] dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  const products = data?.data || [];
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:w-[90%] mx-auto dark:bg-gray-900 dark:text-white">
      <HomeSlider />
      <CategorySlider />

      {/* Search Bar */}
      <input
        type="search"
        className="bg-slate-50 dark:bg-gray-800 dark:text-white border text-base placeholder-gray-700 rounded-lg block md:w-[80%] w-[70%] ms-16 mt-20 p-2.5"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-wrap justify-center items-center">
        {filteredProducts.map((product) => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 mb-10">
            <div className="p-3 relative mt-4 hover:shadow-lg hover:shadow-blue-800 transition-all duration-700 rounded-lg group dark:bg-gray-800">
              <Link to={`/ProductDetails/${product.id}`}>
                <img src={product.imageCover} alt={product.title} className="w-full" />
                <h3 className="mt-3 text-blue-500">{product.category.name}</h3>
                <h3 className="mt-3 font-medium">{product.title.split(" ").splice(0, 2).join(" ")}</h3>
                <div className="mt-3 flex flex-wrap justify-between items-center">
                  <h3>{product.price} EGP</h3>
                  <div>
                    <i className="fa-solid fa-star text-yellow-500"></i> {product.ratingsAverage}
                  </div>
                </div>
              </Link>

              {/* Wishlist Heart Icon */}
              <button
                onClick={() => addToWishList(product.id)}
                className="absolute top-4 right-4 text-xl"
              >
                <i className={`fa-heart ${wishlistItems.has(product.id) ? "fa-solid text-red-500" : "fa-regular text-gray-400"} hover:text-red-500 transition-all duration-300`}></i>
              </button>

              {/* Add to Cart Button */}
              <div className="mt-6 relative left-1/2 bottom-[-60px] transform -translate-x-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:bottom-4">
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-blue-700 border text-white font-medium rounded-lg px-6 py-2 md:w-[70%] sm:w-[70%] text-center sm:py-3 md:py-2"
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

export default Home;
