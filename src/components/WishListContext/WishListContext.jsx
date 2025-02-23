import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { cartContext } from "../CartContext/CartContext"; // Import Cart Context to move items to cart

export const wishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const { addProductToCart } = useContext(cartContext); // Getting addProductToCart function from cart context
    const [wishlist, setWishlist] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    // Fetch Wishlist
    async function getUserWishlist() {
        setIsLoad(true);
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: { token: localStorage.getItem("tkn") }
            });
            setWishlist(data.data);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
        setIsLoad(false);
    }

    // Add Product to Wishlist
    async function addToWishlist(id) {
        try {
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                { productId: id },
                { headers: { token: localStorage.getItem("tkn") } }
            );
            getUserWishlist(); // Refresh wishlist after adding
            return data;
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    }

    async function removeFromWishlist(id) {
        try {
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                { headers: { token: localStorage.getItem("tkn") } }
            );

            // Manually update the wishlist state instead of fetching again
            setWishlist((prevWishlist) => prevWishlist.filter(item => item._id !== id));

            return data;
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    }


    // Move Item from Wishlist to Cart
    async function moveToCart(id) {
        try {
            await addProductToCart(id); // Add product to cart
            await removeFromWishlist(id); // Remove from wishlist
        } catch (error) {
            console.error("Error moving item to cart:", error);
        }
    }

    useEffect(() => {
        if (token !== null) {
            getUserWishlist();
        }
    }, [token]);

    return (
        <wishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            moveToCart,
            isLoad,
        }}>
            {children}
        </wishlistContext.Provider>
    );
};

export default WishlistContextProvider;
