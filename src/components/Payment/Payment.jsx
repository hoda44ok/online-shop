import { useContext, useState } from 'react';
import { cartContext } from '../CartContext/CartContext';
import axios from 'axios';

const Payment = () => {
    const { cartId, setNumOfItems, setProduct, setTotalPrice } = useContext(cartContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOnline, setIsLoadingOnline] = useState(false); // Separate state for Online Payment
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [details, setDetails] = useState("");

    async function cashPayment(e) {
        e.preventDefault(); // Prevent form submission
        setIsLoading(true); // Set loading for Cash Payment
        setIsLoadingOnline(false); // Disable Online Payment loading

        const requestData = {
            shippingAddress: { details, phone, city }
        };

        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
                requestData,
                {
                    headers: { token: localStorage.getItem("tkn") }
                }
            );

            setNumOfItems(0);
            setTotalPrice(0);
            setProduct([]);
        } catch (error) {
            console.error("Payment Error:", error);
        } finally {
            setIsLoading(false); // Stop loading for Cash Payment
        }
    }

    async function onlinePayment(e) {
        e.preventDefault(); // Prevent form submission
        setIsLoading(false); // Disable Cash Payment loading
        setIsLoadingOnline(true); // Set loading for Online Payment

        const requestData = {
            shippingAddress: { details, phone, city }
        };

        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
                requestData,
                {
                    headers: { token: localStorage.getItem("tkn") },
                    params: { url: "http://localhost:5173" }
                }
            );

            window.open(data.session.url);
            
        } catch (error) {
            console.error("Online Payment Error:", error);
        } finally {
            setIsLoadingOnline(false); // Stop loading for Online Payment
        }
    }

    return (
        <div className="py-7">
            <div className="container mx-auto">
                <form className="max-w-7xl md:mx-44 mx-0 p-5">
                    <div className="mb-5">
                        <label htmlFor="details" className="block mb-1 text-md text-gray-800 dark:text-white">Details</label>
                        <input
                            onChange={(e) => setDetails(e.target.value)}
                            type="text"
                            id="details"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="phone" className="block mb-1 text-md text-gray-800 dark:text-white">Phone</label>
                        <input
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            id="phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="city" className="block mb-1 text-md text-gray-800 dark:text-white">City</label>
                        <input
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            id="city"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <button
                        onClick={cashPayment}
                        className="bg-teal-700 border hover:border-teal-700 hover:bg-white hover:text-teal-700 text-white font-medium mt-4 rounded-lg text-md w-[30%] px-5 py-1.5 text-center transition duration-200 dark:bg-teal-800 dark:border-teal-700 dark:hover:bg-teal-700 dark:hover:text-white"
                    >
                        {isLoading ? <i className="fa-solid fa-spin fa-spinner text-teal-700"></i> : "Pay Now"}
                    </button>

                    <button
                        onClick={onlinePayment}
                        className="bg-blue-700 border hover:border-blue-700 hover:bg-white hover:text-blue-700 text-white font-medium mt-4 rounded-lg text-md w-[35%] ms-2 px-5 py-1.5 text-center transition duration-200 dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700 dark:hover:text-white"
                    >
                        {isLoadingOnline ? <i className="fa-solid fa-spin fa-spinner text-blue-700"></i> : "Pay Online"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
