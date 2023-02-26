import { Box, Button } from '@mui/material';
import React from 'react';

const ViewProfileButtonGroup = ({
  setShowDescription,
  showDescription,
  setAlign,
  align,
  setLineBreaks,
  lineBreaks,
}) => {
  return (
    <Box marginTop="7px" display="flex" alignItems="center" gap="10px">
      <Button
        variant="contained"
        sx={{ width: '4rem', height: '2rem', fontSize: '10px' }}
        color="primary"
        onClick={() => setShowDescription(!showDescription)}
      >
        {showDescription ? 'Hide Descriptions' : 'Show Descriptions'}
      </Button>
      <Button
        variant="contained"
        sx={{ width: '4rem', height: '2rem', fontSize: '10px' }}
        color="primary"
        onClick={() => setAlign(!align)}
      >
        {align ? 'Left-Align' : 'Center-Align'}
      </Button>
      <Button
        variant="contained"
        sx={{ width: '4rem', height: '2rem', fontSize: '10px' }}
        color="primary"
        onClick={() => setLineBreaks(!lineBreaks)}
      >
        {lineBreaks ? 'No Breaks' : 'Line-Breaks'}
      </Button>
    </Box>
  );
};

export default ViewProfileButtonGroup;
