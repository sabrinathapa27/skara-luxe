import React from 'react';
import Appbar from './Appbar';
import Footer from './Footer';

const CustomerLayout = ({ children }) => {
  return (
    <div className="customer-layout">
      <Appbar />
      <main className="customer-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
