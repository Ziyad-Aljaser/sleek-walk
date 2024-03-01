import React, { useEffect, useState } from "react";

import Layout from "../components/Layout/Layout";
import AddressForm from "../components/AddressForm";
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
  const UserID = currentUser.uid;

  // State for toggling the address section's visibility
  const [showAddressSection, setShowAddressSection] = useState(false);

  // State to store the user's address if it exists
  const [userAddress, setUserAddress] = useState(null);

  // States for address input fields
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  // Effect hook to fetch user address from Firestore
  useEffect(() => {
    console.log("Address useEffect triggered");
    // Asynchronous function to fetch user address
    const getUserAddress = async () => {
      const userAddressRef = collection(db, `users/${UserID}/user_address`);
      const querySnapshot = await getDocs(userAddressRef);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      } else {
        // Handle the case where the user has no address
        return null;
      }
    };

    const fetchAddress = async () => {
      const addressData = await getUserAddress();
      if (addressData) {
        setUserAddress(addressData);
      } else {
        console.log("No address data found");
        setUserAddress(null); // Ensure user address is set to null if not found
      }
    };

    fetchAddress();
  }, [UserID]); // Dependency on testUserID to refetch if it changes

  // Function to handle saving the address to Firestore
  const handleSaveAddress = async () => {
    if (country && city && street) {
      try {
        const addressDetails = { country, city, street };
        const userAddressDocRef = doc(
          db,
          "users",
          UserID,
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
                        disabled
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
                        disabled
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
                      disabled
                    />
                  </div>
                )}
                {detailToShow === "Address" && (
                  <div className="form-control">
                    {showAddressSection ? (
                      // Address Form for Adding or Updating
                      <div>
                        <AddressForm
                          country={country}
                          setCountry={setCountry}
                          city={city}
                          setCity={setCity}
                          street={street}
                          setStreet={setStreet}
                          readonly={false}
                        />

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
                        {/* Existing Address Display */}
                        <AddressForm
                          country={userAddress?.country}
                          setCountry={setCountry}
                          city={userAddress?.city}
                          setCity={setCity}
                          street={userAddress?.street}
                          setStreet={setStreet}
                          readonly={!!userAddress} // This will pass true if userAddress is not null
                        />
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
