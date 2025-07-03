import React, { useState } from "react";
import "../Styles/loginPage.scss";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/state";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPages = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(
        "http://localhost:3000/authentication/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await response.json();

      if (response.ok && data.token) {
        dispatch(setLogin({ user: data.user, token: data.token }));
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">Login</button>

          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
};

export default LoginPages;
