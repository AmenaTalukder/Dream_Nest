import React, { useEffect, useState } from "react";
import "../Styles/RegisterPages.scss";
import { FaDownload } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "profileImage" ? files[0] : value
    }));
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

  // Check password match
  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      const register_form = new FormData();

      for (var key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch(
        "http://localhost:3000/authentication/register",
        {
          method: "POST",
          body: register_form
        }
      );
      if (response.ok) {
        toast.success("Registration Successful");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Enter Your Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Password is not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            value={formData.profileImage}
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
            required
          />
          <label htmlFor="image">
            <FaDownload className="icon" />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="Profile"
              style={{ maxWidth: "80px" }}
            />
          )}

          <button type="submit" disabled={!passwordMatch}>
            Register
          </button>

          <p>
            Already have an account? <Link to="/login">Login here</Link>
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

export default RegisterPage;
