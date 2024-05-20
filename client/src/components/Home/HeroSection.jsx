import React from "react";
import { Link } from "react-router-dom";
import hero_img from "../../assets/hero_img.png";

const HeroSection = ({ handleButtonClick }) => {
  return (
    // The padding is smaller when the screen is smal
      <div className="hero py-12 sm:py-32 bg-base-300">
        <div className="hero-content grid md:grid-cols-2 gap-8">
          {/* The image for large screen */}
          <div className="order-2 hidden md:block">
            <img src={hero_img} alt="Hero" />
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-normal">
              Welcome to Sleek Walk Online Shoes Store
            </h1>

            {/* The image for small screen */}
            <div className="order-2 block md:hidden">
              <img src={hero_img} alt="Hero" className="w-4/6 h-auto mx-auto" />
            </div>

            <p className="py-6 text-3xl leading-normal">
              Step in Comfort, Stride in Style
            </p>

            <Link to="/about" className="btn btn-primary mt-12 mr-6 text-xl">
              About us
            </Link>

            <button className="btn btn-primary text-xl" onClick={handleButtonClick}>
              Explore Shoes
            </button>
          </div>
        </div>
      </div>
  );
};

export default HeroSection;
