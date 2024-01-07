import React from "react";
import Layout from "../components/Layout";
import HeaderSection from "../components/ContactUs/HeaderSection";
import ContactMethodsSection from "../components/ContactUs/ContactMethodsSection";
import ContactFormSection from "../components/ContactUs/ContactFormSection";

export default function ContactUs() {
  return (
    <Layout>
      <div className="hero py-8 bg-base-300">
        <div className="hero-content flex flex-col w-full">
          <HeaderSection />
          <div className="hero-content flex flex-col sm:flex-row justify-between w-full">
            <ContactMethodsSection />
            <ContactFormSection />
          </div>
        </div>
      </div>
    </Layout>
  );
}
