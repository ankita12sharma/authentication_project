// import { Navigate, Route, Routes } from "react-router-dom";
// import "./index.css";
// import Login from "../components/Pages/LoginForm";
// import Signup from "../components/Pages/SignupForm";
// import Home from "../components/Pages/HomePage";
// import "../components/Pages/Signup.css";
// import "../components/Pages/Login.css";
// import RegisterPage from "../components/Pages/RegisterPage";
// import "../components/Pages/register.css";
// import "./../src/index.css";

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="reg_users" element={<RegisterPage />} />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Pages/LoginForm";
import Signup from "../components/Pages/SignupForm";
import Home from "../components/Pages/HomePage";
import EmployeePage from "../components/Pages/EmployeeForm";

import "../components/Pages/Signup.css";
import "../components/Pages/Login.css";

import "../components/Pages/Employee.css";
import "./../src/index.css";

function App() {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Home Layout (Sidebar + Header stay) */}
      <Route path="/home" element={<Home />}>
        {/* Default home content */}
        {/* <Route index element={<h2>Welcome to Dashboard</h2>} /> */}

        {/* Sidebar page */}

        <Route path="employees" element={<EmployeePage />} />
      </Route>
    </Routes>
  );
}

export default App;
