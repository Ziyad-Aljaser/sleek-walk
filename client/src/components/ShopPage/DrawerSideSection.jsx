// TODO: Divide this component into smaller components

import React from "react";
import { Link } from "react-router-dom";

const DrawerSideSection = ({ handleCategoryChange }) => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu py-24 w-80 h-full bg-base-100 text-base-content">
        <li className="border-b-2 py-5 text-4xl">Filters</li>
        <li className="border-b-2 text-lg">
          <details close>
            <summary>Type</summary>
            <ul>
              <li>
                <Link to="/men-shop">Men</Link>
              </li>
              <li>
                <Link to="/women-shop">Women</Link>
              </li>
              <li>
                <Link to="/">Kids</Link>
              </li>
            </ul>
          </details>
        </li>
        <li className="border-b-2 text-lg">
          <details close>
            <summary>Category</summary>
            <ul>
              {["Athletic", "Casual", "Dress"].map((category) => (
                <li key={category}>
                  <label className="label cursor-pointer flex justify-start">
                    <input
                      type="checkbox"
                      value={category}
                      onChange={handleCategoryChange}
                      class="checkbox checkbox-primary checkbox-sm"
                    />
                    <span className="label-text text-lg">{category}</span>
                  </label>
                </li>
              ))}
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
};

export default DrawerSideSection;
