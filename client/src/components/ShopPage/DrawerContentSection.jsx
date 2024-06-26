// TODO: Divide this component into smaller components

import React from "react";
import Shoes from "../Shoes";
import Pagination from "../Pagination";


const DrawerContentSection = ({
  sortOrder,
  handleSortChange,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  categoryFilter,
  handleButtonClick,
  filteredShoes,
  totalPages,
  productType,
}) => {
  return (
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
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
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
        type={productType}
        sortOrder={sortOrder}
        categoryFilter={categoryFilter}
      />
      
      {/* Pagination Section */}
      {filteredShoes.length > itemsPerPage && (
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleButtonClick={handleButtonClick}
      />
      )}
      
    </div>
  );
};

export default DrawerContentSection;
