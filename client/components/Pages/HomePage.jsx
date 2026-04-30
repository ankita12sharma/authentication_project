import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { handleSuccess } from "../../utils";

import Sidebar from "../SideBar";
import Header from "../Header";

import "../SideBar.css";
import "../HomePage.css";
import "../Header.css";

function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("loggedInUser");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoggedInUser(user);

    // ✅ SHOW TOAST AFTER NAVIGATION
    if (location.state?.showToast) {
      handleSuccess("Login successful!!");

      // ✅ clear state so it doesn't repeat on refresh
      window.history.replaceState({}, document.title);
    }
  }, []); // run once

  const handleLogout = () => {
    localStorage.clear();
    handleSuccess("User Logged Out");

    setTimeout(() => {
      navigate("/login");
    }, 800);
  };

  return (
    <div className="app-layout">
      <header className="layout-header">
        <Header user={loggedInUser} onLogout={handleLogout} />
      </header>

      <aside className="layout-sidebar">
        <Sidebar />
      </aside>

      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}

export default HomePage;
