import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { SHOES } from '../data/ShoesData'; // Importing SHOES data from Home.jsx

import Layout from "../components/Layout";


export default function ShoeDetails() {
  // Used to find the item
  const { id } = useParams();
  const shoe = SHOES.find(shoe => shoe.id === Number(id));

  // Used for the tab section
  const [activeTab, setActiveTab] = useState("Description");
  const content = {
    Description: "Description Test",
    "Product Details": "Product Details Test",
    "Vendor Info": "Vendor Info Test",
    Reviews: "Reviews Test",
  };

  // Used to check the item
  if (!shoe) {
    return (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error! Shoe not found. <Link to="/" className="link link-primary">Back Home</Link></span>
        </div>
    );
  }

  return (
    <Layout>
      <div className="bg-base-300">

        {/* Breadcrumbs Section */}
        <div className="border-b py-6">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/">Shop</Link>
                </li>
                <li>{ shoe.title }</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col w-full lg:flex-row">

            {/* Image Section */}
            <div className="max-w-md py-14">
                  <img
                    src={shoe.image}
                    className="object-cover rounded-lg"
                    alt={shoe.title}
                  />
            </div>

            {/* Divider */}
            <div className="divider lg:divider-horizontal p-6" />

            {/* Details Section */}
            <div className="grid flex-shrink my-14">
              <div className="flex flex-col space-y-5 lg:pl-4">

                <div className="grid md:grid-cols-2">
                  <h2 className="text-2xl font-bold">
                    {shoe.title} <div className="badge badge-secondary text-xs">New</div>
                  </h2>
                  <div className="rating rating-md md:ml-auto">
                    <input type="radio" name="rating-5" className="mask mask-star-2 bg-purple-500" disabled />
                    <input type="radio" name="rating-5" className="mask mask-star-2 bg-purple-500" disabled />
                    <input type="radio" name="rating-5" className="mask mask-star-2 bg-purple-500" disabled />
                    <input type="radio" name="rating-5" className="mask mask-star-2 bg-purple-500" checked disabled />
                    <input type="radio" name="rating-5" className="mask mask-star-2 bg-purple-500" disabled/>
                  </div>
                </div>

                <h3 className="text-3xl font-semibold">
                  {shoe.price}
                </h3>
                <p>
                  <span>Shoes Type:</span> {shoe.category}
                </p>
                <button type="button" className="btn btn-primary w-[200px]">
                  Add to Cart
                </button>

                {/* Tabs Section */}
                <div>
                  <div className="tabs pt-12">
                    {Object.keys(content).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`tab tab-lg tab-lifted ${
                          activeTab === tab ? "tab-active" : "text-gray-400"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <p>{content[activeTab]}</p>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
}