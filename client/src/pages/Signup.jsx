import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "UserName is Required";
  } else if (values.username.length < 5) {
    errors.username = "Must be above 5 characters or more";
  }

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

  if (!values.address) {
    errors.address = "Address is Required";
  } else if (values.address.length < 2) {
    errors.address = "Must be 3 characters or more";
  }

  if (!values.contact) {
    errors.contact = "Contact is Required";
  } else if (values.contact.length < 9) {
    errors.contact = "Must be 10 characters";
  }

  return errors;
};

const Signup = () => {
  const [errorInfo, setErrorInfo] = useState(null);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      address: "",
      contact: "",
    },
    validate,
    onSubmit: async (values, x) => {
      console.log(JSON.stringify(values, null, 2));
      try {
        const res = await axios.post(
          "https://hubcredo-task.onrender.com/api/add-user",
          values
        );

        console.log("signup response", res.data);
        showToastSuccessMsg();
        const { username, email, contact } = values;
        const user = {
          name: username,
          email: email,
          contact: contact,
          createdAt: new Date().toISOString(),
        };
        x.resetForm();
        await axios
          .post(
            "https://krishnakotu22.app.n8n.cloud/webhook/new-user-signup",
            user,
            {
              headers: { "x-signup-secret": "mySecret123" },
            }
          )
          .catch(() => {});
        console.log("succeed");

        navigate("/login");
      } catch (error) {
        console.log("login error", error);
        console.log(error.response.data.error, "ERR");
        setErrorInfo(error.response.data.error);
        showToastErrorMsg();
      }
    },
  });

  const showToastSuccessMsg = () => {
    toast.success("Signup Success !", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const showToastErrorMsg = () => {
    toast.error("Server Error !", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-2">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Please Signup Here
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-2">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              User Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                formik.errors.username && formik.touched.username
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-gray-50"
              }`}
              placeholder="Enter your username"
            />
            {formik.errors.username && formik.touched.username ? (
              <p className="mt-1 text-sm text-red-600 font-medium">
                {formik.errors.username}
              </p>
            ) : null}
          </div>

          {/* Email Field */}
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

          {/* Address Field */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                formik.errors.address && formik.touched.address
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-gray-50"
              }`}
              placeholder="Your address"
            />
            {formik.errors.address && formik.touched.address ? (
              <p className="mt-1 text-sm text-red-600 font-medium">
                {formik.errors.address}
              </p>
            ) : null}
          </div>

          {/* Contact Field */}
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter Contact No
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                formik.errors.contact && formik.touched.contact
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-gray-50"
              }`}
              placeholder="Your contact number"
            />
            {formik.errors.contact && formik.touched.contact ? (
              <p className="mt-1 text-sm text-red-600 font-medium">
                {formik.errors.contact}
              </p>
            ) : null}
          </div>
          {errorInfo && (
            <p className="mt-1 text-sm text-red-600 font-medium">{`Error: ${errorInfo}`}</p>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition duration-200 transform hover:scale-105 shadow-lg mt-8"
          >
            Signup
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-3 text-sm">
          Already have an account? &nbsp;
          <Link
            to="/login"
            className="text-indigo-400 font-semibold hover:text-indigo-900"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
