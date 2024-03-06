import React from "react";
const ReviewConfirm = ({ itemCount, subtotal }) => {
  const taxRate = 0.1; // 10% tax rate
  const taxAmount = subtotal * taxRate;
  const shippingFees = 5.0;
  const total = subtotal + taxAmount + shippingFees;
  return (
    <div>
      <p className="text-center mb-6">Review your details and confirm</p>
      
      <div className="divider"></div> 
      {/* Assuming first name and last name fields are managed elsewhere in the parent component */}
      <label className="label">
        <span className="label-text font-bold text-lg">Items: {itemCount}</span>
      </label>

      <label className="label">
        <span className="label-text font-bold text-lg">Total: ${total.toFixed(2)}</span>
      </label>

      <div className="divider"></div> 

    </div>
  );
};

export default ReviewConfirm;
