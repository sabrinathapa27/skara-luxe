import React, { useState } from 'react';
import { Box } from '@mui/material';
import { AppTheme } from './themes/AppTheme';
import CustomerLayout from './pages/customerSide/customerLayout/CustomerLayout';
import Home from './pages/customerSide/home/Home';
import CustomerLogin from './pages/customerSide/customerAuth/CustomerLogin';
import CustomerRegister from './pages/customerSide/customerAuth/CustomerRegister';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <CustomerLayout>
            <Home />
          </CustomerLayout>
        );
      case 'login':
        return <CustomerLogin />;
      case 'register':
        return <CustomerRegister />;
      default:
        return (
          <CustomerLayout>
            <Home />
          </CustomerLayout>
        );
    }
  };

  return (
    <AppTheme>
      <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {renderPage()}
      </Box>
    </AppTheme>
  );
};

export default App;