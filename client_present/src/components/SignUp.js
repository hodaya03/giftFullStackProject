import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoToServer, GoToServer1, convertFormDataToArray } from "../fetch";
import '../css/SignUp.css'; // Import the CSS file

export default function SignUp() {
  const navigate = useNavigate();
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
    const { email, password } = formData;
    if (email === "" || password === "") {
      alert("Email and password required.");
      return;
    }

    const query = `/Signup`;    
    const parameters = convertFormDataToArray(formData);

    GoToServer(query, "POST", { parameters })

    // GoToServer(query, "POST", formData)
      .then((response) => {
        console.log("Server response:", response);
        alert("User added successfully");

        // Clear form fields
        setFormData({
          email: "",
          password: "",
        });
        navigate('/home');
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
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
