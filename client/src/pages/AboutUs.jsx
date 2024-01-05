import React from "react";
import Layout from "../components/Layout";
import AboutSection from "../components/AboutUs/AboutSection";
import GoalSection from "../components/AboutUs/GoalSection";
import useSmoothScroll from "../hooks/useSmoothScroll";

export default function AboutUs() {
  const [targetRef, handleButtonClick] = useSmoothScroll(); // Used the custom hook


  return (
    <Layout>
      <AboutSection handleButtonClick={handleButtonClick} />
      <GoalSection ref={targetRef} />
    </Layout>
  );
}
