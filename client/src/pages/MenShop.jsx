// import React, { useRef, useState } from "react";
// import { Link } from "react-router-dom";

// import Layout from "../components/Layout";
// import Shoes from "../components/Shoes";

// import { SHOES } from "../data/ShoesData";

// export default function MenShop() {
//   // Used to scoll up to the header when any pagination button is clicked
//   // 1. Set up a reference for the target div
//   const targetRef = useRef(null);

//   // 2. Create the function to smoothly scroll to the target div
//   const handleButtonClick = () => {
//     if (targetRef.current) {
//       // Calculate the top position of the target element
//       const targetTop =
//         targetRef.current.getBoundingClientRect().top + window.scrollY;
//       // Define an offset
//       const offset = 80;
//       // Scroll to the target position minus the offset
//       window.scrollTo({
//         top: targetTop - offset,
//         behavior: "smooth",
//       });
//     }
//   };

//   // Used for the sorting
//   const [sortOrder, setSortOrder] = useState("");

//   // Used to handle the sort changes
//   const handleSortChange = (event) => {
//     setSortOrder(event.target.value);
//   };

//   // Used for the filtering
//   const [categoryFilter, setCategoryFilter] = useState([]);

//   // Used for the pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;
//   const filteredShoes = SHOES.filter((shoe) => {
//     return (
//       shoe.type === "Men" &&
//       (categoryFilter.length === 0 || categoryFilter.includes(shoe.category))
//     );
//   });
//   const totalPages = Math.ceil(filteredShoes.length / itemsPerPage);

//   // Used to handle the filter changes
//   const handleCategoryChange = (event) => {
//     const category = event.target.value;
//     if (event.target.checked) {
//       setCategoryFilter((prev) => [...prev, category]);
//     } else {
//       setCategoryFilter((prev) => prev.filter((cat) => cat !== category));
//     }
//     // Reset currentPage to 1 when filter changes
//     setCurrentPage(1);
//   };

//   return (
//     <Layout>
//       {/* Content Section */}
//       <div
//         ref={targetRef}
//         className="flex items-center flex-col justify-center p-3 bg-base-300"
//       >
//         <h1 className="text-4xl p-7 font-semibold">Men Shoes</h1>

//         {/* Drawer Section */}
//         <div className="flex justify-start w-full">
//           <div className="drawer">
//             <input id="my-drawer" type="checkbox" className="drawer-toggle" />
//             <div className="drawer-content">
//               {/* Sort/Filter Container */}
//               <div className="flex flex-row justify-start gap-5">
//                 {/* Sort Section */}
//                 <select
//                   className="select select-primary ml-10"
//                   onChange={handleSortChange}
//                 >
//                   <option disabled selected>
//                     Sort By
//                   </option>
//                   <option value="asc">Price: low to high</option>
//                   <option value="desc">Price: high to low</option>
//                 </select>

//                 {/* Filter Button Section */}
//                 <label
//                   htmlFor="my-drawer"
//                   className="btn btn-primary drawer-button"
//                 >
//                   <svg
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     viewBox="0 0 24 24"
//                     height="1.7em"
//                     width="1.7em"
//                   >
//                     <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
//                   </svg>
//                   Filter
//                 </label>
//               </div>

//               {/* Shoes Cards Section */}
//               <Shoes
//                 currentPage={currentPage}
//                 itemsPerPage={itemsPerPage}
//                 type="Men"
//                 sortOrder={sortOrder}
//                 categoryFilter={categoryFilter}
//               />

//               {/* Pagination Section */}
//               {filteredShoes.length > itemsPerPage && (
//                 <div className="join flex justify-center mb-5">
//                   {[...Array(totalPages)].map((_, index) => (
//                     <button
//                       key={index + 1}
//                       className={`join-item btn text-2xl shadow-xl ${
//                         currentPage === index + 1 ? "btn-active" : ""
//                       }`}
//                       onClick={() => {
//                         setCurrentPage(index + 1);
//                         handleButtonClick();
//                       }}
//                     >
//                       {index + 1}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Drawer Side Section */}
//             <div className="drawer-side">
//               <label htmlFor="my-drawer" className="drawer-overlay"></label>
//               <ul className="menu py-24 w-80 h-full bg-base-100 text-base-content">
//                 <li className="border-b-2 py-5 text-4xl">Filters</li>
//                 <li className="border-b-2 text-lg">
//                   <details close>
//                     <summary>Type</summary>
//                     <ul>
//                       <li>
//                         <Link to="/men-shop">Men</Link>
//                       </li>
//                       <li>
//                         <Link to="/women-shop">Women</Link>
//                       </li>
//                       <li>
//                         <Link to="/">Kids</Link>
//                       </li>
//                     </ul>
//                   </details>
//                 </li>
//                 <li className="border-b-2 text-lg">
//                   <details close>
//                     <summary>Category</summary>
//                     <ul>
//                       {["Athletic", "Casual", "Dress"].map((category) => (
//                         <li key={category}>
//                           <label className="label cursor-pointer flex justify-start">
//                             <input
//                               type="checkbox"
//                               value={category}
//                               onChange={handleCategoryChange}
//                               class="checkbox checkbox-primary checkbox-sm"
//                             />
//                             <span className="label-text text-lg">
//                               {category}
//                             </span>
//                           </label>
//                         </li>
//                       ))}
//                     </ul>
//                   </details>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

import React from "react";
import ShopPage from "./ShopPage";

export default function MenShop () {
  return (
    <ShopPage title="Men Shoes" productType="Men" />
  );
}
