import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { GoToServer, convertFormDataToArray } from "../fetch";
import "../css/SignUp.css"; // Import the CSS file

export default function SignUp() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isDealer, setIsDealer] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDealerChange = () => {
    setIsDealer(!isDealer);
    if (!isDealer) {
      setFormData({ ...formData, authorizedDealerNumber: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const { email, password } = formData;
    if (email === "" || password === "") {
      alert("Email and password required.");
      return;
    }

    // Simple email format validation
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email.");
      return;
    }

    console.log("Sending data to server:", formData);

    const query = `/Signup`;
    // const parameters = convertFormDataToArray(formData);

    // GoToServer(query, "POST", { parameters })
    GoToServer(query, "POST", formData)
      // .then((response) => {
      //   console.log("Server response:", response);
      //   if (!response.ok) {
      //     return response.json().then((data) => {
      //       throw new Error(data.message || "Signup failed");
      //     });
      //   }
      //   return response.json();
      // })
      .then((data) => {
        // .then(() => {
        console.log("Server response:", data);
        const { token, userId } = data;

        alert("User added successfully");

        // Store the token in localStorage or sessionStorage
        localStorage.setItem("token", token);
        setUser({ username: formData.email, id: userId });

        // Clear form fields
        setFormData({
          email: "",
          password: "",
        });
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error:", error);
        // alert(error);
        alert("Signup failed. Please try again.");
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
