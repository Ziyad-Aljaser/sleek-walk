import React from "react";
import Shoes from "../Shoes";
import Pagination from "./Pagination";
import { SHOES } from "../../data/ShoesData";

const ShoesSection = ({ targetRef, currentPage, setCurrentPage, handleButtonClick }) => {
    const itemsPerPage = 8;
    const totalPages = Math.ceil(SHOES.length / itemsPerPage);
  
    return (
      <div ref={targetRef} className="flex items-center flex-col justify-center p-3 bg-base-200">
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
