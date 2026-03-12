import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";
import { useLoginUserMutation } from "../../redux/slices/userSlice";

function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(loginInfo).unwrap();

      if (res.success) {
        handleSuccess(res.message);

        localStorage.setItem("token", res.jwtToken);
        localStorage.setItem("loggedInUser", res.name);
        localStorage.setItem("email", res.email);

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (err) {
      handleError(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
}

export default LoginForm;
