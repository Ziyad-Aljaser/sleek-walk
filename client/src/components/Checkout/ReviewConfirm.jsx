import React from "react";
const ReviewConfirm = () => {
  return (
    <div>
      <p className="text-center mb-6">Review your details and confirm</p>

      {/* Assuming first name and last name fields are managed elsewhere in the parent component */}
      <label className="label">
        <span className="label-text">First Name</span>
      </label>
      <input
        type="fname"
        placeholder="first name"
        className="input input-bordered w-full max-w-xs"
        disabled
      />

      <label className="label">
        <span className="label-text">Last Name</span>
      </label>
      <input
        type="lname"
        placeholder="last name"
        className="input input-bordered w-full max-w-xs"
        disabled
      />
    </div>
  );
};

export default ReviewConfirm;
