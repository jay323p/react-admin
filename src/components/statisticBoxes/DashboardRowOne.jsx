import React from 'react';
import StatBox from './StatBox';
import PointOfSaleSharpIcon from '@mui/icons-material/PointOfSaleSharp';
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const DashboardRowOne = ({
  qtySold,
  inventoryQty,
  inventoryQtyProgress,
  inventoryQtyPercent,
  inventoryCost,
  revenue,
  revenueInventoryCostProgress,
  revenueInventoryCostPercent,
  inventoryProfit,
  profitRevenueProgress,
  profitRevenuePercent,
  inventoryLosses,
  lossesOverProfitProgress,
  lossesOverProfitPercent,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {qtySold > 0 ? (
          <StatBox
            title={`${qtySold} / ${inventoryQty}`}
            subtitle="Units Sold / Current Inventory Qty"
            progress={inventoryQtyProgress ? inventoryQtyProgress : 0}
            increase={`~${inventoryQtyPercent}%`}
            icon={
              <ReceiptLongSharpIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        ) : (
          <StatBox
            title={`142 / 1312`}
            subtitle="Units Sold / Current Inventory Qty"
            progress={'0.108%'}
            increase={`~10.8%`}
            icon={
              <ReceiptLongSharpIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        )}
      </Box>
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {revenue > 0 ? (
          <StatBox
            title={`$${revenue.toFixed(2)} / $${inventoryCost.toFixed(2)}`}
            subtitle="Revenue / Inventory Cost"
            progress={revenueInventoryCostProgress}
            increase={`~${revenueInventoryCostPercent}%`}
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        ) : (
          <StatBox
            title={`$6153 / $2233`}
            subtitle="Revenue / Inventory Cost"
            progress={'0.363'}
            increase={`~36.3%`}
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        )}
      </Box>
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {inventoryProfit > 0 ? (
          <StatBox
            title={`$${inventoryLosses.toFixed(2)} / $${inventoryProfit.toFixed(
              2
            )}`}
            subtitle="Losses / Profits"
            progress={lossesOverProfitProgress}
            increase={`~${lossesOverProfitPercent}%`}
            icon={
              <TrendingDownIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        ) : (
          <StatBox
            title={`$89 / $3053`}
            subtitle="Losses / Profits"
            progress={'0.029'}
            increase={`~2.9%`}
            icon={
              <TrendingDownIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        )}
      </Box>
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {inventoryProfit > 0 ? (
          <StatBox
            title={`$${inventoryProfit.toFixed(2)} / $${revenue.toFixed(2)}`}
            subtitle="Profit / Revenue"
            progress={profitRevenueProgress}
            increase={`~${profitRevenuePercent}%`}
            icon={
              <PointOfSaleSharpIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        ) : (
          <StatBox
            title={`$3053 / $6153`}
            subtitle="Profit / Revenue"
            progress={0.496}
            increase={`~49.6%`}
            icon={
              <PointOfSaleSharpIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        )}
      </Box>
    </>
  );
};

export default DashboardRowOne;
