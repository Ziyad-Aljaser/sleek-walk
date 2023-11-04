import React, { useEffect, useState, useMemo } from "react";

import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

import { db } from "../config/firebase";

import { getDocs, collection, doc, setDoc } from "firebase/firestore";

export default function Profile() {
  // Get the current user from the authentication hook
  const { currentUser } = useAuth();

  // Extract and split the user's name into first and last names
  const [firstName, lastName] = (currentUser.displayName || "").split(" ");

  // State to manage which detail section to show
  const [detailToShow, setDetailToShow] = useState("Name");

  // A test user ID for demonstration purposes
  const testUserID = "UserIDTest";

  // State for toggling the address section's visibility
  const [showAddressSection, setShowAddressSection] = useState(false);

  // State to store the user's address if it exists
  const [userAddress, setUserAddress] = useState(null);

  // States for address input fields
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  // Hardcoded list of countries for the select dropdown
  const countries = [
    { name: "Canada" },
    { name: "Saudi Arabia" },
    { name: "United Kingdom" },
    { name: "United States" },
  ];

  // Use useMemo to memoize the reference to the user's address collection in Firestore
  // to avoid unnecessary recalculations and re-renders
  const userAddressCollectionRef = useMemo(() => {
    return collection(db, "users", testUserID, "user_address");
  }, [testUserID]); // Dependency array ensures this only recalculates if testUserID changes

  // useEffect hook to fetch the user's address on component mount or when the reference changes
  useEffect(() => {
    console.log("Profile useEffect triggered");

    const fetchUserAddress = async () => {
      console.log("Fetching user address...");
      const querySnapshot = await getDocs(userAddressCollectionRef);
      if (!querySnapshot.empty) {
        const addressData = querySnapshot.docs[0].data();
        setUserAddress(addressData);
        console.log("Data found");
      } else {
        console.log("No address data found");
      }
    };

    fetchUserAddress();
  }, [userAddressCollectionRef]); // The dependency array includes the memoized ref

  // Function to handle saving the address to Firestore
  const handleSaveAddress = async () => {
    if (country && city && street) {
      try {
        const addressDetails = { country, city, street };
        const userAddressDocRef = doc(
          db,
          "users",
          testUserID,
          "user_address",
          "single_address"
        );

        // Merge true allows to update the document or create it if it doesn't exist
        await setDoc(userAddressDocRef, addressDetails, { merge: true });

        alert("Address saved successfully!");
        setUserAddress(addressDetails);
        setShowAddressSection(false);
      } catch (err) {
        alert("Error saving address. Please try again.");
        console.error(err);
      }
    } else {
      alert("Please fill out all the address details.");
    }
  };
  // Function to handle adding a new address or editing the current one
  const handleAddressChange = () => {
    // Clear the address fields
    setCountry("");
    setCity("");
    setStreet("");

    // Show the address section with empty fields
    setShowAddressSection(true);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-base-300 p-4">
        <div className="card w-full max-w-xl bg-base-100 shadow-xl -mt-12">
          <div className="card-body">
            {/* Profile Header */}
            <h1 className="text-4xl font-bold text-center mb-8">Profile</h1>

            <div className="flex">
              {/* Vertical Buttons */}
              <div className="join join-vertical mr-8 bg-base-200">
                <button
                  className="btn join-item py-14"
                  onClick={() => setDetailToShow("Name")}
                >
                  Name
                </button>
                <button
                  className="btn join-item py-14"
                  onClick={() => setDetailToShow("Email")}
                >
                  Email
                </button>
                <button
                  className="btn join-item py-14"
                  onClick={() => setDetailToShow("Address")}
                >
                  Address
                </button>
              </div>

              {/* Profile Information */}
              <div className="flex-grow">
                {detailToShow === "Name" && (
                  <>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold">First Name</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        className="input input-bordered input-primary"
                        readOnly
                      />
                    </div>
                    <div className="form-control mt-4">
                      <label className="label">
                        <span className="label-text font-bold">Last Name</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        className="input input-bordered input-primary"
                        readOnly
                      />
                    </div>
                  </>
                )}
                {detailToShow === "Email" && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={currentUser.email}
                      className="input input-bordered input-primary"
                      readOnly
                    />
                  </div>
                )}
                {detailToShow === "Address" && (
                  <div className="form-control">
                    {showAddressSection ? (
                      // Address Form for Adding or Updating
                      <div>
                        {/* Country */}
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Country</span>
                          </label>
                          <select
                            className="select select-bordered select-primary w-full"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          >
                            <option disabled value="">
                              Select a country
                            </option>
                            {countries.map((c) => (
                              <option value={c.name}>{c.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* City */}
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">City</span>
                          </label>
                          <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="input input-bordered input-primary"
                          />
                        </div>

                        {/* Street */}
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Street</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="input input-bordered input-primary"
                          />
                        </div>

                        {/* Save or Update Address Button */}
                        <button
                          onClick={handleSaveAddress}
                          className="btn btn-primary mt-2"
                        >
                          {userAddress ? "Update Address" : "Save Address"}
                        </button>
                      </div>
                    ) : userAddress ? (
                      // Existing Address Display
                      <>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-bold">
                              Country
                            </span>
                          </label>
                          <input
                            type="text"
                            value={userAddress.country || ""}
                            className="input input-bordered input-primary"
                            readOnly
                          />
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-bold">City</span>
                          </label>
                          <input
                            type="text"
                            value={userAddress.city || ""}
                            className="input input-bordered input-primary"
                            readOnly
                          />
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-bold">Street</span>
                          </label>
                          <input
                            type="text"
                            value={userAddress.street || ""}
                            className="input input-bordered input-primary"
                            readOnly
                          />
                        </div>

                        {/* Button to Edit the Existing Address */}
                        <button
                          onClick={handleAddressChange}
                          className="btn btn-primary mt-10"
                        >
                          Change Address
                        </button>
                      </>
                    ) : (
                      <>
                        <p>No address found. Please add an address.</p>
                        <button
                          onClick={handleAddressChange}
                          className="btn btn-primary mt-2"
                        >
                          Add Address
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
