import React from "react";
import Layout from "../components/Layout/Layout";

export default function AdminDashboard() {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("AdminDashboard");
  };
  const handleForm = (e) => {
    console.log("AdminDashboard submit form");
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-base-300 p-5">
        <div className="card w-full max-w-3xl bg-base-100 shadow-xl -mt-24">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center mb-12">
              Add New Shoes
            </h1>

            <form onSubmit={handleLogin} className="flex flex-wrap">
              <div className="w-full md:w-1/2 px-6">
                {/* Left Column */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-bold">Title</span>
                  </label>
                  <input
                    className="input input-bordered input-primary"
                    onChange={handleForm}
                    required
                  />
                </div>

                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-bold">Type</span>
                  </label>
                  <select
                    className="select select-bordered select-primary"
                    onChange={handleForm}
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
                    className="select select-bordered select-primary"
                    onChange={handleForm}
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
                    type="number"
                    className="input input-bordered input-primary"
                    onChange={handleForm}
                    required
                    step="1" // Allows only integer values
                    max="9999" // Maximum value of 9999
                  />
                </div>
              </div>

              {/* Used for the add button */}
              <div className="w-full flex justify-center mt-12 py-6">
                {" "}
                {/* Centering Container */}
                <div className="form-control w-1/2">
                  {" "}
                  {/* Button's Container */}
                  <button type="submit" className="btn btn-primary w-full">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
