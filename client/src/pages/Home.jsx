import React, { useRef } from 'react';

import Layout from "../components/Layout";
import Shoes from "../components/Shoes";

import hero_img from "../assets/hero_img.png"


export default function Home() {

  // Used to scoll down to the shoes section when the 'Explore Shoes' button is clicked
  // 1. Set up a reference for the target div
  const targetRef = useRef(null);

  // 2. Create the function to smoothly scroll to the target div
  const handleButtonClick = () => {
    if (targetRef.current) {
      // Calculate the top position of the target element
      const targetTop = targetRef.current.getBoundingClientRect().top + window.scrollY;
      // Define an offset, for example, 50px
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

      {/* Hero Section */}
      {/* The padding is smaller when the screen is smal */}
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
            <button className="btn btn-primary mt-4" onClick={handleButtonClick}>Explore Shoes</button>
          </div>
        </div>
      </div>
      
      {/* Shoes Section */}
      <div ref={targetRef} className="flex items-center flex-col justify-center bg-base-200">
        <h1 className="text-4xl p-7 font-semibold">Explore Shoes</h1>
        <Shoes />
      </div>

    </Layout>
  );
}
