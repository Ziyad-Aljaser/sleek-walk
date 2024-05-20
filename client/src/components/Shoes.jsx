// TODO - Update the card as a seperate component
// Shoes.jsx
import React from "react";
import { Link } from "react-router-dom";

import useShoesData from "../data/useShoesData";

const Shoes = ({
  currentPage,
  itemsPerPage,
  type,
  sortOrder,
  categoryFilter = [], // providing a default value
}) => {
  const { shoes, isLoading } = useShoesData();
  let filteredShoes = shoes.filter((shoe) => {
    return (
      (!type || shoe.type === type) &&
      (categoryFilter.length === 0 || categoryFilter.includes(shoe.category))
    );
  });

  // Sort shoes based on sortOrder
  if (sortOrder === "asc") {
    filteredShoes = filteredShoes.sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
  } else if (sortOrder === "desc") {
    filteredShoes = filteredShoes.sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const shoesToDisplay = filteredShoes.slice(startIndex, endIndex);
  if (isLoading) {
    // Assume we want to show 8 skeletons, or adjust based on itemsPerPage or another logic
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 p-10">
        {Array.from({ length: itemsPerPage }, (_, index) => (
          <div key={index} className="animate-pulse">
            <div className="skeleton w-full h-64 mb-4"></div> {/* Adjust height as needed */}
            <div className="skeleton w-full h-6 mb-2"></div> {/* Title */}
            <div className="skeleton w-full h-6 mb-2"></div> {/* Category */}
            <div className="skeleton w-1/2 h-6 mb-2"></div> {/* Price */}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 p-10">
      {shoesToDisplay.map((shoe) => (
        <div
          key={shoe._id}
          className="card bg-base-100 shadow-xl transform transition-transform duration-300 hover:scale-105"
        >
          <figure>
            <img src={shoe.image} alt="Shoes" />
          </figure>

          <div className="card-body">
            <h2 className="card-title">
              {shoe.title} <div className="badge badge-secondary">NEW</div>
            </h2>
            <div className="badge badge-outline">{shoe.category}</div>

            {/* Price/Button Section */}
            <div className="card-actions flex items-center justify-between space-y-4">
              <p className="text-3xl font-medium mt-2">${shoe.price}</p>
              <Link
                to={`/shoes-details/${shoe._id}`}
                className="btn btn-primary"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shoes;
