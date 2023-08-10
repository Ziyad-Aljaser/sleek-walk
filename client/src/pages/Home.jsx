import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import Shoes from "../components/Shoes";
import { SHOES } from "../data/ShoesData"; 

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
      // Define an offset
      const offset = 80;
      // Scroll to the target position minus the offset
      window.scrollTo({
        top: targetTop - offset,
        behavior: 'smooth',
      });
    }
  };

  // Used for the pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 
  const totalPages = Math.ceil(SHOES.length / itemsPerPage);  // Calculate total pages

  return (
    <Layout>

      {/* Hero Section */}
      {/* The padding is smaller when the screen is smal */}
      <div className="hero py-16 sm:py-32 bg-base-300">
        <div className="hero-content grid md:grid-cols-2 gap-8">
          <div className="order-2 hidden md:block">
            <img src={hero_img} alt="Hero" />
          </div>
          <div>
            <h1 className="text-5xl font-bold leading-normal">
              Welcome to Sleek Walk Online Shoes Store
            </h1>
            <button className="btn btn-primary mt-24 mr-6" onClick={handleButtonClick}>Explore Shoes</button>
            <Link to="/about" className="btn btn-primary">
              About us
            </Link>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div ref={targetRef} className="flex items-center flex-col justify-center p-3 bg-base-200">

        {/* Shoes Cards Section */}
        <h1 className="text-4xl p-7 font-semibold">Explore Shoes</h1>
        <Shoes currentPage={currentPage} itemsPerPage={itemsPerPage} />

        {/* Pagination Section */}
        <div className="join flex justify-center shadow-xl mb-5">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`join-item btn text-2xl ${currentPage === index + 1 ? 'btn-active' : ''}`}
              onClick={() => {
                setCurrentPage(index + 1);
                handleButtonClick();
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
  
      </div>

    </Layout>
  );
}
