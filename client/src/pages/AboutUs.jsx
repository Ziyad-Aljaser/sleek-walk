import React, { useRef } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";

import about_img from "../assets/about_img.png";
import goal_img from "../assets/goal_img.png";

export default function AboutUs() {

    // Used to scoll down to the shoes section when the 'Explore Shoes' button is clicked
    // 1. Set up a reference for the target div
    const targetRef = useRef(null);

    // 2. Create the function to smoothly scroll to the target div
    const handleButtonClick = () => {
        if (targetRef.current) {
        // Calculate the top position of the target element
        const targetTop = targetRef.current.getBoundingClientRect().top + window.scrollY;
        // Define an offset
        const offset = 80;
        // Scroll to the target position minus the offset
        window.scrollTo({
            top: targetTop - offset,
            behavior: 'smooth',
        });
        }
    };

    return (
        <Layout>

            {/* About Us Section */}
            <div className="hero py-8 sm:py-14 bg-base-300">
                <div className="hero-content grid md:grid-cols-2 gap-8">
                    <div className="order-2 ml-auto hidden md:block">
                        <img src={about_img} alt="About" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold leading-normal">
                        About Us
                        </h1>
                        <div className="block md:hidden">
                            <img src={about_img} alt="About" className="w-1/2 h-auto mx-auto"/>
                        </div>
                        <p className="py-6 text-xl sm:text-3xl">
                        With us, you can shop online & help save your street at the same
                        time. If you’re looking for great value shoes, then
                        Sleek Walk is the place for you. As you may already know, we
                        aren’t like other online shoes stores
                        </p>
                        <button className="btn btn-primary mt-4" onClick={handleButtonClick}>Our Goal</button>
                    </div>
                </div>
            </div>

            {/* Our Goal Section */}
            <div ref={targetRef} className="hero sm:py-16 bg-base-300">
                <div className="hero-content grid md:grid-cols-2 gap-8">
                    <div className="hidden md:block">
                        <img src={goal_img} alt="Goal" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold leading-normal">
                        Our Goal
                        </h1>
                        <div className="block md:hidden">
                            <img src={goal_img} alt="Goal" className="w-1/2 h-auto mx-auto"/>
                        </div>
                        <p className="py-6 text-xl sm:text-3xl">
                        To revolutionize the online shoe shopping experience by offering exceptional value,
                        a diverse range of styles, and a commitment to preserving the local essence of our streets.
                        At Sleek Walk, we aim to not just be another online store but a movement that champions community,
                        style, and value in every step you take
                        </p>
                        <Link to={"/"} className="btn btn-primary mt-4">
                            Back Home
                        </Link>
                    </div>
                </div>
            </div>

        </Layout>
  );

}