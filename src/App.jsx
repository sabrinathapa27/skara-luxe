import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppTheme } from "./themes/AppTheme";
import CustomerLayout from "./pages/customerSide/customerLayout/CustomerLayout";
import Home from "./pages/customerSide/home/Home";
import CustomerLogin from "./pages/customerSide/customerAuth/CustomerLogin";
import CustomerRegister from "./pages/customerSide/customerAuth/CustomerRegister";
import Collections from "./pages/customerSide/products/Collections";
import ProductDetails from "./pages/customerSide/products/ProductDetails";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/customerSide/products/Cart";
import ReturnPolicy from "./components/footer/ReturnPolicy";
import ShippingInfo from "./components/footer/ShippingInfo";
import FAQs from "./components/footer/FAQs";
import { NotificationProvider } from "./context/NotificationContext";

const App = () => {
  return (
    <NotificationProvider>
      <CartProvider>
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
                <Route path="/cart" element={<Cart />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/shipping-info" element={<ShippingInfo />} />
                <Route path="/faqs" element={<FAQs />} />
                {/* Add more routes here */}
                {/* <Route path="products" element={<Products />} /> */}
                {/* <Route path="cart" element={<Cart />} /> */}
              </Route>
            </Routes>
          </AppTheme>
        </BrowserRouter>
      </CartProvider>
    </NotificationProvider>
  );
};

export default App;
