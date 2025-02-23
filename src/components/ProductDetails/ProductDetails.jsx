import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import Slider from "react-slick";
import { useContext, useState } from "react";
import { cartContext } from './../CartContext/CartContext';
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const { addProductToCart } = useContext(cartContext);
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  async function addToCart() {
    setIsLoad(true);
    const data = await addProductToCart(id);
    if (data.status === "success") {
      toast.success("Product has been successfully added.", {
        style: {
          background: "#0A1172",
          width: "800px",
          height: "80px",
          color: "white",
        },
      });
    } else {
      toast.error("Error! Can't add product to cart.", {
        style: {
          background: "#0A1172",
          width: "800px",
          height: "80px",
          color: "white",
        },
      });
    }
    setIsLoad(false);
  }

  const { data, isLoading } = useQuery(`productDetails${id}`, getProductDetails);

  async function getProductDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-[#0A1172] dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <div className="relative w-full md:w-[80%] mx-auto px-4 sm:px-6 bg-white dark:bg-gray-900">
      {/* Exit Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        aria-label="Close"
        className="fixed top-16 left-4 sm:top-20 sm:left-20 text-gray-800 dark:text-white 
                   hover:text-red-600 rounded-full p-3 sm:p-4 text-2xl sm:text-2xl transition duration-300 ease-in-out 
                   active:scale-95 z-50"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center mt-12 gap-6">
        {/* Slider Section */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <Slider {...settings}>
            {data?.data.data.images.map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full sm:h-[350px] md:h-[500px] object-cover rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Content Section */}
        <div className="w-full sm:w-1/2 md:w-2/3 p-5">
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-800 dark:text-white">
            {data.data.data.title}
          </h1>
          <p className="text-sm sm:text-base mt-3 text-gray-700 dark:text-gray-300">
            {data.data.data.description}
          </p>

          {/* Price & Rating */}
          <div className="flex justify-between items-center mt-3">
            <h3 className="font-medium text-lg text-gray-800 dark:text-white">
              {data.data.data.price} <span className="font-normal text-red-700">EGP</span>
            </h3>
            <div className="flex items-center">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span className="ml-1">{data.data.data.ratingsAverage}</span>
            </div>
          </div>

          {/* Add to Cart & Wishlist */}
          <div className="flex items-center justify-between mt-5 gap-4">
            <button
              onClick={addToCart}
              className="bg-[#1414db] text-white font-medium hover:bg-[#25258a] hover:text-gray-200 transition duration-500 rounded-lg w-full sm:w-[80%] py-3 text-center"
            >
              {isLoad ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "+ Add"}
            </button>

            <i className="fa-solid fa-heart text-3xl text-blue-900 cursor-pointer dark:text-white"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
