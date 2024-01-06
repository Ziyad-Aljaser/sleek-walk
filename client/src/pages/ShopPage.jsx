import React, { useState } from "react";
import { SHOES } from "../data/ShoesData";
import Layout from "../components/Layout";
import useSmoothScroll from "../hooks/useSmoothScroll";
import DrawerSection from "../components/ShopPage/DrawerSection";

const ShopPage = ({ title, productType }) => {

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
  const filteredShoes = SHOES.filter((shoe) => {
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

  return (
    <Layout>
      <div ref={targetRef} className="flex items-center flex-col justify-center p-3 bg-base-300">
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
