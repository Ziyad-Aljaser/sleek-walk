import React, { createContext, useState, useContext } from "react";

const ShoeContext = createContext();

export const ShoeProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [filteredShoes, setFilteredShoes] = useState([]);

  return (
    <ShoeContext.Provider
      value={{ query, setQuery, filteredShoes, setFilteredShoes }}
    >
      {children}
    </ShoeContext.Provider>
  );
};

export const useShoeContext = () => {
  return useContext(ShoeContext);
};
