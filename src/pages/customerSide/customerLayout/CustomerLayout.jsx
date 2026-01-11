import * as React from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import Appbar from "./Appbar"; 
import Footer from "./Footer";

const CustomerLayout = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        pt: { xs: '56px', sm: '64px' },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <CssBaseline /> 

      {/* 1. Fixed Appbar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.appBar,
          width: '100%',
          boxShadow: 1, 
        }}
      >
        <Appbar />
      </Box>

      {/* 2. Main Content Area */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: '100%',
          maxWidth: '100%', 
          overflowX: 'hidden', 
        }}
      >
        <Stack 
          spacing={3} 
          sx={{ 
            alignItems: "stretch",
            p: { xs: 2, sm: 3, md: 4 },
            width: '100%',
            flex: 1,
          }}
        >
          <Outlet />
        </Stack>
      </Box>

      {/* 3. Footer */}
      <Box
        sx={{
          mt: 'auto', 
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default CustomerLayout;