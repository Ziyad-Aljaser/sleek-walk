import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { db } from "../config/firebase";
import { doc, setDoc, collection } from "firebase/firestore";

import { getActiveCartId } from "../utils/FirestoreUtils";

import useShoesData from "../data/useShoesData";

import Layout from "../components/Layout/Layout";

export default function ShoeDetails() {
  const { currentUser } = useAuth();

  const { id } = useParams();
  const { shoes, isLoading, error } = useShoesData();

  const [ addingLoading, setAddingLoading ] = useState(false);

  const [shoe, setShoe] = useState(null);

  const [searchComplete, setSearchComplete] = useState(false); // New state to track search completion
  // Used for the tab section
  const content = {
    "Product Details": `${shoe?.type ?? "Not specified"}, ${
      shoe?.category ?? "Not specified"
    }`,
    Reviews: "Reviews Section",
  };
  useEffect(() => {
    if (!isLoading) {
      const foundShoe = shoes.find((s) => s._id === id);
      setShoe(foundShoe);
      setSearchComplete(true); // Set search completion to true once the search is done
    }
  }, [id, shoes, isLoading]);

  const [size, setSize] = useState(); // State to manage the selected shoe size
  // Used for the Qty
  const maxQty = 9;
  const [qty, setQty] = useState(1); // Initial quantity set to 1

  // Used for the cart button click to show the alert
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

  // Used for the tab section
  const [activeTab, setActiveTab] = useState("Product Details");

  if (isLoading || !searchComplete) {
    // Keep showing the loading indicator until the search is complete
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen bg-base-300">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      </Layout>
    );
  }

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

  // Function to handle size change
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  // Function to handle adding items to cart
  const handleAddButtonClick = async () => {
    setAddingLoading(true); // Indicate that the item is being added to the cart
    if (!currentUser) {
      window.location.href = "/login"; // Redirect the user to the login page
      return; // Stop execution of the rest of the function
    }

    const userId = currentUser.uid;

    if (!size) {
      alert("Please select a size");
      return;
    }

    const cartItem = {
      productID: id,
      title: shoe.title,
      price: parseFloat(shoe.price), // Ensure the price is a float
      size: parseInt(size, 10), // Ensure size is stored as an integer
      quantity: parseInt(qty, 10), // Ensure quantity is stored as an integer
    };

    try {
      const cartId = await getActiveCartId(userId, db); // Get the active cart ID

      // Reference to the user's cart item document
      const newItemRef = doc(
        collection(db, `users/${userId}/user_carts/${cartId}/cart_items`)
      );

      // Set the cart item data
      await setDoc(newItemRef, cartItem);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top smoothly
      setShowAlert(true); // Display the alert when the button is clicked
    } catch (error) {
      console.error("Error adding to cart: ", error);
      alert("There was an issue adding the item to the cart.");
    }
    setAddingLoading(false); // Indicate that the item has been added to the cart
  };

  if (error) {
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
          Error loading shoes: {' '} {error} {' '}
          <Link to="/" className="link link-primary">
            Back Home
          </Link>
        </span>
      </div>
    );
  }

  // Used to check the item
  if (!shoe && searchComplete) {
    // Now, we check if the shoe is not found only after the search is complete
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
          The shoes you are looking for are not available.{" "}
          <Link to="/" className="link link-primary">
            Back Home
          </Link>
        </span>
      </div>
    );
  }
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
                  <h3 className="text-3xl font-semibold">${shoe.price}</h3>
                </div>

                <div className="flex items-start justify-between">
                  {/* Left column: Size selection */}
                  <div className="mr-11">
                    <label className="label block mb-1">
                      <span className="label-text">Select Your Size</span>
                    </label>
                    <select
                      className="select select-primary"
                      value={size}
                      onChange={handleSizeChange}
                    >
                      <option disabled selected>
                        Size
                      </option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
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
                  className={'btn btn-primary'}
                  onClick={handleAddButtonClick}
                  disabled={addingLoading}
                >
                  {addingLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "Add to Cart"
                  )}
                </button>

                {/* Tabs Section */}
                <div>
                  <div role="tablist" className="tabs tabs-lifted pt-12">
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
                  <p className="tabs py-6 ml-2">{content[activeTab]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
