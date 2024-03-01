import React, { useState, useEffect } from "react";
const Payment = ({ updateFormValidity }) => {

  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  useEffect(() => {
    const isValid = cardholderName && cardNumber && expiryDate && cvc; // Basic validation
    updateFormValidity(isValid);
  }, [cardholderName, cardNumber, expiryDate, cvc, updateFormValidity]);

  // Regular expression to match non-alphabetic characters
  const handleNameChange = (event) => {
    const nonAlphabetical = /[^A-Za-z\s]/g;
    event.target.value = event.target.value.replace(nonAlphabetical, "");
    setCardholderName(event.target.value);
  };

  // Regular expression to remove non-numeric characters
  const handleCreditCardChange = (event) => {
    const nonNumeric = /[^0-9]/g;
    let value = event.target.value.replace(nonNumeric, "");

    // Add a space after every 4 digits
    value = value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");

    event.target.value = value;
    setCardNumber(value);
  };

  // Regular expression to remove non-numeric characters and existing slashes
  const handleExpirationDateChange = (event) => {
    // Regular expression to remove non-numeric characters and existing slashes
    const nonNumeric = /[^0-9]/g;
    let value = event.target.value.replace(nonNumeric, "");

    // If the first character is bigger than 2, prepend with 0
    if (value.length === 1 && parseInt(value) > 2) {
      value = "0" + value;
    }

    // If more than two characters, add a '/' after the 2nd digit
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }

    event.target.value = value;
    setExpiryDate(value);
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Cardholder Name</span>
      </label>
      <input
        type="text"
        placeholder="cardholder name"
        className="input input-bordered input-primary"
        onChange={handleNameChange}
      />

      <label className="label mt-5">
        <span className="label-text">Credit Card Information</span>
      </label>
      <input
        type="text"
        placeholder="card number"
        className="input input-bordered input-primary"
        onChange={handleCreditCardChange}
        maxLength={19} // 16 digits + 3 spaces
      />

      <div className="flex flex-col sm:flex-row">
        <input
          type="text"
          placeholder="MM/YY"
          className="input input-bordered input-primary sm:w-1/4 mt-5 sm:mr-5"
          onChange={handleExpirationDateChange}
          maxLength="5"
        />
        <input
          type="password"
          placeholder="CVC"
          className="input input-bordered input-primary sm:w-1/4 mt-5"
          maxLength="3"
          onChange={(e) => setCvc(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Payment;
