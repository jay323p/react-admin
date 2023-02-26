import React from 'react';
import { TextField, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import { EclipseLoader } from '../loader/Loader';

const InventoryFormikForm = ({
  singleInventoryItem,
  handleFormSubmit,
  initialValues,
  isNonMobile,
  updatedSalePrice,
  updatedQtyThreshold,
  setConfirmDelete,
  confirmDelete,
  deleteItemFromInventory,
  isLoading,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      width="100%"
      height="100%"
      padding="1rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <h1
        style={{
          marginBottom: '2rem',
          color: `${colors.primary[100]}`,
        }}
      >
        Edit/Delete{' '}
        <span style={{ color: `${colors.greenAccent[300]}` }}>
          {singleInventoryItem.description}
        </span>
      </h1>
      <Formik
        enableReinitialize
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': {
                  gridColumn: isNonMobile ? undefined : 'span 4',
                },
              }}
            >
              {/* DESCRIPTION */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{
                  gridColumn: 'span 2',
                  input: {
                    backgroundColor: `${colors.greenAccent[700]}`,

                    borderBottom: '1px solid black',
                  },
                }}
              />
              {/* QUANTITY */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity (units)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                disabled
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{
                  gridColumn: 'span 2',
                  input: {
                    backgroundColor: `${colors.greenAccent[700]}`,

                    borderBottom: '1px solid black',
                  },
                }}
              />
              {/* COST BASIS */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Cost Basis ($)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.costBasis}
                name="costBasis"
                error={!!touched.costBasis && !!errors.costBasis}
                helperText={touched.costBasis && errors.costBasis}
                sx={{
                  gridColumn: 'span 4',
                  input: {
                    backgroundColor: `${colors.greenAccent[700]}`,

                    borderBottom: '1px solid black',
                  },
                }}
              />
              {/* COST BASIS HISTORY */}

              {/* SALE PRICE */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Sale Price ($)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={
                  updatedSalePrice > 0 ? updatedSalePrice : values.salePrice
                }
                name="salePrice"
                error={!!touched.salePrice && !!errors.salePrice}
                helperText={touched.salePrice && errors.salePrice}
                sx={{
                  gridColumn: 'span 4',
                  input: {
                    backgroundColor: `${colors.greenAccent[700]}`,

                    borderBottom: '1px solid black',
                  },
                }}
              />
              {/* QTY THRESHOLD */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Qty Threshold for Reorder (units)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={
                  updatedQtyThreshold > 0
                    ? updatedQtyThreshold
                    : values.qtyThreshold
                }
                name="qtyThreshold"
                error={!!touched.qtyThreshold && !!errors.qtyThreshold}
                helperText={touched.qtyThreshold && errors.qtyThreshold}
                sx={{
                  gridColumn: 'span 4',
                  input: {
                    backgroundColor: `${colors.greenAccent[700]}`,

                    borderBottom: '1px solid black',
                  },
                }}
              />
            </Box>

            {/* SUBMIT BUTTON */}
            <Box display="flex" justifyContent="end" mt="20px">
              {isLoading ? (
                <Button
                  type="submit"
                  style={{
                    backgroundColor: `${colors.blueAccent[400]}`,
                    width: '100%',
                    boxShadow: `${'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'}`,
                  }}
                  variant="contained"
                  disabled
                >
                  <EclipseLoader />
                </Button>
              ) : (
                <Button
                  type="submit"
                  style={{
                    backgroundColor: `${colors.blueAccent[400]}`,
                    width: '100%',
                    boxShadow: `${'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'}`,
                  }}
                  variant="contained"
                >
                  Update Item
                </Button>
              )}
            </Box>
          </form>
        )}
      </Formik>
      <Box marginTop="1rem" display="flex" gap="1rem">
        <Button
          variant="contained"
          color="warning"
          sx={{ width: '100%' }}
          onClick={() => setConfirmDelete(!confirmDelete)}
        >
          {confirmDelete ? 'Cancel' : 'Delete'}
        </Button>
        {confirmDelete ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteItemFromInventory(singleInventoryItem.slug)}
          >
            Delete
          </Button>
        ) : (
          ''
        )}
        {/* FORM END */}
      </Box>
    </Box>
  );
};

export default InventoryFormikForm;
