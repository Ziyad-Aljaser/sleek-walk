import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';  
import Layout from '../components/Layout';

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

  function handleForm(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault(); 

    if (state.password !== state.passwordConfirm) {
      console.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp(state.email, state.password);
      setError(""); 
      // Optionally, redirect to another page or set a success state
      console.log("Created Account Successfuly!");
      setSignupSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-base-300 p-5">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center mb-6">New Account</h1>

            {/* Used to show the Error/Success notification to the user */}
            {error ? (
              <div className="alert alert-error">
                <span>
                  Error! {error}
                </span>
              </div>
            ) : signupSuccess && (
              <div className="alert alert-success">
                <span>Signup Successful, Welcome!</span>
              </div>
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
                  className="input input-bordered input-primary"
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
                  className="input input-bordered input-primary"
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
                  className="input input-bordered input-primary"
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
                  className="input input-bordered input-primary"
                  onChange={handleForm}
                  required
                />
              </div>

              <div className="form-control mt-8">
                <button type="submit" className="btn btn-primary">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
