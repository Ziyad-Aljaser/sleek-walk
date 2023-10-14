import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Layout from '../components/Layout';

export default function Signup() {
  const { signIn, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      setSignupSuccess(true);
    } catch {
      setSignupSuccess(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-base-300 p-5">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center mb-6">New Account</h1>

            {error ? (
              <div className="alert alert-error">
                <span>
                  Error! {error}
                </span>
              </div>
            ) : signupSuccess && (
              <div className="alert alert-success">
                <span>Signup successful! Welcome!</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered input-primary"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered input-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered input-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
