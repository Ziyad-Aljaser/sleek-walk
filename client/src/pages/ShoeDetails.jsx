import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { SHOES } from "../data/ShoesData"; // Importing SHOES data from Home.jsx

import Layout from "../components/Layout";

export default function ShoeDetails() {
  // Used to find the item
  const { id } = useParams();
  const shoe = SHOES.find((shoe) => shoe.id === Number(id));

  // Used to get the correct path for a given shoe type
  function getTypePath(type) {
    switch (type) {
      case "Men":
        return "men-shop";
      case "Women":
        return "women-shop";
      default:
        return type.toLowerCase();
    }
  }

  // Used for the Qty
  const maxQty = 9;
  const [qty, setQty] = useState(1); // Initial quantity set to 1

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prevQty) => prevQty - 1);
    }
  };

  const increaseQty = () => {
    if (qty < maxQty) {
      setQty((prevQty) => prevQty + 1);
    }
  };

  // Used for the cart button click to show the alert
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

  const handleAddButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top smoothly
    setShowAlert(true); // Display the alert when the button is clicked
  };

  // Used for the tab section
  const [activeTab, setActiveTab] = useState("Description");

  // Used to check the item
  if (!shoe) {
    return (
      <div className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>
          Error! Shoe not found.{" "}
          <Link to="/" className="link link-primary">
            Back Home
          </Link>
        </span>
      </div>
    );
  }

  // Used for the tab section
  const content = {
    Description: "Description Test",
    "Product Details": `${shoe.type}, ${shoe.category}`,
    "Vendor Info": "Vendor Info Test",
    Reviews: "Reviews Test",
  };

  return (
    <Layout>
      <div className="bg-base-300">
        {/* Alert Section */}
        {showAlert && ( // Conditional rendering based on the showAlert state
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>
              Successfully added {shoe.title} to the cart!{" "}
              <Link to="/cart" className="link link-primary">
                Go to cart
              </Link>
            </span>
          </div>
        )}
        {/* Breadcrumbs Section */}
        <div className="border-b py-6">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to={`/${getTypePath(shoe.type)}`}>{shoe.type}</Link>
                </li>
                <li>{shoe.title}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col w-full lg:flex-row">
            {/* Image Section */}
            <div className="max-w-md py-14">
              <img
                src={shoe.image}
                className="object-cover rounded-lg"
                alt={shoe.title}
              />
            </div>

            {/* Divider */}
            <div className="divider lg:divider-horizontal p-6" />

            {/* Details Section */}
            <div className="grid flex-shrink sm:my-14">
              <div className="flex flex-col space-y-5 lg:pl-4">
                <div className="grid md:grid-cols-2">
                  <h2 className="text-2xl font-bold">
                    {shoe.title}{" "}
                    <div className="badge badge-secondary text-xs">New</div>
                  </h2>
                  <div className="rating rating-md md:ml-auto">
                    <input
                      type="radio"
                      name="rating-5"
                      className="mask mask-star-2 bg-purple-500"
                      disabled
                    />
                    <input
                      type="radio"
                      name="rating-5"
                      className="mask mask-star-2 bg-purple-500"
                      disabled
                    />
                    <input
                      type="radio"
                      name="rating-5"
                      className="mask mask-star-2 bg-purple-500"
                      disabled
                    />
                    <input
                      type="radio"
                      name="rating-5"
                      className="mask mask-star-2 bg-purple-500"
                      checked
                      disabled
                    />
                    <input
                      type="radio"
                      name="rating-5"
                      className="mask mask-star-2 bg-purple-500"
                      disabled
                    />
                  </div>
                </div>

                <div className="pb-20">
                  <h3 className="text-3xl font-semibold">{shoe.price}</h3>
                </div>

                <div className="flex items-start">
                  {/* Left column: Size selection */}
                  <div className="mr-11">
                    <label className="label block mb-1">
                      <span className="label-text">Select Your Size</span>
                    </label>
                    <select className="select select-primary">
                      <option disabled selected>
                        Size
                      </option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                    </select>
                  </div>

                  {/* Right column: Quantity controls */}
                  <div className="flex flex-col">
                    <label className="label mb-2">
                      <span className="label-text">Qty</span>
                    </label>
                    <div className="flex items-center">
                      <button
                        onClick={decreaseQty}
                        className="btn btn-primary mr-3"
                      >
                        -
                      </button>
                      <span>{qty}</span>
                      <button
                        onClick={increaseQty}
                        className="btn btn-primary ml-3"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary w-1/2"
                  onClick={handleAddButtonClick}
                >
                  Add to Cart
                </button>

                {/* Tabs Section */}
                <div>
                  <div className="tabs pt-12">
                    {Object.keys(content).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`tab tab-lg tab-lifted ${
                          activeTab === tab ? "tab-active" : "text-gray-400"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <p>{content[activeTab]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
