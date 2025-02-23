import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Brands from "./components/Brands/Brands";
import Category from "./components/Category/Category";
import Error from "./components/Error/Error";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import Wishlist from "./components/Wishlist/Wishlist";
import Products from "./components/Products/Products";
import AuthContextProvider from "./Context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from "./components/CartContext/CartContext";
import Payment from './components/Payment/Payment';
import AllOrders from "./components/AllOrders/AllOrders";
import WishlistContextProvider from "./components/WishListContext/WishListContext";


const App = () => {


  const x = new QueryClient()
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "payment", element: <ProtectedRoute><Payment /></ProtectedRoute> },
        { path: "productDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "allOrders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: "category", element: <ProtectedRoute><Category /></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: "product", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={x}>
      <AuthContextProvider>

        <CartContextProvider>
          <WishlistContextProvider>

            <Toaster position="top-right" />
            <RouterProvider router={router} />

          </WishlistContextProvider>
        </CartContextProvider>

      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
