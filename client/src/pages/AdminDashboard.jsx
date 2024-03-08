import React from 'react';
import Layout from "../components/Layout/Layout";

export default function AdminDashboard() {
    
const handleLogin = (e) => {
    e.preventDefault();
    console.log("AdminDashboard");
}
const handleForm = (e) => {
    console.log("AdminDashboard submit form");
}


    return (
        <Layout>
            <div className="flex items-center justify-center h-screen bg-base-300 p-5">
                <div className="card w-full max-w-md bg-base-100 shadow-xl -mt-24">
                    <div className="card-body">
                        <h1 className="text-4xl font-bold text-center mb-6">Add New Shoes</h1>

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
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
