import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email Address is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 5) {
    errors.password = "Must be 5 characters or more";
  }

  return errors;
};

const Login = () => {
  const [errorInfo, setErrorInfo] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, x) => {
      console.log(JSON.stringify(values, null, 2));
      try {
        const res = await axios.post(
          "https://hubcredo-task.onrender.com/api/user-login",
          values
        );
        showToastSuccessMsg();

        console.log("response", res.data);
        Cookies.set("jwt_token", res.data.token, {
          expires: 30,
          path: "/",
        });
        console.log("succeed");
        setTimeout(() => {
          navigate("/", { state: res.data.userData });
        }, 600);
      } catch (error) {
        console.log("login error", error);
        showToastErrorMsg();
        // console.log(error.response.data.error, "ERR");
        setErrorInfo(error.response.data.error);
      }
      x.resetForm();
    },
  });

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      navigate("/");
    }
  }, [navigate]);

  const showToastSuccessMsg = () => {
    toast.success("Login Success !", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const showToastErrorMsg = () => {
    toast.error("Invalid Credentials !", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Please Login Here
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-gray-50"
              }`}
              placeholder="your.email@example.com"
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="mt-1 text-sm text-red-600 font-medium">
                {formik.errors.email}
              </p>
            ) : null}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-gray-50"
              }`}
              placeholder="Enter a strong password"
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="mt-1 text-sm text-red-600 font-medium">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          {errorInfo && (
            <p className="mt-1 text-sm text-red-600 font-medium">{`Error: ${errorInfo}`}</p>
          )}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition duration-200 transform hover:scale-105 shadow-lg mt-8"
          >
            Login
          </button>
          <p className="text-center text-gray-600 mt-3 text-sm">
            don't have an account? &nbsp;
            <Link
              to="/signup"
              className="text-indigo-400 font-semibold hover:text-indigo-900"
            >
              Signup here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
