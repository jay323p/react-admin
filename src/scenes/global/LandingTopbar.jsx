import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, useTheme } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { tokens } from '../../theme';

const LandingTopbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="row-reverse"
      justifyContent="space-between"
      gap="5px"
      padding="5px"
      sx={{ backgroundImage: 'linear-gradient(to right, #8e2de2, #4a00e0)' }}
    >
      <Box display="flex" gap="5px">
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="info"
          onClick={() => navigate('/register')}
        >
          Register
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="7px"
        sx={{ cursor: 'pointer' }}
      >
        <PictureAsPdfIcon
          sx={{ color: colors.primary[500] }}
          onClick={() => navigate('/landing')}
        />
        <h2
          style={{ color: colors.primary[500] }}
          onClick={() => navigate('/landing')}
        >
          PDF Based Inventory-Management System
        </h2>
      </Box>
    </Box>
  );
};

export default LandingTopbar;
