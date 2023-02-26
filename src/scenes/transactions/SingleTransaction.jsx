import React from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Box, Button } from '@mui/material';

const SingleTransaction = ({ singleTransaction, setShowTransaction }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="normal"
      flexDirection="column"
      height="80vh"
      marginTop="2rem"
      marginLeft="2rem"
      marginRight="2rem"
      //   overflow={'auto'}
    >
      <Box display="flex" flexDirection="column">
        {/* distributor information header */}
        <Box sx={{ textAlign: 'center' }}>
          <h1 style={{ color: `${colors.blueAccent[500]}` }}>
            Transaction Summary
          </h1>
          <hr />
        </Box>

        {/* 3 distributor info boxes */}
        {/* box 1 */}
        <Box
          sx={{
            textAlign: 'center',
            border: `2px solid ${colors.greenAccent[500]}`,
            backgroundColor: `${colors.greenAccent[500]}`,
            borderRadius: '1rem',
            marginTop: '0.5rem',
          }}
          display="flex"
          flexDirection="column"
        >
          <h2 style={{ color: `${colors.primary[400]}` }}>
            {singleTransaction.transactionTimeline}
          </h2>
        </Box>

        {/* box 2 */}
        <Box
          sx={{
            textAlign: 'center',
            backgroundColor: `${colors.greenAccent[500]}`,
            border: `2px solid ${colors.greenAccent[500]}`,
            borderRadius: '1rem',
            marginTop: '0.5rem',
          }}
        >
          <h2 style={{ color: `${colors.primary[400]}` }}>
            Transaction Total: ${singleTransaction.transactionTotal}
          </h2>
        </Box>

        {/* box 3 */}
        <Box
          sx={{
            textAlign: 'center',
            border: `2px solid ${colors.redAccent[500]}`,
            borderRadius: '1rem',
            marginTop: '0.5rem',
            backgroundColor: `${colors.redAccent[500]}`,
          }}
        >
          <h2 style={{ color: `${colors.primary[400]}` }}>
            Transaction Losses: ${singleTransaction.transactionLosses}
          </h2>
        </Box>

        {/* box 4 */}
        <Box
          sx={{
            textAlign: 'center',
            border: `2px solid ${colors.blueAccent[400]}`,
            borderRadius: '1rem',
            marginTop: '0.5rem',
            backgroundColor: `${colors.blueAccent[400]}`,
          }}
        >
          <h2 style={{ color: `${colors.primary[400]}` }}>
            Transaction Quantity: {singleTransaction.transactionQty} units
          </h2>
        </Box>

        {/* box 5 */}
        <Box
          sx={{
            textAlign: 'center',
            border: `2px solid ${colors.blueAccent[400]}`,
            borderRadius: '1rem',
            marginTop: '0.5rem',
            backgroundColor: `${colors.blueAccent[400]}`,
          }}
        >
          <h2 style={{ color: `${colors.primary[400]}` }}>
            Unique Transaction Items: {singleTransaction.transactedItems.length}{' '}
            items
          </h2>
        </Box>
      </Box>

      {/* invoice items header */}
      <Box marginTop="2rem" sx={{ textAlign: 'center' }}>
        <h1 style={{ color: `${colors.blueAccent[500]}` }}>Transacted Items</h1>
        <hr />
      </Box>

      <div
        className="underline"
        style={{
          width: '100%',
          backgroundColor: 'white',
          height: '2px',
        }}
      ></div>

      {/* invoice items table */}
      <Box>
        {/* top label row of table */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(5, 1fr)"
          sx={{ textAlign: 'center', color: `${colors.greenAccent[200]}` }}
        >
          <h2>Description</h2>
          <h2 style={{ marginLeft: '1.5rem', textAlign: 'center' }}>
            Quantity Sold
          </h2>
          <h2>Cost Basis</h2>
          <h2>Sale Price</h2>
          <h2>Total</h2>
        </Box>

        {/* mapped invoice items onto grid format */}
        {singleTransaction.transactedItems.map((item) => {
          return (
            <Box
              display="grid"
              gridTemplateColumns="repeat(5, 1fr)"
              sx={{
                textAlign: 'center',
                color: `${colors.greenAccent[200]}`,
              }}
              key={item.description}
            >
              <h3
                style={{
                  border: `1px solid ${colors.greenAccent[200]}`,
                  padding: '4px',
                  textAlign: 'center',
                }}
              >
                {item.description}
              </h3>
              <h3
                style={{
                  border: `1px solid ${colors.greenAccent[200]}`,
                  padding: '4px',
                  textAlign: 'center',
                }}
              >
                {item.qtySold} units
              </h3>
              <h3
                style={{
                  border: `1px solid ${colors.greenAccent[200]}`,
                  padding: '4px',
                  textAlign: 'center',
                }}
              >
                ${item.costBasis}
              </h3>
              <h3
                style={{
                  border: `1px solid ${colors.greenAccent[200]}`,
                  padding: '4px',
                  textAlign: 'center',
                }}
              >
                ${item.salePrice}
              </h3>
              <h3
                style={{
                  border: `1px solid ${colors.greenAccent[200]}`,
                  padding: '4px',
                  textAlign: 'center',
                }}
              >
                ${item.saleTotal}
              </h3>
            </Box>
          );
        })}

        {/* go back to all invoices handling */}
        <Box display="flex" justifyContent="center" marginTop="4rem">
          <Button
            variant="contained"
            color="info"
            onClick={() => setShowTransaction(false)}
          >
            View All Transactions
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleTransaction;
