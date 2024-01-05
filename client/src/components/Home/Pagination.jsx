import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage, handleButtonClick }) => {
    return (
      <div className="join flex justify-center shadow-xl mb-5">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`join-item btn text-2xl ${currentPage === index + 1 ? "btn-active" : ""}`}
            onClick={() => {
              setCurrentPage(index + 1);
              handleButtonClick();
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

export default Pagination;
