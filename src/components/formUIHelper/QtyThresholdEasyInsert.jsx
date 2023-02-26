import React from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Box, Button } from '@mui/material';

const QtyThresholdEasyInsert = ({ setUpdatedQtyThreshold }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" flexDirection="column">
      <h1
        style={{
          textAlign: 'center',
          color: `${colors.primary[100]}`,
          marginBottom: '2rem',
        }}
      >
        Ez-Insert Qty-Threshold
      </h1>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="10px">
        <Button
          variant="contained"
          color="info"
          sx={{ height: '3rem', fontSize: '1rem', fontWeight: '700' }}
          onClick={() => setUpdatedQtyThreshold(10)}
        >
          10
        </Button>
        <Button
          variant="contained"
          color="info"
          sx={{ height: '3rem', fontSize: '1rem', fontWeight: '700' }}
          onClick={() => setUpdatedQtyThreshold(20)}
        >
          20
        </Button>
        <Button
          variant="contained"
          color="info"
          sx={{ height: '3rem', fontSize: '1rem', fontWeight: '700' }}
          onClick={() => setUpdatedQtyThreshold(30)}
        >
          30
        </Button>
        <Button
          variant="contained"
          color="info"
          sx={{ height: '3rem', fontSize: '1rem', fontWeight: '700' }}
          onClick={() => setUpdatedQtyThreshold(40)}
        >
          40
        </Button>
        <Button
          variant="contained"
          color="info"
          sx={{ height: '3rem', fontSize: '1rem', fontWeight: '700' }}
          onClick={() => setUpdatedQtyThreshold(50)}
        >
          50
        </Button>
        <Button
          variant="contained"
          color="info"
          sx={{ height: '3rem', fontSize: '1rem', fontWeight: '700' }}
          onClick={() => setUpdatedQtyThreshold(60)}
        >
          60
        </Button>
        <Button
          variant="contained"
          color="info"
          sx={{ height: '3rem', fontSize: '1rem', fontWeight: '700' }}
          onClick={() => setUpdatedQtyThreshold(70)}
        >
          70
        </Button>
        <Button
          variant="contained"
          color="info"
          sx={{ height: '3rem', fontSize: '1rem', fontWeight: '700' }}
          onClick={() => setUpdatedQtyThreshold(80)}
        >
          80
        </Button>
        <Button
          variant="contained"
          color="info"
          sx={{ height: '3rem', fontSize: '1rem', fontWeight: '700' }}
          onClick={() => setUpdatedQtyThreshold(90)}
        >
          90
        </Button>
      </Box>
      <Button
        variant="contained"
        color="info"
        sx={{
          height: '3rem',
          marginTop: '10px',
          fontSize: '1rem',
          fontWeight: '700',
        }}
        onClick={() => setUpdatedQtyThreshold(100)}
      >
        100
      </Button>
      {/* QTY-THRESHOLD INSERTER START */}
    </Box>
  );
};

export default QtyThresholdEasyInsert;
