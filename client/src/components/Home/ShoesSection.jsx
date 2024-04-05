import React from "react";
import Shoes from "../Shoes";
import Pagination from "../Pagination";
import useShoesData from "../../data/useShoesData";

const ShoesSection = ({
  targetRef,
  currentPage,
  setCurrentPage,
  handleButtonClick,
}) => {
  const { shoes } = useShoesData();

  const itemsPerPage = 8;
  const totalPages = Math.ceil(shoes.length / itemsPerPage);
  
  return (
    <div
      ref={targetRef}
      className="bg-base-200"
    >
      <Shoes currentPage={currentPage} itemsPerPage={itemsPerPage} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleButtonClick={handleButtonClick}
      />
      <div className="bg-base-200 py-2"> </div>
    </div>
  );
};

export default ShoesSection;
