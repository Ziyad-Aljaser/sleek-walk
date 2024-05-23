// Finished Front End Part

import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MenShop from "./pages/MenShop";
import WomenShop from "./pages/WomenShop";
import KidsShop from  "./pages/KidsShop";
import ShoeDetails from "./pages/ShoeDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

import ScrollToTop from "./components/ScrollToTop";
import { PrivateUserWrapper, PrivateAdminWrapper } from './components/PrivateWrapper';

import { AuthProvider } from './contexts/AuthContext';
import { ShoeProvider } from "./contexts/ShoeContext";


function App() {
  return (
    <>
      <ShoeProvider>
        <ScrollToTop />
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <-- Used to protect the path form users*/}
          <Route path="/admin-dashboard" element={
              <PrivateAdminWrapper>
                <AdminDashboard />
              </PrivateAdminWrapper>
            } />
          {/* <-- Used to protect the path form unlogged users*/}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <-- Used to protect the path form unlogged users*/}
          <Route path="/profile" element={
              <PrivateUserWrapper>
                <Profile />
              </PrivateUserWrapper>
            } />
          <Route path="/men-shop" element={<MenShop />} />
          <Route path="/women-shop" element={<WomenShop />} />
          <Route path="/kids-shop" element={<KidsShop />} />
          <Route path="/shoes-details/:id" element={<ShoeDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        </AuthProvider>
      </ShoeProvider>
    </>
  );
}

export default App;
