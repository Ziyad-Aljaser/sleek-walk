import React, { useCallback, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { db } from "../../config/firebase";

import { useShoeContext } from "../../contexts/ShoeContext";
import { useAuth } from "../../contexts/AuthContext";

import { SHOES } from "../../data/ShoesData";

import useItemCount from "../../hooks/useItemCount";
import useSubtotal from "../../hooks/useSubtotal";
import { getUserRole } from "../../utils/FirestoreUtils";

import logo from "../../assets/sleek_walk_logo.png";

const Navbar = () => {
  // Test
  const handleButtonClick = () => {
    console.log("Cart Button Clicked!");
  };

  // Used for the light/dark mode
  // use theme from local storage if available or set light theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // Used for the search field
  const { query, setQuery, filteredShoes, setFilteredShoes } = useShoeContext();

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery) {
      const results = SHOES.filter((shoe) =>
        shoe.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredShoes(results);
    } else {
      setFilteredShoes([]);
    }
  };

  // Used to reset the search input value
  const location = useLocation();

  const resetSearch = useCallback(() => {
    setQuery("");
    setFilteredShoes([]);
  }, [setQuery, setFilteredShoes]);

  useEffect(() => {
    // Simply reset the search whenever the location pathname changes
    resetSearch();
  }, [location.pathname, resetSearch]);

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  // Used for user authentication
  const { currentUser, logout } = useAuth();

  // Used to handle the logout
  const handleLogout = async () => {
    try {
      await logout();
      // Optionally, redirect user to homepage or show a notification
      console.log("Successfully Logged Out!");
    } catch (error) {
      console.error("Failed to logout: ", error);
    }
  };

  // --------------- Used to display the items count/subtotal ---------------
  // const userId = "UserID";
  const userId = currentUser?.uid;
  const itemCount = useItemCount(userId, db);
  const subtotal = useSubtotal(userId, db);

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const userId = currentUser?.uid;
      try {
        const role = await getUserRole(userId, db);
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching user role: ", error);
      }
    };

    fetchUserRole();
  }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount
  console.log("User Role: ", userRole);

  return (
    <div className="sticky top-0 z-[1] bg-base-200 py-2">
      <div className="max-w-7xl mx-auto navbar">
        {/* Small Screen Menu-Logo Section */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Men</Link>
              </li>
              <li>
                <Link to="/">Women</Link>
              </li>
              <li>
                <Link to="/">Kids</Link>
              </li>

              <div className="divider"></div>

              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>

              <li>
                <div className="form-control mt-3">
                  <input
                    type="text"
                    placeholder="Search shoes..."
                    className="input input-bordered input-primary w-full"
                  />
                </div>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-2xl">
            <div className="w-10 rounded-full">
              <img src={logo} alt="Logo" />
            </div>
            Sleek Walk
          </Link>
        </div>

        {/* Menu Section */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li class="text-xl">
              <Link to="/men-shop">Men</Link>
            </li>
            <li class="text-xl">
              <Link to="/women-shop">Women</Link>
            </li>
            <li class="text-xl">
              <Link to="/">Kids</Link>
            </li>
          </ul>
        </div>

        {/* Search-Cart-User Section */}
        <div className="navbar-end hidden lg:flex ">
          {/* Search */}
          <div className="form-control p-2 ">
            <input
              type="text"
              placeholder="Search Shoes..."
              className="input input-bordered input-primary w-full"
              value={query}
              onChange={handleSearch}
            />
            {/* Display Search Results */}
            {query && (
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-1/6 absolute top-full"
              >
                {filteredShoes.length > 0 ? (
                  filteredShoes.slice(0, 3).map((shoe) => (
                    <li key={shoe.id} className="my-2">
                      <Link
                        to={`/shoes-details/${shoe.id}`}
                        onClick={resetSearch}
                      >
                        <img
                          src={shoe.image}
                          alt={shoe.title}
                          width="60"
                          className="rounded-lg"
                        />
                        <h3>{shoe.title}</h3>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="my-2 text-center">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* Cart */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {itemCount}
                </span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">{itemCount} Items</span>
                <span className="text-info">
                  Subtotal: ${subtotal.toFixed(2)}
                </span>
                <div className="card-actions">
                  <Link
                    to="/cart"
                    className="btn btn-primary btn-block"
                    onClick={handleButtonClick}
                  >
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* User */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <path d="M16 7 A4 4 0 0 1 12 11 A4 4 0 0 1 8 7 A4 4 0 0 1 16 7 z" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 top-[125%]"
            >
              {currentUser ? ( // Conditional rendering based on currentUser
                <>
                  <li className="menu-title">
                    <span className="text-purple-500">
                      Welcome, {currentUser.displayName}!
                    </span>
                  </li>
                  {userRole === "Admin" ? (
                    <>
                      <li className="mt-2">
                        <Link to="/admin-dashboard">Admin Dashboard</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="mt-2">
                        <Link to="/profile">Profile</Link>
                      </li>
                    </>
                  )}

                  <div className="divider -mt-0.5"></div>
                  {/* - before mt is for forcing the button to go up */}
                  <li className="-mt-5">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Light/Dark Mode Section */}
        <div className="flex justify-end flex-1 px-2">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                onChange={handleToggle}
                // show toggle image based on localstorage theme
                checked={theme === "light" ? false : true}
              />
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />

              {/* sun icon */}
              <svg
                className="swap-on fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off fill-current w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
