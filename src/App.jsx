import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppTheme } from "./themes/AppTheme";
import CustomerLayout from "./pages/customerSide/customerLayout/CustomerLayout";
import Home from "./pages/customerSide/home/Home";
import CustomerLogin from "./pages/customerSide/customerAuth/CustomerLogin";
import CustomerRegister from "./pages/customerSide/customerAuth/CustomerRegister";
import Collections from "./pages/customerSide/products/Collections";
import ProductDetails from "./pages/customerSide/products/ProductDetails";

const App = () => {
  return (
    <BrowserRouter>
      <AppTheme>
        <Routes>
          {/* Public routes without layout */}
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/register" element={<CustomerRegister />} />

          {/* Routes with CustomerLayout */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<Home />} />
            <Route path="collections" element={<Collections />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            {/* Add more routes here */}
            {/* <Route path="products" element={<Products />} /> */}
            {/* <Route path="cart" element={<Cart />} /> */}
          </Route>
        </Routes>
      </AppTheme>
    </BrowserRouter>
  );
};

export default App;
