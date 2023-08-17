import React, { useRef, useState } from "react";

import Layout from "../components/Layout";
import Shoes from "../components/Shoes";
import { SHOES } from "../data/ShoesData";

export default function WomenShop() {
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
  const filteredShoes = SHOES.filter((shoe) => shoe.type === "Women");
  const totalPages = Math.ceil(filteredShoes.length / itemsPerPage); // Calculate total pages based on filtered shoes

  // Used for the sorting
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <Layout>
      {/* Content Section */}
      <div
        ref={targetRef}
        className="flex items-center flex-col justify-center p-3 bg-base-300"
      >
        <h1 className="text-4xl p-7 font-semibold">Women Shoes</h1>

        {/* Drawer Section */}
        <div className="flex justify-start w-full">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Sort/Filter Container */}
              <div className="flex flex-row justify-start gap-5">
                {/* Sort Section */}
                <select
                  className="select select-primary ml-10"
                  onChange={handleSortChange}
                >
                  <option disabled selected>
                    Sort By
                  </option>
                  <option value="asc">Price: low to high</option>
                  <option value="desc">Price: high to low</option>
                </select>

                {/* Filter Button Section */}
                <label
                  htmlFor="my-drawer"
                  className="btn btn-primary drawer-button"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    height="1.7em"
                    width="1.7em"
                  >
                    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                  </svg>
                  Filter
                </label>
              </div>

              {/* Shoes Cards Section */}
              <Shoes
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                type="Women"
                sortOrder={sortOrder}
              />

              {/* Pagination Section */}
              {filteredShoes.length > itemsPerPage && (
                <div className="join flex justify-center mb-5">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`join-item btn text-2xl shadow-xl ${
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
              )}
            </div>

            {/* Drawer Side Section */}
            <div className="drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu py-24 w-80 h-full bg-base-100 text-base-content">
                <li className="border-b-2 py-5 text-4xl">Filters</li>
                <li className="border-b-2 text-lg">
                  <details close>
                    <summary>Type</summary>
                    <ul>
                      <li>
                        <a>Men</a>
                      </li>
                      <li>
                        <a>Women</a>
                      </li>
                      <li>
                        <a>Kids</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li className="border-b-2 text-lg">
                  <details close>
                    <summary>Category</summary>
                    <ul>
                      <li>
                        <label class="label cursor-pointer flex justify-start">
                          <input
                            type="checkbox"
                            class="checkbox checkbox-primary checkbox-sm"
                          />
                          <span class="label-text text-lg">Athletic</span>
                        </label>
                      </li>
                      <li>
                        <label class="label cursor-pointer flex justify-start">
                          <input
                            type="checkbox"
                            class="checkbox checkbox-primary checkbox-sm"
                          />
                          <span class="label-text text-lg">Casual</span>
                        </label>
                      </li>
                      <li>
                        <label class="label cursor-pointer flex justify-start">
                          <input
                            type="checkbox"
                            class="checkbox checkbox-primary checkbox-sm"
                          />
                          <span class="label-text text-lg">Dress</span>
                        </label>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
