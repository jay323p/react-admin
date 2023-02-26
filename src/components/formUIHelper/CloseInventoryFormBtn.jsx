import React from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CloseInventoryFormBtn = ({ showAllInventory }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <h1 style={{ zIndex: '-1000', color: `${colors.primary[500]}` }}>
        Hidden
      </h1>
      {/* EXIT SINGLE ITEM PAGE BTN */}
      <Button
        variant="contained"
        color="error"
        onClick={() => showAllInventory()}
      >
        <CloseIcon />
      </Button>
    </Box>
  );
};

export default CloseInventoryFormBtn;
