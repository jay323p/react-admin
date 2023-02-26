import React from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Box, Button } from '@mui/material';

const SingleInvoice = ({
  singleInvoice,
  getInvoiceQuantity,
  getInvoiceTotal,
  handleInvoiceBalanceUpdate,
  updatedBalance,
  setUpdatedBalance,
  setShowInvoice,
  setConfirmDelete,
  confirmDelete,
  deleteSpecificInvoice,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="normal"
      flexDirection="column"
      height="90vh"
      paddingTop="6rem"
      marginLeft="2rem"
      marginRight="2rem"
      marginBottom="2rem"
      overflow={'auto'}
    >
      <Box display="flex" flexDirection="column">
        {/* distributor information header */}
        <Box sx={{ textAlign: 'center' }}>
          <h1 style={{ color: `${colors.blueAccent[500]}` }}>
            Distributor Information
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
            {singleInvoice.distributorInfo.companyName}
          </h2>
          <h3 style={{ color: `${colors.primary[400]}` }}>
            {singleInvoice.distributorInfo.streetAddress}
          </h3>
          <h3 style={{ color: `${colors.primary[400]}` }}>
            {singleInvoice.distributorInfo.cityState}
          </h3>
          <h3 style={{ color: `${colors.primary[400]}` }}>
            {singleInvoice.distributorInfo.zipCode}
          </h3>
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
          <h3 style={{ color: `${colors.primary[400]}` }}>Contact</h3>
          <h4 style={{ color: `${colors.primary[400]}` }}>
            {singleInvoice.distributorInfo.phone}
          </h4>
          <h4 style={{ color: `${colors.primary[400]}` }}>
            {singleInvoice.distributorInfo.email}
          </h4>
        </Box>

        {/* box 3 */}
        <Box
          sx={{
            textAlign: 'center',
            border: `2px solid ${colors.greenAccent[500]}`,
            borderRadius: '1rem',
            marginTop: '0.5rem',
            backgroundColor: `${colors.greenAccent[500]}`,
          }}
        >
          <h4 style={{ color: `${colors.primary[400]}` }}>Description</h4>
          <h5 style={{ color: `${colors.primary[400]}` }}>
            #: {singleInvoice.distributorInfo.invoiceNumber}
          </h5>
          <h5 style={{ color: `${colors.primary[400]}` }}>
            Issued: {singleInvoice.distributorInfo.dateOfIssue}
          </h5>
          <h5 style={{ color: `${colors.primary[400]}` }}>
            Due: {singleInvoice.distributorInfo.dueDate}
          </h5>
        </Box>
      </Box>

      {/* invoice items header */}
      <Box marginTop="2rem" sx={{ textAlign: 'center' }}>
        <h1 style={{ color: `${colors.blueAccent[500]}` }}>Invoice Items</h1>
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
          gridTemplateColumns="repeat(4, 1fr)"
          sx={{ textAlign: 'center', color: `${colors.greenAccent[500]}` }}
        >
          <h2>Description</h2>
          <h2 style={{ marginLeft: '1.5rem', textAlign: 'center' }}>
            Quantity
          </h2>
          <h2>Unit Price</h2>
          <h2>Total</h2>
        </Box>

        {/* mapped invoice items onto grid format */}
        {singleInvoice.invoiceItems.map((item) => {
          return (
            <Box
              display="grid"
              gridTemplateColumns="repeat(4, 1fr)"
              sx={{ textAlign: 'center' }}
            >
              <h3>{item.description}</h3>
              <h3 style={{ marginLeft: '1.5rem', textAlign: 'center' }}>
                {item.quantity} units
              </h3>
              <h3>${item.unitPrice.toFixed(2)}</h3>
              <h3>${item.total.toFixed(2)}</h3>
            </Box>
          );
        })}

        {/* invoice information */}
        <Box
          marginTop="4rem"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          {/* invoice total qty */}
          <h2 style={{ color: `${colors.blueAccent[500]}` }}>
            Invoice Quantity: {getInvoiceQuantity(singleInvoice.invoiceItems)}
          </h2>
          {/* invoice total $ */}
          <h2 style={{ color: `${colors.blueAccent[500]}` }}>
            Invoice Total: {getInvoiceTotal(singleInvoice.invoiceItems)}
          </h2>
          {/* invoice balance remaining $ */}
          <h2
            style={{
              color:
                singleInvoice.balance === 0
                  ? `${colors.greenAccent[600]}`
                  : `${colors.redAccent[600]}`,
            }}
          >
            Balance Remaining: ${singleInvoice.balance}
          </h2>
          {/* update balance form ------------ START */}
          <form
            onSubmit={(e) =>
              handleInvoiceBalanceUpdate(e, updatedBalance, singleInvoice._id)
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '4rem',
            }}
          >
            {/* input label */}
            <label
              style={{
                fontSize: '20.5px',
                fontWeight: '900',
                color: `${colors.greenAccent[700]}`,
                marginRight: '0.8rem',
              }}
            >
              New balance
            </label>
            {/* $ label next to input */}
            <label
              style={{
                backgroundColor: `${colors.greenAccent[700]}`,
                height: '25px',
                width: '25px',
                fontSize: '20px',
                padding: 'auto',
                textAlign: 'center',
                boxSizing: 'border-box',
                lineHeight: '1.2',
                borderTopLeftRadius: '25px',
                borderBottomLeftRadius: '25px',
              }}
            >
              $
            </label>
            {/* form input for balance update */}
            <input
              type="number"
              name="updatedBalance"
              value={updatedBalance}
              onChange={(e) => setUpdatedBalance(e.target.value)}
              style={{
                height: '25px',
                marginRight: '0.8rem',
                borderTopRightRadius: '25px',
                borderBottomRightRadius: '25px',
                border: '1px solid black',
                textAlign: 'center',
              }}
            />

            {/* submit btn */}
            <button
              type="submit"
              style={{
                height: '25px',
                width: '4rem',
                backgroundColor: `${colors.greenAccent[700]}`,
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
          </form>
        </Box>
        {/* update balance form ------------ END */}

        {/* go back to all invoices handling */}
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="info"
            onClick={() => setShowInvoice(false)}
          >
            View All Invoices
          </Button>
        </Box>
      </Box>

      {/* delete invoice handling */}
      <Box display="flex" justifyContent="center" marginTop="2rem" width="100%">
        {/* initial delete request btn/ cancel delete btn  */}
        <Button
          variant="contained"
          color="warning"
          sx={{ width: confirmDelete ? '50%' : '100%', height: '2rem' }}
          onClick={() => setConfirmDelete(!confirmDelete)}
        >
          {confirmDelete ? 'Cancel Deletion' : 'Delete Invoice'}
        </Button>

        {/* true confirm delete btn */}
        {confirmDelete ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteSpecificInvoice(singleInvoice._id)}
            sx={{ height: '2rem', width: '50%' }}
          >
            Confirm Deletion
          </Button>
        ) : (
          ''
        )}
      </Box>
      {/* SINGLE INVOICE PAGE ------------------------------------------- END */}
    </Box>
  );
};

export default SingleInvoice;
