import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

export default function Login() {
    const { login } = useAuth();
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

    function handleForm(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    async function handleLogin(e) {
        e.preventDefault();

        try {
            await login(state.email, state.password);
            setError("");
            setLoginSuccess(true);
            console.log("Logged in successfully!");
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
                        <h1 className="text-4xl font-bold text-center mb-6">Login</h1>

                        {error ? (
                            <div className="alert alert-error">
                                <span>
                                    Error! {error}
                                </span>
                            </div>
                        ) : loginSuccess && (
                            <div className="alert alert-success">
                                <span>Login successful! Welcome Back!</span>
                            </div>
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
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>

                            <div className="form-control mt-8">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>

                            <p className="mt-4">
                                No account yet?{" "}
                                <Link to="/signup" className="link link-primary">
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
