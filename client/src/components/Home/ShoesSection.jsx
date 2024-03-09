import React from "react";
import Shoes from "../Shoes";
import Pagination from "./Pagination";
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
      className="flex items-center flex-col justify-center p-3 bg-base-200"
    >
      <Shoes currentPage={currentPage} itemsPerPage={itemsPerPage} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
};

export default ShoesSection;
