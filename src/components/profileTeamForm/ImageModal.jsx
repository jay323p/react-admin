import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import React from 'react';

const ImageModal = ({ imagePreview, handleModalClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      height="100vh"
      width="100vw"
      backgroundColor={`${colors.primary[500]}`}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '10px',
          borderBottomLeftRadius: '10px',
          boxShadow:
            'rgba(255, 255, 255, 0.3) 0px 19px 38px, rgba(255, 255, 255, 0.22) 0px 15px 12px;',
        }}
      >
        <Box height="28rem" sx={{ aspectRatio: '3/2', objectFit: 'contain' }}>
          <img
            src={imagePreview}
            alt=""
            style={{
              height: 'inherit',
              width: 'auto',
              borderTopLeftRadius: '1rem',
              borderTopRightRadius: '1rem',
              aspectRatio: '3/2',
              objectFit: 'contain',
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="error"
          sx={{ width: '100%' }}
          onClick={handleModalClick}
        >
          EXIT
        </Button>
      </Box>
    </Box>
  );
};

export default ImageModal;
