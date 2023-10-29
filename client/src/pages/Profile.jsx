import React from "react";

import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { currentUser } = useAuth();

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-base-300 p-4 -mt-12">
        <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
          <div className="card-body">

            {/* Profile Header */}
            <h1 className="text-4xl font-bold text-center mb-8">Profile</h1>

            <div className="flex">
              {/* Vertical Buttons */}
              <div className="join join-vertical mr-8 bg-base-200">
                <button className="btn join-item py-14">Name</button>
                <button className="btn join-item py-14">Email</button>
                <button className="btn join-item py-14">Address</button>
              </div>
              
              {/* Profile Information */}
              <div className="flex-grow">
                <p><strong>Full Name:</strong> {currentUser.displayName}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
