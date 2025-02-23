import axios from "axios";
import { useContext } from "react";
import { createContext, useEffect, useState } from "react"
import { AuthContext } from './../../Context/AuthContext';

export const cartContext = createContext()

const CartContextProvider = ({ children }) => {
    const { token } = useContext(AuthContext)
    const [product, setProduct] = useState({});
    const [numOfItems, setNumOfItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoad, setisLoad] = useState(false);
    const [cartId, setCartId] = useState(null);

    async function addProductToCart(id) {

        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
                {
                    productId: id
                },
                {
                    headers: {
                        token: localStorage.getItem("tkn")
                    }
                }
            )

            getUserCart()

            return data


        } catch (error) {
            console.log(error);

        }
    }

    async function getUserCart() {
        setisLoad(true)
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            })
            setNumOfItems(data.numOfCartItems)
            setProduct(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            setisLoad(false)
            setCartId(data?.data?._id)

        } catch (error) {
            console.log(error);
            setisLoad(false)
        }
    }

    async function updateCount(id, count) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {
                    count: count
                }, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            }

            )

            setNumOfItems(data.numOfCartItems)
            setProduct(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
           

        } catch (error) {
            console.log(error);

        }
    }

    async function clearItem(id) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: {
                    token: localStorage.getItem("tkn")
                }
            }
            )

            setNumOfItems(data.numOfCartItems)
            setProduct(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            

        } catch (error) {
            console.log(error);

        }
    }

    async function clearCart() {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
                headers:{
                    token: localStorage.getItem("tkn")
                }
            })

            setNumOfItems(0)
            setProduct([])
            setTotalPrice(0)
        


        } catch (error) {
            console.log(error);
            
        }        
    }



    useEffect(function () {
        if (token !== null) {
            getUserCart()
        }
    }, [token])

    return (
        <cartContext.Provider value={{
            addProductToCart,
            product,
            numOfItems,
            totalPrice,
            isLoad,
            updateCount,
            clearItem,
            clearCart,
            cartId,
            setNumOfItems,
            setProduct,
            setTotalPrice,
         
        }}>
            {children}
        </cartContext.Provider>
    )
}

export default CartContextProvider
