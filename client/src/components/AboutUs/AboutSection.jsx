import React from "react";
import ScrollButton from "./ScrollButton";
import about_img from "../../assets/about_img.png";

const AboutSection = ({ targetRef }) => {
  // Create the function to smoothly scroll to the target div
  const handleButtonClick = () => {
    if (targetRef.current) {
      // Calculate the top position of the target element
      const targetTop =
        targetRef.current.getBoundingClientRect().top + window.scrollY;
      // Define an offset
      const offset = 80;
      // Scroll to the target position minus the offset
      window.scrollTo({
        top: targetTop - offset,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="hero py-8 sm:py-14 bg-base-300">
      <div className="hero-content grid md:grid-cols-2 gap-8">
        <div className="order-2 ml-auto hidden md:block">
          <img src={about_img} alt="About" />
        </div>
        <div>
          <h1 className="text-5xl font-bold leading-normal">About Us</h1>
          <div className="block md:hidden">
            <img src={about_img} alt="About" className="w-1/2 h-auto mx-auto" />
          </div>
          <p className="py-6 text-xl sm:text-3xl">
            With us, you can shop online & help save your street at the same
            time. If you’re looking for great value shoes, then Sleek Walk is
            the place for you. As you may already know, we aren’t like other
            online shoes stores
          </p>
          <ScrollButton onClick={() => handleButtonClick(targetRef)} />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
