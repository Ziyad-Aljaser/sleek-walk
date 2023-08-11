import React from "react";

import Layout from "../components/Layout";


export default function ContactUs() {

    return (
        <Layout>

            {/* Contact Us Section */}
            <div className="hero py-8 sm:py-14 bg-base-300">
                <div className="hero-content grid md:grid-cols-2 gap-8">
                    <div>
                        <h1 className="text-5xl font-bold leading-normal">
                        About Us
                        </h1>
                        <p className="py-6 text-xl sm:text-3xl">
                        With us, you can shop online & help save your street at the same
                        time. If you’re looking for great value shoes, then
                        Sleek Walk is the place for you. As you may already know, we
                        aren’t like other online shoes stores
                        </p>
                    </div>
                    <div className="card w-full max-w-md bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="name" placeholder="text" className="input input-bordered input-primary" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered input-primary" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea type="textarea" placeholder="your message here..." className="input input-bordered input-primary w-full h-40" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
  );

}