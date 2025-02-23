import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  const login = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validYup = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Minimum chars is 3")
      .max(15, "Maximum chars is 15"),
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      ),
    rePassword: Yup.string()
      .required("Repassword is required")
      .oneOf([Yup.ref("password")], "Repassword doesn't match password"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian number"),
  });

  async function Signup(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      toast.success(data.message);
      login("/login");
      setIsLoading(false);
    } catch (e) {
      toast.error(e.response?.data?.message || "Error occurred");
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: user,
    validationSchema: validYup,
    onSubmit: Signup,
  });

  return (

    <div className="bg-gray-50 dark:bg-gray-900 flex justify-center items-center p-0 m-0 w-full overflow-hidden">
      <div className="container mx-10 flex justify-center items-center w-full mt-16 sm:mt-24 mb-10 ">
        <div className="max-w-7xl w-full sm:w-4/5 md:w-2/3 lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-lg dark:shadow-slate-700 p-5 ">
          <h2 className="text-3xl font-medium text-center text-gray-900 dark:text-white mb-6">
            Register Now
          </h2>

          <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-5">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block mb-2 text-md text-gray-900 dark:text-white">
                Name:
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                id="name"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="bg-red-100 p-3 rounded-lg mt-4 text-red-500 border-red-300 border dark:bg-red-800 dark:border-red-600 dark:text-white">
                  {formik.errors.name}
                </div>
              )}
            </div>

            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Re-Password Input */}
            <div>
              <label htmlFor="rePassword" className="block mb-2 text-md text-gray-900 dark:text-white">
                Re-Password:
              </label>
              <input
                type="password"
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                id="rePassword"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {formik.touched.rePassword && formik.errors.rePassword && (
                <div className="bg-red-100 p-3 rounded-lg mt-4 text-red-500 border-red-300 border dark:bg-red-800 dark:border-red-600 dark:text-white">
                  {formik.errors.rePassword}
                </div>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block mb-2 text-md text-gray-900 dark:text-white">
                Phone:
              </label>
              <input
                type="tel"
                onChange={formik.handleChange}
                value={formik.values.phone}
                id="phone"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="bg-red-100 p-3 rounded-lg mt-4 text-red-500 border-red-300 border dark:bg-red-800 dark:border-red-600 dark:text-white">
                  {formik.errors.phone}
                </div>
              )}
            </div>

            {/* Register Button */}
            <div className="relative py-7">
              <button
                type="submit"
                className="bg-gray-50 border border-gray-300 text-zinc-600 font-medium focus:outline-none focus:bg-blue-700 focus:text-white rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {isLoading ? (
                  <i className="fa-solid fa-spin fa-spinner text-white"></i>
                ) : (
                  "Register Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>


  );
};

export default Register;
