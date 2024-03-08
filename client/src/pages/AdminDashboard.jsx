import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

import SuccessDialog from "../components/SuccessDialog";

export default function AdminDashboard() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // No need to store image in state since it will be handled by FormData upon form submission
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    category: "",
    price: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/shoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data successfully saved", result);
        // Handle success (e.g., reset the form, show a success message)
        e.target.reset(); // Reset the form if using <form> element
        setFormData({
          title: "",
          type: "",
          category: "",
          price: "",
        });
        setShowSuccessDialog(true);
      } else {
        // Handle HTTP errors
        console.error("Failed to save data", response);
      }
    } catch (error) {
      // Handle network errors
      console.error("Error saving data:", error);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-base-300 p-5">
        <div className="card w-full max-w-3xl bg-base-100 shadow-xl -mt-24">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center mb-12">
              Add New Shoes
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-wrap">
              <div className="w-full md:w-1/2 px-6">
                {/* Left Column */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-bold">Title</span>
                  </label>
                  <input
                    name="title"
                    className="input input-bordered input-primary"
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-bold">Type</span>
                  </label>
                  <select
                    name="type"
                    className="select select-bordered select-primary"
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Please select</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Children">Children</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Image</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered"
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="w-full md:w-1/2 px-6">
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-bold">Category</span>
                  </label>
                  <select
                    name="category"
                    className="select select-bordered select-primary"
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Please select</option>
                    <option value="Athletic">Athletic</option>
                    <option value="Casual">Casual</option>
                    <option value="Dress">Dress</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Price</span>
                  </label>
                  <input
                    name="price"
                    type="number"
                    className="input input-bordered input-primary"
                    onChange={handleFormChange}
                    required
                    step="1" // Allows only integer values
                    max="9999" // Maximum value of 9999
                  />
                </div>
              </div>

              {/* Used for the add button */}
              <div className="w-full flex justify-center mt-12 py-6">
                {/* Centering Container */}
                <div className="form-control w-1/2">
                  <button type="submit" className="btn btn-primary w-full">
                    Add
                  </button>
                </div>

                {showSuccessDialog && (
                  <SuccessDialog
                    text={"Your item has been added successfully"}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
