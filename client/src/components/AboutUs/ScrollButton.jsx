import React from "react";

const ScrollButton = ({ onClick }) => {
  return (
    <button className="btn btn-primary mt-4" onClick={onClick}>
      Our Goal
    </button>
  );
};

export default ScrollButton;
