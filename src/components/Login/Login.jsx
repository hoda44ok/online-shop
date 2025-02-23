import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const home = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const user = {
    email: "",
    password: "",
  };

  const validYup = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      ),
  });

  async function Signin(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      localStorage.setItem("tkn", data.token);
      setToken(data.token);
      toast.success(data.message);
      home("/");

      setIsLoading(false);
    } catch (e) {
      toast.error(e.response?.data?.message || "Error occurred");
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: user,
    validationSchema: validYup,
    onSubmit: Signin,
  });

  return (

    <div className="bg-gray-50 dark:bg-gray-900 flex justify-center items-center  p-0 m-0">
      <div className="container mx-5 flex justify-center items-center w-full mt-16 sm:mt-24">
        <div className="max-w-7xl w-full sm:w-4/5 md:w-2/3 lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-lg dark:shadow-slate-700 p-5">
          <h2 className="text-3xl font-medium text-center text-gray-900 dark:text-white mb-6">
            Login Now
          </h2>

          <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-5">
            <div>
              <label htmlFor="email" className="block mb-2 text-md text-gray-900 dark:text-white">
                Email:
              </label>
              <input
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                id="email"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="bg-red-100 p-3 rounded-lg mt-4 text-red-500 border-red-300 border dark:bg-red-800 dark:border-red-600 dark:text-white">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-md text-gray-900 dark:text-white">
                Password:
              </label>
              <input
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                id="password"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="bg-red-100 p-3 rounded-lg mt-4 text-red-500 border-red-300 border dark:bg-red-800 dark:border-red-600 dark:text-white">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Flexbox layout for "Forget Password" and submit button */}
            <div className="flex flex-col sm:flex-row justify-between items-center py-3">
              <a
                href="#"
                className="font-medium hover:text-blue-600 transition duration-300 text-xl dark:text-white  sm:mb-0 mb-2"
              >
                Forget your password?
              </a>

              <button
                type="submit"
                className="bg-gray-50 border border-gray-300 text-zinc-600 font-medium focus:outline-none mt-3 focus:bg-blue-700 focus:text-white rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {isLoading ? (
                  <i className="fa-solid fa-spin fa-spinner text-white"></i>
                ) : (
                  "Login Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Login;
