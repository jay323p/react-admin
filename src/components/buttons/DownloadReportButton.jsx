import React from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

const DownloadReportButton = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: '14px',
          fontWeight: 'bold',
          padding: '10px 20px',
        }}
      >
        <DownloadOutlinedIcon sx={{ mr: '10px' }} />
        Download Reports
      </Button>
    </Box>
  );
};

export default DownloadReportButton;
