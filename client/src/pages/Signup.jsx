import React from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";

export default function Signup() {
  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-base-300 p-5">
        {" "}
        {/* Centering container */}
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center mb-6">New Account</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="name"
                placeholder="full name"
                className="input input-bordered input-primary"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered input-primary"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered input-primary"
              />
            </div>
            <div className="form-control mt-8">
              <button className="btn btn-primary">Create Account</button>
            </div>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
