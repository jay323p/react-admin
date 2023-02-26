import React from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import LineChart from '../LineChart';

const DashboardRowThree = ({
  reorderList,
  updateFinalQtyToOrder,
  setUpFinalQtyToOrderForm,
  finalQty,
  finalQtyToOrderInitialState,
  qtysToOrder,
  setFinalQtyToOrderInitialState,
  handleQtyToOrderChangeFormSubmit,
  cancelQtyToOrderUpdate,
  initialDemandLineData,
  showLowDemandLineData,
  highDemandLineDataState,
  lowDemandLineDataState,
  setShowLowDemandLineData,
  nearDueDateInvoices,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          colors={colors.grey[100]}
          p="15px"
        >
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Reorder List
            <span
              style={{
                marginLeft: '10px',
                backgroundColor: `${colors.redAccent[500]}`,
                borderRadius: '5px',
                padding: '2px',
              }}
            >
              {reorderList && reorderList.length === 1
                ? `${reorderList.length} item under threshold-qty found`
                : reorderList && reorderList.length !== 1
                ? `${reorderList.length} items under threshold-qty found`
                : '0 items under threshold-qty found'}
            </span>
          </Typography>
        </Box>
        {reorderList &&
          reorderList.length > 0 &&
          reorderList.map((item, i) => (
            <Box
              key={`${item.slug}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              {!updateFinalQtyToOrder ? (
                <>
                  <Box>
                    <Typography
                      color={colors.redAccent[400]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {item.description}
                    </Typography>
                    <Typography color={colors.redAccent[600]}>
                      {item.qtyLeft} units left
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {item.qtyThreshold} unit threshold
                    </Typography>
                  </Box>
                  {/* <Box color={colors.grey[100]}>{item.date}</Box> */}
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    <Typography
                      color={colors.primary[500]}
                      sx={{ textAlign: 'center', fontWeight: 800 }}
                    >
                      Qty To Order
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        setUpFinalQtyToOrderForm(item.slug, item.qtysToOrder)
                      }
                    >
                      {finalQty !== 0 ? finalQty : item.finalQtyToOrder} units
                    </Button>
                  </Box>
                </>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                >
                  <Typography
                    color={colors.greenAccent[500]}
                    sx={{ textAlign: 'center', fontWeight: 800 }}
                  >
                    {finalQtyToOrderInitialState.slug}
                  </Typography>
                  <Box>
                    <Typography sx={{ textAlign: 'center', fontWeight: 800 }}>
                      Easy Input
                    </Typography>
                    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)">
                      {qtysToOrder.length > 0 &&
                        qtysToOrder.map((item) => {
                          return (
                            <Button
                              variant="contained"
                              color="info"
                              key={item}
                              onClick={() =>
                                setFinalQtyToOrderInitialState({
                                  slug: finalQtyToOrderInitialState.slug,
                                  finalQtyToOrder: item,
                                })
                              }
                            >
                              {item}
                            </Button>
                          );
                        })}
                    </Box>

                    <Typography sx={{ textAlign: 'center', fontWeight: 800 }}>
                      Manual Input
                    </Typography>
                    <Box>
                      <form
                        onSubmit={(e) => handleQtyToOrderChangeFormSubmit(e)}
                      >
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Qty To Order"
                          onChange={(e) =>
                            setFinalQtyToOrderInitialState({
                              slug: finalQtyToOrderInitialState.slug,
                              finalQtyToOrder: e.target.value,
                            })
                          }
                          value={finalQtyToOrderInitialState.finalQtyToOrder}
                          name="finalQtyToOrder"
                          sx={{
                            gridColumn: 'span 2',
                            input: {
                              backgroundColor: `${colors.blueAccent[600]}`,

                              borderBottom: '1px solid black',
                            },
                          }}
                        />
                        <Button
                          variant="contained"
                          color="success"
                          type="submit"
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => cancelQtyToOrderUpdate()}
                        >
                          Cancel
                        </Button>
                      </form>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          ))}
      </Box>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        padding="5px"
        overflow="auto"
      >
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: '5px 30px 0 5px', textAlign: 'center' }}
          >
            {showLowDemandLineData ? 'Low Demand Items' : 'High Demand Items'}
          </Typography>
          <Button
            variant="contained"
            color="info"
            onClick={() => setShowLowDemandLineData(!showLowDemandLineData)}
          >
            {showLowDemandLineData ? 'Show High Demand' : 'Show Low Demand'}
          </Button>
        </Box>
        <Box height="250px" mt="-5px">
          {/* calculate salesData per transaction to insert and pass as prop to this component and handle there */}
          {!showLowDemandLineData ? (
            <LineChart
              isDashboard={true}
              xAxisLabel={'Items'}
              yAxisLabel={'Qty Sold'}
              xAxisRotation={-30}
              data={
                highDemandLineDataState && highDemandLineDataState.length > 0
                  ? highDemandLineDataState
                  : initialDemandLineData
              }
              basic={true}
            />
          ) : (
            <LineChart
              isDashboard={true}
              xAxisLabel={'Items'}
              yAxisLabel={'Qty Sold'}
              xAxisRotation={-30}
              data={
                lowDemandLineDataState && highDemandLineDataState.length > 0
                  ? lowDemandLineDataState
                  : initialDemandLineData
              }
              basic={true}
            />
          )}
        </Box>
      </Box>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          colors={colors.grey[100]}
          p="15px"
        >
          <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Near Due Date Invoices
            <span
              style={{
                marginLeft: '10px',
                backgroundColor: `${colors.redAccent[500]}`,
                borderRadius: '5px',
                padding: '2px',
              }}
            >
              {nearDueDateInvoices && nearDueDateInvoices.length > 0
                ? `${nearDueDateInvoices.length} invoices found`
                : '0 invoices found'}
            </span>
          </Typography>
        </Box>
        {nearDueDateInvoices &&
          nearDueDateInvoices.length > 0 &&
          nearDueDateInvoices.map((invoice, i) => (
            <Box
              key={`${invoice.timelineID}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {invoice.companyName} #{invoice.invoiceNumber}
                </Typography>
                <Typography color={colors.blueAccent[400]}>
                  {invoice.phone}
                </Typography>
                <Typography color={colors.blueAccent[400]}>
                  {invoice.email}
                </Typography>
              </Box>
              <Box>
                <Typography color={colors.grey[100]}>
                  Issued: {invoice.dateOfIssue}
                </Typography>
                <Typography color={colors.redAccent[400]}>
                  Due :{invoice.dueDate}
                </Typography>
                <Typography color={colors.redAccent[400]}>
                  Time Left :{invoice.timeLeft}
                </Typography>
              </Box>

              <Box
                backgroundColor={colors.redAccent[500]}
                color={colors.primary[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${invoice.balance}
              </Box>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default DashboardRowThree;
