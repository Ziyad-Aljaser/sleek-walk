// Shoes.jsx
import React from "react";
import { Link } from "react-router-dom";

import { SHOES } from "../data/ShoesData"; 

const Shoes = ({ currentPage, itemsPerPage, type }) => {

  const filteredShoes = SHOES.filter(shoe => shoe.type === type);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const shoesToDisplay = filteredShoes.slice(startIndex, endIndex);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 p-10">

      {shoesToDisplay.map(shoe => (
        <div key={shoe.id} className="card bg-base-100 shadow-xl transform transition-transform duration-300 hover:scale-105">

        <figure>
          <img src={shoe.image} alt="Shoes" />
        </figure>

        <div className="card-body">

          <h2 className="card-title">
            {shoe.title}{" "}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <div className="badge badge-outline">
            {shoe.category}
          </div> 

          {/* Price/Button Section */}
          <div className="card-actions flex items-center justify-between space-y-4">
            <p className="text-3xl font-medium mt-2">{shoe.price}</p>
            <Link to={`/shoes-details/${shoe.id}`} className="btn btn-primary">
              Buy Now
            </Link>
          </div>

        </div>

      </div>
      ))}
      
    </div>
  );
}

export default Shoes;
