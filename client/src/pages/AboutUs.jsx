import React, { useRef } from "react";
import Layout from "../components/Layout";
import AboutSection from "../components/AboutUs/AboutSection";
import GoalSection from "../components/AboutUs/GoalSection";

export default function AboutUs() {
  const targetRef = useRef(null);

  return (
    <Layout>
      <AboutSection targetRef={targetRef} />
      <GoalSection ref={targetRef} />
    </Layout>
  );
}
