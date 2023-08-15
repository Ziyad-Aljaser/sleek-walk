import { Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MenShop from "./pages/MenShop";
import ShoeDetails from "./pages/ShoeDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout"
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";


function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/men-shop" element={<MenShop />} />
        <Route path="/shoes-details/:id" element={<ShoeDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
