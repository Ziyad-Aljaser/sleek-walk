import React, { useState } from "react";
import { Link } from "react-router-dom";
import useShoesData from "../data/useShoesData";
import Layout from "../components/Layout/Layout";
import useSmoothScroll from "../hooks/useSmoothScroll";
import DrawerSection from "../components/ShopPage/DrawerSection";

const ShopPage = ({ title, productType }) => {
  const { shoes, isLoading, error } = useShoesData();

  const [targetRef, handleButtonClick] = useSmoothScroll(); // Used the custom hook

  // Used for the sorting
  const [sortOrder, setSortOrder] = useState("");

  // Used to handle the sort changes
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Used for the filtering
  const [categoryFilter, setCategoryFilter] = useState([]);

  // Used for the pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredShoes = shoes.filter((shoe) => {
    return (
      shoe.type === productType &&
      (categoryFilter.length === 0 || categoryFilter.includes(shoe.category))
    );
  });
  const totalPages = Math.ceil(filteredShoes.length / itemsPerPage);

  // Used to handle the filter changes
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (event.target.checked) {
      setCategoryFilter((prev) => [...prev, category]);
    } else {
      setCategoryFilter((prev) => prev.filter((cat) => cat !== category));
    }
    // Reset currentPage to 1 when filter changes
    setCurrentPage(1);
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen bg-base-300">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>
          Error loading shoes: {' '} {error} {' '}
          <Link to="/" className="link link-primary">
            Back Home
          </Link>
        </span>
      </div>
    );
  }

  if (filteredShoes.length === 0) {
    return (
      <Layout>
        <div
          ref={targetRef}
          className="flex items-center flex-col justify-center p-3 bg-base-300"
        >
          <h1 className="text-4xl p-7 font-semibold">{title}</h1>
          <div className="text-4xl py-36">
            No shoes available. Please check back later.
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        ref={targetRef}
        className="flex items-center flex-col justify-center p-3 bg-base-300"
      >
        <h1 className="text-4xl p-7 font-semibold">{title}</h1>
        <DrawerSection
          sortOrder={sortOrder}
          handleSortChange={handleSortChange}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          categoryFilter={categoryFilter}
          handleCategoryChange={handleCategoryChange}
          handleButtonClick={handleButtonClick}
          filteredShoes={filteredShoes}
          totalPages={totalPages}
          productType={productType}
        />
      </div>
    </Layout>
  );
};

export default ShopPage;
