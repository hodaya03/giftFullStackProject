import React, { useContext, useState, useEffect } from "react";
import { GoToServer, GoToServer1, convertFormDataToArray } from "../fetch";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function BuyGift() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [creditCard, setCreditCard] = useState({
    cardHolderID: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });
  const [deliveryDetails, setDeliveryDetails] = useState({
    email: "",
    phoneNumber: "",
    name: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch categories from the server
    GoToServer("/categories", "GET")
      .then((response) => setCategories(response))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((category) => category !== value)
    );
  };

  
  const validateInputs = () => {
    const newErrors = {};

    if (!/^\d{9}$/.test(creditCard.cardHolderID)) {
      newErrors.cardHolderID = "ID card number must contain exactly 9 digits.";
    }
    if (!/^\d{14,16}$/.test(creditCard.cardNumber)) {
      newErrors.cardNumber = "Credit card number must contain 14 to 16 digits.";
    }
    if (!/^\d{2}$/.test(creditCard.expiryMonth)) {
      newErrors.expiryMonth = "Expiry month must contain exactly 2 digits.";
    }
    if (!/^\d{4}$/.test(creditCard.expiryYear)) {
      newErrors.expiryYear = "Expiry year must contain exactly 4 digits.";
    }
    if (!/^\d{3,4}$/.test(creditCard.cvc)) {
      newErrors.cvc = "CVC must contain 3 or 4 digits.";
    }
    if (!/^\d{10}$/.test(deliveryDetails.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must contain exactly 10 digits.";
    }
    if (selectedCategories.length === 0) {
      newErrors.selectedCategories = "At least one category must be selected.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateGiftCode = async () => {
    let giftCode;
    let exists;

    do {
      giftCode = Math.floor(10000 + Math.random() * 90000).toString();
      const query = `/checkOrderNumber/${giftCode}`;
      const response = await GoToServer(query, "GET");
      exists = response.exists;
      console.log("exists", exists);
      //   alert(exists);
    } while (exists);

    return giftCode;
  };


useEffect(() => {
  
    const updateUser = async () => {

      // if(!user) {
      //   alert("You must be connected to continue.")
      //   navigate("/login");
      // }

    const userName = user.username ? user.username : "";
    const userIdQuery = `/user/${userName}`;
    try {
       const resp = await GoToServer(userIdQuery, "GET");
    const userid = resp.Id;
    setUserId(userid);
    console.log('userId', userId); 
    console.log("user.id", userId);
  
    }
    catch (error) {
            console.error('Error:', error);
            // Handle error
          }
    };

    
      if(!user) {
        alert("You must be connected to continue.")
        navigate("/login");
      }
  updateUser();
  console.log('userId updated:', userId);
  // Autres actions basées sur userId ici si nécessaire
}, [userId]);



 


  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (!user) {
    //   alert("You must be logged in to place an order.");
    //   navigate("/login");
    //   return;
    // }

    if (!validateInputs()) {
      return;
    }

    console.log("user.username", user.username);

    console.log("user.id", userId);

    const giftCode = await generateGiftCode();
    console.log("giftCode", giftCode);

    

    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString();
    

    const validityDate = new Date();
    validityDate.setFullYear(validityDate.getFullYear() + 2);
    const formattedValidityDate = validityDate.toISOString().slice(0, 7);
    
    const orderData = {
      Date: formattedCurrentDate,
      ExpirationDate: formattedValidityDate,
      Amount: amount,
      Category: selectedCategories,
      UserId: userId,
      GiftCode: giftCode,
      Buyed: "false",
      DelEmail: deliveryDetails.email,
      DelPhoneNumber: deliveryDetails.phoneNumber,
      DelName: deliveryDetails.name,
      DelNote: deliveryDetails.note,
    };

    
    console.log("orderData1", orderData);
    const response = await GoToServer("/completeOrder", "POST", orderData);
    console.log("response", response);
    console.log("response.status", response.status);
    console.log("response.message", response.message);
    console.log("orderData2", orderData);

    // if (response.status === 200) {
    if (response.message === "Order completed successfully") {
      alert("Order completed successfully!");
     
      setAmount("");
      setSelectedCategories([]);
      setCreditCard({
        cardHolderID: "",
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvc: "",
      });
      setDeliveryDetails({
        email: "",
        phoneNumber: "",
        name: "",
        note: "",
      });
    } else {
      alert("Failed to complete order. Please try again.");
    }
  
  };

  return (
    <div>
      <h1>Buy a Gift Card</h1>
      <form onSubmit={handleSubmit}>
        <h2>Gift Amount</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <h2>Select Categories</h2>
        {categories.map((category) => (
          <div key={category.id}>
            <label>
              <input
                type="checkbox"
                value={category.name}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(category.name)}
              />
              {category.name}
            </label>
          </div>
        ))}
        {errors.selectedCategories && (
          <div className="error">{errors.selectedCategories}</div>
        )}
        <h2>Credit Card Details</h2>
        <input
          type="text"
          placeholder="ID Card of Card Holder"
          value={creditCard.cardHolderID}
          onChange={(e) =>
            setCreditCard({ ...creditCard, cardHolderID: e.target.value })
          }
          required
        />
        {errors.cardHolderID && (
          <div className="error">{errors.cardHolderID}</div>
        )}

        <input
          type="text"
          placeholder="Card Number"
          value={creditCard.cardNumber}
          onChange={(e) =>
            setCreditCard({ ...creditCard, cardNumber: e.target.value })
          }
          required
        />
        {errors.cardNumber && <div className="error">{errors.cardNumber}</div>}

        <input
          type="text"
          placeholder="Expiry Month"
          value={creditCard.expiryMonth}
          onChange={(e) =>
            setCreditCard({ ...creditCard, expiryMonth: e.target.value })
          }
          required
        />
        {errors.expiryMonth && (
          <div className="error">{errors.expiryMonth}</div>
        )}
        <input
          type="text"
          placeholder="Expiry Year"
          value={creditCard.expiryYear}
          onChange={(e) =>
            setCreditCard({ ...creditCard, expiryYear: e.target.value })
          }
          required
        />
        {errors.expiryYear && <div className="error">{errors.expiryYear}</div>}

        <input
          type="text"
          placeholder="CVC"
          value={creditCard.cvc}
          onChange={(e) =>
            setCreditCard({ ...creditCard, cvc: e.target.value })
          }
          required
        />
        {errors.cvc && <div className="error">{errors.cvc}</div>}

        <h2>Delivery Details</h2>
        <input
          type="email"
          placeholder="Email"
          value={deliveryDetails.email}
          onChange={(e) =>
            setDeliveryDetails({ ...deliveryDetails, email: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={deliveryDetails.phoneNumber}
          onChange={(e) =>
            setDeliveryDetails({
              ...deliveryDetails,
              phoneNumber: e.target.value,
            })
          }
          required
        />
        {errors.phoneNumber && (
          <div className="error">{errors.phoneNumber}</div>
        )}

        <input
          type="text"
          placeholder="Name"
          value={deliveryDetails.name}
          onChange={(e) =>
            setDeliveryDetails({ ...deliveryDetails, name: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Note or Greeting"
          value={deliveryDetails.note}
          onChange={(e) =>
            setDeliveryDetails({ ...deliveryDetails, note: e.target.value })
          }
        />

        <button type="submit">Complete Order</button>
      </form>
    </div>
  );
}
