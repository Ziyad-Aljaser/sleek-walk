import React from "react";

import Layout from "../components/Layout";


export default function ContactUs() {

    return (
        <Layout>

            {/* Contact Us Section */}
            <div className="hero py-8 bg-base-300">
                <div className="hero-content flex flex-col w-full">
                    
                    {/* Header Section */}
                    <h1 className="text-3xl mb-5 font-bold leading-normal">
                        Contact Us
                    </h1>

                    {/* Content Section */}
                    <div className="hero-content flex flex-col sm:flex-row justify-between w-full">

                        {/* Cnotact Methods Section */}
                        <div className="mb-4 w-full">
                            
                            {/* Address Section */}
                            <div className="flex flex-row items-start">
                                {/* SVG container */}
                                <div className="mr-6">
                                    <svg
                                        viewBox="0 0 512 512"
                                        fill="currentColor"
                                        height="3em"
                                        width="3em"
                                    >
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={32}
                                            d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
                                        />
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={32}
                                            d="M304 192 A48 48 0 0 1 256 240 A48 48 0 0 1 208 192 A48 48 0 0 1 304 192 z"
                                        />
                                    </svg>
                                </div>

                                {/* Address container */}
                                <div>
                                    <p className="text-xl sm:text-3xl font-bold text-primary">
                                        Address
                                    </p>
                                    <p className="text-lg mb-12">
                                        123 Elm Street
                                        <br />
                                        Mystic Falls, VA 12345
                                        <br />
                                        United States
                                    </p>
                                </div>

                            </div>

                            {/* Phone Section */}
                            <div className="flex flex-row items-start">
                                {/* SVG container */}
                                <div className="mr-6">
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        height="3em"
                                        width="3em"
                                        >
                                        <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122l-2.19.547a1.745 1.745 0 01-1.657-.459L5.482 8.062a1.745 1.745 0 01-.46-1.657l.548-2.19a.678.678 0 00-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 012.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 00.178.643l2.457 2.457a.678.678 0 00.644.178l2.189-.547a1.745 1.745 0 011.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 01-7.01-4.42 18.634 18.634 0 01-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg>
                                </div>

                                {/* Phone container */}
                                <div>
                                    <p className="text-xl sm:text-3xl font-bold text-primary">
                                        Phone
                                    </p>
                                    <p className="text-lg mb-12">
                                        +1 509-892-200-304
                                    </p>
                                </div>
                            </div>

                            {/* Email Section */}
                            <div className="flex flex-row items-start">
                                {/* SVG container */}
                                <div className="mr-6">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    height="3em"
                                    width="3em"
                                    >
                                    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5-8-5h16m0 12H4V8l8 5 8-5v10z" />
                                </svg>
                                </div>

                                {/* Email container */}
                                <div>
                                    <p className="text-xl sm:text-3xl font-bold text-primary">
                                        Email
                                    </p>
                                    <p className="text-lg mb-12">
                                        Sleek_Walk@mail.com
                                    </p>
                                </div>
                            </div>

                        </div>
                        
                        {/* Contact Form Section */}
                        <div className="card w-full max-w-md bg-base-100 shadow-xl mt-4 sm:mt-0">
                            <div className="card-body">

                                {/* <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1> */}

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input type="name" placeholder="full name" className="input input-bordered input-primary" />
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
                                    <textarea placeholder="your message here..." className="input input-bordered input-primary w-full h-32"></textarea>
                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Submit</button>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </Layout>
  );

}