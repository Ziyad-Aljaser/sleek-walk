import React from "react";
import { NavLink } from "react-router-dom";

import Layout from "../components/Layout";

export default function Login() {
  
  return (
    <Layout>

        <div className="flex items-center justify-center h-screen bg-base-300 p-5"> {/* Centering container */}
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="text-4xl font-bold text-center mb-6">Login</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered input-primary" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered input-primary" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                    <p>No account yet? <a href="#" className="link link-hover text-blue-500 underline">Sign up</a></p>
                </div>
            </div>
        </div>

    </Layout>
  );
}
