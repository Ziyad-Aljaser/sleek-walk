import React from "react";
import { Link } from "react-router-dom";

const Shoes = ({ image, title, category, price }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
        <figure>
            <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">
            {title}{" "}
            <div className="badge badge-secondary">NEW</div>
            </h2>
            <p className="text-lg font-medium">{price}</p>
            <div className="card-actions flex flex-col items-end space-y-4">
                <div className="badge badge-outline">{category}</div> 
                <Link to="/shoes-details" className="btn btn-primary">
                    Buy Now
                </Link>
            </div>

      </div>
    </div>
  );
};

export default Shoes;
