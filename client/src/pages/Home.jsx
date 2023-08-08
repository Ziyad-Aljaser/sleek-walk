import React, { useRef } from 'react';

import Layout from "../components/Layout";
import Shoes from "../components/Shoes";

import hero_img from "../assets/hero_img.png"
import shoes1 from "../assets/shoes1.png"
import shoes2 from "../assets/shoes2.png"
import shoes3 from "../assets/shoes3.png"
import men_casual_shoes1 from "../assets/men_casual_shoes_1.png"
import men_casual_shoes2 from "../assets/men_casual_shoes_2.png"
import men_casual_shoes3 from "../assets/men_casual_shoes_3.png"


export default function Home() {

  // Used to scoll down to the shoes section when the 'Explore Shoes' button is clicked
  // 1. Set up a reference for the target div
  const targetRef = useRef(null);

  // 2. Create the function to smoothly scroll to the target div
  const handleButtonClick = () => {
    if (targetRef.current) {
      // Calculate the top position of the target element
      const targetTop = targetRef.current.getBoundingClientRect().top + window.scrollY;
      // Define an offset, for example, 50px
      const offset = 80;
      // Scroll to the target position minus the offset
      window.scrollTo({
        top: targetTop - offset,
        behavior: 'smooth',
      });
    }
  };

  const SHOES = [
    {
      id: 1,
      image: shoes1,
      title: "Sport Shoes 1",
      category: "Sport",
      price: "$40",
    },
    {
      id: 2,
      image: shoes2,
      title: "Sport Shoes 2",
      category: "Sport",
      price: "$70.99",
    },
    {
      id: 3,
      image: shoes3,
      title: "Sport Shoes 3",
      category: "Sport",
      price: "$58",
    },
    {
      id: 4,
      image: men_casual_shoes1,
      title: "Casual Shoes 1",
      category: "Casual",
      price: "$53",
    },
    {
      id: 5,
      image: men_casual_shoes2,
      title: "Casual Shoes 2",
      category: "Casual",
      price: "$68",
    },
    {
      id: 6,
      image: men_casual_shoes3,
      title: "Casual Shoes 3",
      category: "Casual",
      price: "$98",
    },
  ];

  return (
    <Layout>

      {/* Hero Section */}
      {/* The padding is smaller when the screen is smal */}
      <div className="hero py-16 sm:py-32 bg-base-300">
        <div className="hero-content grid md:grid-cols-2 gap-8">
          <div className="order-2">
            <img src={hero_img} className="" alt="Hero" />
          </div>
          <div>
            <h1 className="text-5xl font-bold leading-normal">
              Welcome to Sleek Walk Online Shoes Store
            </h1>
            <p className="py-6">
              With us, you can shop online & help save your street at the same
              time. If you’re looking for great value shoes, then
              Sleek Walk is the place for you. As you may already know, we
              aren’t like other online shoes stores.
            </p>
            <button className="btn btn-primary mt-4" onClick={handleButtonClick}>Explore Shoes</button>
          </div>
        </div>
      </div>
      
      {/* Shoes Section */}
      <div ref={targetRef} className="flex items-center justify-center bg-base-200">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 p-10">
          {SHOES.map((shoes) => (
            <Shoes
              key={shoes.id}
              image={shoes.image}
              title={shoes.title}
              price={shoes.price}
              category={shoes.category}
            />
          ))}
        </div>
      </div>

    </Layout>
  );
}
