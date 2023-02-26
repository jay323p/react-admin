import React from 'react';
import StatBox from './StatBox';
import PointOfSaleSharpIcon from '@mui/icons-material/PointOfSaleSharp';
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import LineChart from '../LineChart';

const DashboardRowTwo = ({
  revenue,
  initialRevenueLineData,
  revenueLineData,
  recentTransactions,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <Box
          mt="25px"
          p="0 30px"
          display="flex "
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Revenue Generated
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              {revenue > 0 ? `$${parseFloat(revenue.toFixed(3))}` : '$0'}
            </Typography>
          </Box>
          <Box>
            <IconButton>
              <DownloadOutlinedIcon
                sx={{ fontSize: '26px', color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
        </Box>
        {/* WHEN CLOSING SIDEBAR, THIS COMPONENT CAUSES <g> ERROR! UNCOMMENT TO FIX */}
        <Box height="250px" m="-20px 0 0 0">
          {revenue > 0 ? (
            <LineChart
              isDashboard={true}
              xAxisLabel={'Timeline'}
              yAxisLabel={'Revenue $'}
              xAxisRotation={-45}
              data={revenueLineData ? revenueLineData : initialRevenueLineData}
              basic={true}
            />
          ) : (
            <LineChart
              isDashboard={true}
              xAxisLabel={'Timeline'}
              yAxisLabel={'Revenue $'}
              xAxisRotation={-45}
              data={initialRevenueLineData}
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
            Recent Transactions{' '}
            <span
              style={{
                marginLeft: '10px',
                backgroundColor: `${colors.blueAccent[500]}`,
                borderRadius: '5px',
                padding: '2px',
              }}
            >
              {recentTransactions && recentTransactions.length > 0
                ? `${recentTransactions.length} recent transactions found`
                : '0 recent transactions found'}
            </span>
          </Typography>
        </Box>
        {recentTransactions &&
          recentTransactions.length > 0 &&
          recentTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.timelineID}-${i}`}
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
                  {transaction.timelineID}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.transactedBy}
                </Typography>
              </Box>
              <Box>
                <Typography color={colors.blueAccent[400]}>
                  {transaction.qtyTransacted} units transacted
                </Typography>
              </Box>
              <Box>
                <Typography color={colors.redAccent[400]}>
                  ${transaction.transactionLosses} in txn losses
                </Typography>
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                color={colors.primary[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.transactionTotal} revenue
              </Box>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default DashboardRowTwo;
