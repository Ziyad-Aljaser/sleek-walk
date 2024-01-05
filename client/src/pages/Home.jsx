import React, { useState } from "react";
import Layout from "../components/Layout";
import HeroSection from "../components/Home/HeroSection";
import ShoesSection from "../components/Home/ShoesSection";
import useSmoothScroll from "../hooks/useSmoothScroll";

export default function Home() {
  const [targetRef, handleButtonClick] = useSmoothScroll(); // Used the custom hook
  const [currentPage, setCurrentPage] = useState(1);


  return (
    <Layout>
      <HeroSection handleButtonClick={handleButtonClick} />
      <ShoesSection
        targetRef={targetRef}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleButtonClick={handleButtonClick}
      />
    </Layout>
  );
}
