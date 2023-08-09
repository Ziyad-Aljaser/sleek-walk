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
    return <div>Shoe not found!</div>;
  }

  return (
    <Layout>
    
      <div className="bg-base-200">

        {/* Breadcrumbs Section */}
        <div className="border-b py-6">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
            <h1 className="text-xl font-semibold">Shop Single</h1>
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/">Shop</Link>
                </li>
                <li>Shop single</li>
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
            <div className="divider lg:divider-horizontal" />

            {/* Details Section */}
            <div className="grid flex-shrink my-20">
              <div className="flex flex-col space-y-5 lg:pl-4">
                
                <h2 className="text-2xl font-bold">
                  {shoe.title} <div className="badge badge-secondary text-xs">New</div>
                </h2>
                <h3 className="text-xl font-semibold">
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

// <img src={shoe.image} alt={shoe.title} />
// <h2>{shoe.title}</h2>
// <p>{shoe.price}</p>
// <p>{shoe.category}</p>