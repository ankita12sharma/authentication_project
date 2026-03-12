//app.jsx
// import React from "react";
// import { Navigate, Routes, Route } from "react-router-dom";
//import HomePage from "../Pages/HomePage";

// import SignupForm from "../Pages/SignupForm";
// import LoginForm from "../Pages/LoginForm";

// const App = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />}></Route>
//         <Route path="/signup" element={<SignupForm />}></Route>
//         <Route path="/login" element={<LoginForm />}></Route>
//         <Route path="/home" element={<HomePage />}></Route>

//       </Routes>
//     </>
//   );
// };
// export default App;

//homepage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../Header";
// import { handleSuccess } from "../../utils";

// const HomePage = () => {
// const [loggedInUser, setLoggedInUser] = useState("");
// const navigate = useNavigate();

// const user = localStorage.getItem("loggedInUser");
// const token = localStorage.getItem("token");

// useEffect(() => {
//   if (!token) {
//     navigate("/login");
//   } else {
//     setLoggedInUser(user);
//   }
// }, [navigate]);

// const handleLogout = () => {
//   localStorage.clear();
//   handleSuccess("Logout successfully!!");
//   setTimeout(() => navigate("/login"));
// };
//   return (
//     <div>
//       <Header user={loggedInUser} onLogout={handleLogout}></Header>
//     </div>
//   );
// };
// export default HomePage;

//loginform.jsx
import React, { useState } from "react";
import { handleSuccess, handleError } from "../../utils";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useLoginUserMutation } from "../../redux/slices/userSlice";

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...loginInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      handleSuccess("user login successfully!!");
      const res = await loginUser(loginInfo).unwrap();
      localStorage.setItem("loggedInUser", res.name);
      localStorage.setItem("email", res.email);
      localStorage.setItem("token", res.jwtToken);

      setTimeout(() => navigate("/home"));
    } catch (err) {
      handleError("Error in =submitting data!!");
    }
  };
  return (
    <div>
      <div>
        <form>
          <button disabled={isLoading}>
            {isLoading ? "Logging" : "Login"}
          </button>
          <p>
            Do u have an account?
            <Link to="/signup"></Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
export default LoginForm;
