import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import Layout from "../components/Layout/Layout";

export default function Signup() {
  const { signUp } = useAuth();
  const [state, setState] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false); // State to manage loading status

  const navigate = useNavigate(); // Invoke useNavigate

  function handleForm(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true); // Indicate loading status

    if (state.password !== state.passwordConfirm) {
      console.error("Passwords do not match");
      setError("Passwords do not match");
      setIsLoading(false); // Reset loading status

      return;
    }

    try {
      await signUp(state.email, state.password, state.fullName);
      setError("");
      console.log("Created Account Successfully!");
      setSignupSuccess(true);
      // Show success message for a few seconds before redirecting
      setTimeout(() => {
        navigate("/"); // Adjust the path as needed
        setIsLoading(false); // Reset loading status
      }, 2000); // 2000 ms delay = 2 seconds
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsLoading(false); // Ensure to reset loading state in case of error as well
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-base-300 p-5">
        <div className="card w-full max-w-md glass shadow-xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center mb-6">New Account</h1>
            {/* Used to show the Error/Success notification to the user */}
            {error ? (
              <div className="alert alert-error">
                <span>Error! {error}</span>
              </div>
            ) : (
              signupSuccess && (
                <div className="alert alert-success">
                  <span>Signup Successful, Welcome!</span>
                </div>
              )
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="input input-bordered input"
                  onChange={handleForm}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered input"
                  onChange={handleForm}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered input"
                  onChange={handleForm}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  className="input input-bordered input"
                  onChange={handleForm}
                  required
                />
              </div>

              <div className="form-control mt-8">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
              <p className="mt-4">
                Already have an account?{" "}
                <Link to="/login" className="link link-info">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
