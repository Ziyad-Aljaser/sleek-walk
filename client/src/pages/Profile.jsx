import React, { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

import { db } from "../config/firebase";

import {
  getDocs,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";

export default function Profile() {
  const { currentUser } = useAuth();

  // Used to split the display name into first and last names
  const [firstName, lastName] = (currentUser.displayName || "").split(" ");

  // useState to manage which detail is displayed (Name or Email)
  const [detailToShow, setDetailToShow] = useState("Name");

  // Used to show the address fields
  const [showAddressSection, setShowAddressSection] = useState(false);

  const [userAddress, setUserAddress] = useState(null);

  console.log(db);

  const addressesCollectionRef = collection(db, "addresses");

  useEffect(() => {
    const fetchUserAddress = async () => {
      const q = query(
        addressesCollectionRef,
        where("userID", "==", currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const addressData = querySnapshot.docs[0].data().addressDetails;
        setUserAddress(addressData);
      }
    };

    fetchUserAddress();
  }, [currentUser.uid, addressesCollectionRef]);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const countries = [
    { code: "CAN", name: "Canada" },
    { code: "KSA", name: "Saudi Arabia" },
    { code: "GBR", name: "United Kingdom" },
    { code: "USA", name: "United States" },
  ];

  // useEffect (() => {
  //   const getAddressesList = async () => {
  //     try {
  //       const data = await getDocs(addressesCollectionRef);
  //       const filteredData = data.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       console.log(filteredData)
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getAddressesList();
  // }, []);

  const handleSaveAddress = async () => {
    if (country && city && street) {
      try {
        const addressDetails = {
          country: country,
          city: city,
          street: street,
        };

        await addDoc(addressesCollectionRef, {
          userID: currentUser.uid,
          addressDetails: addressDetails,
        });

        alert("Address saved successfully!");

        // Optionally, you can reset the form fields after successful submission
        setCountry("");
        setCity("");
        setStreet("");
        // If you have a state or method to show a success message, use it here
        // showSuccessMessage('Address saved successfully!');
      } catch (err) {
        alert("Error saving address. Please try again.");
        console.error(err);
        // If you have a state or method to show an error message, use it here
        // showErrorMessage('Failed to save address. Please try again.');
      }
    } else {
      // If you have a state or method to show an error message, use it here
      // showErrorMessage('Please fill all address fields.');
      alert("Please fill out all the address details.");
    }
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

                    {userAddress ? (
                      <>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-bold">Country</span>
                          </label>
                          <input
                            type="text"
                            name="country"
                            value={userAddress.country}
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
                            name="city"
                            value={userAddress.city}
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
                            name="street"
                            value={userAddress.street}
                            className="input input-bordered input-primary"
                            readOnly
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {showAddressSection ? (
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
                                  <option key={c.code} value={c.code}>
                                    {c.name}
                                  </option>
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
                                placeholder="city"
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
                                placeholder="street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="input input-bordered input-primary"
                              />
                            </div>

                            {/* Save Address Button */}
                            <button
                              onClick={handleSaveAddress} // Remember to implement the handleSaveAddress function
                              className="btn btn-primary mt-2"
                            >
                              Save Address
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowAddressSection(true)}
                            className="btn btn-primary mt-2"
                          >
                            Add Address
                          </button>
                        )}
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
