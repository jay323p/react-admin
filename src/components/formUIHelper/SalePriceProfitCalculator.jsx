import React from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Box, Button } from '@mui/material';

const SalePriceProfitCalculator = ({
  singleInventoryItem,
  arrayOfSalePrices,
  setUpdatedSalePrice,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      {/* HEADER */}
      <h1
        style={{
          textAlign: 'center',
          color: `${colors.primary[100]}`,
        }}
      >
        Sale-Price Profit Calculator ||
        <span style={{ color: `${colors.greenAccent[300]}` }}>
          {' '}
          {`WCB = $${singleInventoryItem.weightedCostBasis}`}
        </span>
      </h1>
      {/* SALE PRICE PROFIT CALCULATOR START */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(10, 1fr)"
        marginTop="1rem"
        gap="5px"
      >
        <h4
          style={{
            color: `${colors.primary[100]}`,
            textAlign: 'center',
          }}
        >
          5%
        </h4>
        <h4
          style={{
            color: `${colors.primary[100]}`,
            textAlign: 'center',
          }}
        >
          10%
        </h4>
        <h4
          style={{
            color: `${colors.primary[100]}`,
            textAlign: 'center',
          }}
        >
          15%
        </h4>
        <h4
          style={{
            color: `${colors.primary[100]}`,
            textAlign: 'center',
          }}
        >
          20%
        </h4>
        <h4
          style={{
            color: `${colors.primary[100]}`,
            textAlign: 'center',
          }}
        >
          25%
        </h4>
        <h4
          style={{
            color: `${colors.primary[100]}`,
            textAlign: 'center',
          }}
        >
          30%
        </h4>
        <h4
          style={{
            color: `${colors.primary[100]}`,
            textAlign: 'center',
          }}
        >
          35%
        </h4>
        <h4
          style={{
            color: `${colors.primary[100]}`,
            textAlign: 'center',
          }}
        >
          40%
        </h4>
        <h4
          style={{
            color: `${colors.primary[100]}`,
            textAlign: 'center',
          }}
        >
          45%
        </h4>
        <h4
          style={{
            color: `${colors.primary[100]}`,
            textAlign: 'center',
          }}
        >
          50%
        </h4>
        {arrayOfSalePrices !== undefined &&
          arrayOfSalePrices.map((price, i) => {
            return (
              <Button
                key={i}
                variant="contained"
                color="info"
                sx={{ width: '100%', fontSize: '1rem' }}
                onClick={() => setUpdatedSalePrice(price)}
              >
                <b>${parseFloat(price).toFixed(2)}</b>
              </Button>
            );
          })}
      </Box>
      {/* SALE PRICE PROFIT CALCULATOR END */}
    </Box>
  );
};

export default SalePriceProfitCalculator;
