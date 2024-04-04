import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const { login } = useAuth();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate(); // Invoke useNavigate

  function handleForm(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();

    setIsLoading(true); // Indicate loading status

    try {
      await login(state.email, state.password);
      setError("");
      console.log("Logged in successfully!");
      setLoginSuccess(true);

      // Here you could mimic the signup approach by introducing a delay before redirecting
      // This could be useful if you have any post-login setup to complete
      setTimeout(() => {
        // Adjust the path as needed or perform other post-login actions
        navigate("/"); // Example redirect after successful login
        setIsLoading(false); // Reset loading status after the delay
      }, 2000); // 2000 ms delay = 2 seconds
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsLoading(false); // Ensure to reset loading state in case of error
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-base-300 p-5">
        <div className="card w-full max-w-md glass shadow-xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center mb-6">Login</h1>

            {error ? (
              <div className="alert alert-error">
                <span>Error! {error}</span>
              </div>
            ) : (
              loginSuccess && (
                <div className="alert alert-success">
                  <span>Login successful! Welcome Back!</span>
                </div>
              )
            )}
            <form onSubmit={handleLogin}>
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
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
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
                    "Login"
                  )}
                </button>
              </div>

              <p className="mt-4">
                No account yet?{" "}
                <Link to="/signup" className="link link-info">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
