import React, { useState } from "react";

import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { currentUser } = useAuth();
  
  // Used to split the display name into first and last names
  const [firstName, lastName] = (currentUser.displayName || '').split(' ');
  
  // useState to manage which detail is displayed (Name or Email)
  const [detailToShow, setDetailToShow] = useState('Name'); 

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
                  onClick={() => setDetailToShow('Name')}
                >
                  Name
                </button>
                <button 
                  className="btn join-item py-14" 
                  onClick={() => setDetailToShow('Email')}
                >
                  Email
                </button>
              </div>
              
              {/* Profile Information */}
              <div className="flex-grow">
                {detailToShow === 'Name' && (
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
                {detailToShow === 'Email' && (
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
              </div>

            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
