import React, { useRef, useState } from "react";

import Layout from "../components/Layout";
import Shoes from "../components/Shoes";
import { SHOES } from "../data/ShoesData";

export default function MenShop() {

  // Used to scoll up to the header when any pagination button is clicked
  // 1. Set up a reference for the target div
  const targetRef = useRef(null);

  // 2. Create the function to smoothly scroll to the target div
  const handleButtonClick = () => {
    if (targetRef.current) {
      // Calculate the top position of the target element
      const targetTop =
        targetRef.current.getBoundingClientRect().top + window.scrollY;
      // Define an offset
      const offset = 80;
      // Scroll to the target position minus the offset
      window.scrollTo({
        top: targetTop - offset,
        behavior: "smooth",
      });
    }
  };

  // Used for the pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(SHOES.length / itemsPerPage); // Calculate total pages

  return (
    <Layout>
      {/* Content Section */}
      <div ref={targetRef} className="flex items-center flex-col justify-center p-3 bg-base-200">
        {/* Shoes Cards Section */}
        <h1 className="text-4xl p-7 font-semibold">Men Shoes</h1>
        <Shoes currentPage={currentPage} itemsPerPage={itemsPerPage} type="Men"/>

        {/* Pagination Section */}
        <div className="join flex justify-center shadow-xl mb-5">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`join-item btn text-2xl ${
                currentPage === index + 1 ? "btn-active" : ""
              }`}
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
