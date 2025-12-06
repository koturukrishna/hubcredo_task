import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default Layout;
