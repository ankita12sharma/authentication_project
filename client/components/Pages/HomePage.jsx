import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { handleSuccess } from "../../utils";

import Sidebar from "../SideBar";
import Header from "../Header";

import "../SideBar.css";
import "../HomePage.css";
//import "../Header.css";
//import "../HomePageTwo.css";
import "../Header.css";

function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("loggedInUser");

    if (!token) {
      navigate("/login");
    } else {
      setLoggedInUser(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    handleSuccess("User Logged Out");
    setTimeout(() => navigate("/login"), 800);
  };

  return (
    <div className="app-layout">
      {/* HEADER */}
      <header className="layout-header">
        <Header user={loggedInUser} onLogout={handleLogout} />
      </header>

      {/* SIDEBAR */}
      <aside className="layout-sidebar">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <main className="layout-content">
        <Outlet /> {/* Pages like RegisterPage load here */}
      </main>
    </div>
  );
}

export default HomePage;
