import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "react-query";
import { CircleLoader } from "react-spinners";

const AllOrders = () => {
  const { id } = jwtDecode(localStorage.getItem("tkn"));
  const { isLoading, data } = useQuery("allOrders", getAllOrders);

  async function getAllOrders() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
  }

  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-white dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  return (
    <div className="py-6 px-4 md:w-[85%] mx-auto min-h-screen bg-white dark:bg-gray-900">
      {data?.data.map((order, idx) => (
        <div
          key={idx}
          className="p-5 mb-6 bg-gray-100 dark:bg-gray-800 shadow-md rounded-xl border border-gray-200 dark:border-gray-700 transition hover:shadow-lg"
        >
          {/* Order Details */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-white">
              Total: <span className="text-blue-600 dark:text-blue-400 font-bold">{order.totalOrderPrice} EGP</span>
            </h2>
            <h2 className="text-sm sm:text-md text-gray-600 dark:text-gray-300 mt-2 sm:mt-0">
              Payment: <span className="font-medium text-blue-600 dark:text-blue-400">{order.paymentMethodType}</span>
            </h2>
          </div>

          {/* Responsive Image Grid */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {order.cartItems?.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg shadow-sm hover:shadow-md transition">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-md"
                  />
                </div>
                {/* Overlay Effect on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex justify-center items-center rounded-md">
                  <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition">
                    {item.product.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
