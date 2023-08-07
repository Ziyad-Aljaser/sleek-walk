import React from "react";

import Layout from "../components/Layout";
import Hero from "../components/Hero";


export default function Home() {
  
  return (
    <Layout>
      {/* Hero Section */}
      {/* The padding is smaller when the screen is small */}
      <Hero />

    </Layout>
  );
}
