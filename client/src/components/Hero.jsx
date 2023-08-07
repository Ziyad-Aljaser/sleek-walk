import React from "react";
import { Link } from "react-router-dom";

import hero_img from "../assets/hero_img.png"


const Hero = () => {

    return (
        // The padding is smaller when the screen is smal
        <div className="hero py-16 sm:py-32 bg-base-300">
            <div className="hero-content grid md:grid-cols-2 gap-8">
                <div className="order-2">
                    <img src={hero_img} className="" alt="Hero" />
                </div>
                <div>
                    <h1 className="text-5xl font-bold leading-normal">
                        Welcome to Sleek Walk Online Shoes Store
                    </h1>
                    <p className="py-6">
                        With us, you can shop online & help save your street at the same
                        time. If you’re looking for great value shoes, then
                        Sleek Walk is the place for you. As you may already know, we
                        aren’t like other online shoes stores.
                    </p>
                    <button className="btn btn-primary mt-4">Explore Shoes</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
