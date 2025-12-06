import React from "react";
import { useLocation } from "react-router-dom";
const Dashboard = () => {
  const { state } = useLocation();
  console.log("userData", state);

  return (
    <div className="text-center mt-10 px-4 py-10 bg-white shadow-lg rounded-2xl max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome to The AI Automation Plaform
        </h2>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-4 text-blue-600">
          Hi {state?.name ? state.name : null}
        </h1>
        <p className="text-gray-600 mt-4 text-sm md:text-base leading-relaxed">
          Stay updated with the latest insights, reports, and automation
          features designed to help you streamline your workflow efficiently.
          This dashboard is fully responsive—optimized for mobiles, tablets, and
          large screens.
        </p>
        <p className="mt-3 text-gray-700 text-sm md:text-base">
          We continuously add new updates, features, and smart analytics to
          enhance your experience.
        </p>
        <button className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-700 transition-all">
          Explore Updates
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
