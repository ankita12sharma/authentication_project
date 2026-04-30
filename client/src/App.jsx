import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Pages/LoginForm";
import Signup from "../components/Pages/SignupForm";
import Home from "../components/Pages/HomePage";
import EmployeePage from "../components/Pages/EmployeeForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/Pages/Signup.css";
import "../components/Pages/Login.css";

import "../components/Pages/Employee.css";
import "./../src/index.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={800} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home />}>
          {/* Default home content */}
          {/* <Route index element={<h2>Welcome to Dashboard</h2>} /> */}
          <Route path="employees" element={<EmployeePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
