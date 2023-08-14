import React, { useState } from 'react';

import Layout from "../components/Layout";

export default function Signup() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
      if (step < 3) {
          setStep(step + 1);
      }
  };

  const prevStep = () => {
      if (step > 0) {
          setStep(step - 1);
      }
  };

  return (
    <Layout>
        <div className="flex items-center justify-center h-screen bg-base-300 p-5">
            <div className="flex flex-col items-center">

                {/* Steps Section */}
                <ul className="steps mb-12 z-[0]">
                    <li className={step >= 0 ? "step step-primary" : "step"}>Personal Information</li>
                    <li className={step >= 1 ? "step step-primary" : "step"}>Password</li>
                    <li className={step >= 2 ? "step step-primary" : "step"}>Address</li>
                    <li className={step >= 3 ? "step step-primary" : "step"}>Review & Confirm</li>
                </ul>

                <div className="card bg-base-100 shadow-xl w-full max-w-md">
                    <div className="card-body">
                        <h1 className="text-4xl font-bold text-center mb-6">CheckOut</h1>
                        
                        {/* Address Section */}
                        {step === 0 && (
                            <div>
                                {/* Counrty */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Country</span>
                                    </label>
                                    <select className="select select-bordered select-primary w-full">
                                        <option disabled selected>Select a country</option>
                                        <option value="CAN">Canada</option>
                                        <option value="KSA">Saudi Arabia</option>
                                        <option value="GBR">United Kingdom</option>
                                        <option value="USA">United States</option>
                                    </select>
                                </div>

                                {/* City */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">City</span>
                                    </label>
                                    <input type="text" placeholder="City" className="input input-bordered input-primary" />
                                </div>

                                {/* Street */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Street</span>
                                    </label>
                                    <input type="text" placeholder="Street" className="input input-bordered input-primary" />
                                </div>

                                <div className="form-control mt-8">
                                    <button onClick={nextStep} className="btn btn-primary">Next</button>
                                </div>

                            </div>
                        )}

                        {/* Password Secion */}
                        {step === 1 && (
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered input-primary" />
                                
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" placeholder="confirm password" className="input input-bordered input-primary" />
                            </div>
                        )}
                        
                        {/* Address Section */}
                        {step === 2 && (
                            <div>
                                {/* Counrty */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Country</span>
                                    </label>
                                    <select className="select select-bordered select-primary w-full">
                                        <option disabled selected>Select a country</option>
                                        <option value="CAN">Canada</option>
                                        <option value="KSA">Saudi Arabia</option>
                                        <option value="GBR">United Kingdom</option>
                                        <option value="USA">United States</option>
                                    </select>
                                </div>

                                {/* City */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">City</span>
                                    </label>
                                    <input type="text" placeholder="City" className="input input-bordered input-primary" />
                                </div>

                                {/* Street */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Street</span>
                                    </label>
                                    <input type="text" placeholder="Street" className="input input-bordered input-primary" />
                                </div>
                            </div>
                        )}
                        
                        {/* Review & Confirm */}
                        {step === 3 && (
                            <div>
                                <p className="text-center mb-6">Review your details and confirm</p>

                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input type="fname" placeholder="first name" className="input input-bordered w-full max-w-xs" disabled />

                                <label className="label">
                                    <span className="label-text">last Name</span>
                                </label>
                                <input type="lname" placeholder="last name" className="input input-bordered w-full max-w-xs" disabled />
                                
                                <div className="form-control mt-8">
                                    <button className="btn btn-primary">Sign Up</button>
                                </div>
                            </div>
                        )}

                        {/* Next/Back Section */}
                        {step > 0 && step < 3 && (
                            <div className="form-control mt-6 flex flex-row justify-between">
                                <button onClick={prevStep} className="btn btn-primary w-1/4">Back</button>
                                <button onClick={nextStep} className="btn btn-primary w-1/4">Next</button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>

    </Layout>
  );
}
