import { Box } from '@mui/material';

export const columns = [
  {
    field: 'slug',
    headerName: 'Slug',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { description, salePrice } }) => {
      return (
        <Box
          sx={{
            fontSize: '0.9rem',
            color: salePrice === 0 ? '#FDDA16' : 'inherit',
          }}
        >
          {description}
        </Box>
      );
    },
  },
  {
    field: 'quantity',
    headerName: 'Quantity In Stock',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { quantity, qtyThreshold } }) => {
      return (
        <Box
          sx={{
            color: quantity < qtyThreshold ? `#EE4B2B` : `#47BFA0`,
          }}
        >
          {quantity} units {quantity < qtyThreshold ? '[**LOW**]' : ''}
        </Box>
      );
    },
    cellClassName: 'name-column--cell',
  },
  {
    field: 'costBasis',
    headerName: 'Recent Cost Basis',
    renderCell: ({ row: { costBasis } }) => {
      return <Box>${parseFloat(costBasis).toFixed(2)}</Box>;
    },
    flex: 0.5,
    type: 'number',
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'costBasisHistory',
    headerName: 'Cost Basis History',
    type: 'number',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'weightedCostBasis',
    headerName: 'Weighted Cost Basis',
    renderCell: ({ row: { weightedCostBasis } }) => {
      return <Box>${parseFloat(weightedCostBasis).toFixed(3)}</Box>;
    },
    flex: 0.5,
    type: 'number',
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'salePrice',
    headerName: 'Sale Price',
    renderCell: ({ row: { salePrice } }) => {
      return (
        <Box sx={{ color: salePrice === 0 ? '#FDDA16' : 'inherit' }}>
          ${salePrice.toFixed(2)}
        </Box>
      );
    },
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'profitPercentage',
    headerName: '% Profit',
    renderCell: ({ row: { profitPercentage } }) => {
      return (
        <Box
          sx={{
            color: profitPercentage === 0 ? '#FDDA16' : '#47BFA0',
          }}
        >
          {profitPercentage}%
        </Box>
      );
    },
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'qtyThreshold',
    headerName: 'Qty Threshold',
    renderCell: ({ row: { qtyThreshold } }) => {
      return (
        <Box
          sx={{
            color: qtyThreshold === 0 ? '#FDDA16' : '#EE4B2B',
          }}
        >
          @ {qtyThreshold} units left
        </Box>
      );
    },
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
  },
];

export const costBasisHistoryColumns = [
  {
    field: 'costBasis',
    headerName: 'Cost Basis',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { costBasis } }) => {
      return <Box>${parseFloat(costBasis).toFixed(3)}</Box>;
    },
  },
  {
    field: 'qtyBought',
    headerName: 'Qty Bought',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { qtyBought } }) => {
      return <Box>{qtyBought} units</Box>;
    },
  },
  {
    field: 'qtyLeft',
    headerName: 'Qty Left',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { qtyLeft } }) => {
      return <Box>{`${qtyLeft} units`}</Box>;
    },
  },
  {
    field: 'relativeStockTotal',
    headerName: 'Remaining Inventory Cost',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { relativeStockTotal } }) => {
      return <Box>${parseFloat(relativeStockTotal).toFixed(2)}</Box>;
    },
  },
  {
    field: 'updatedDate',
    headerName: 'Date Updated',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { updatedDate } }) => {
      return <Box sx={{}}>{updatedDate}</Box>;
    },
  },
  {
    field: 'updatedTime',
    headerName: 'Time Updated',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { updatedTime } }) => {
      return <Box sx={{}}>{updatedTime}</Box>;
    },
  },
];

export const saleColumns = [
  {
    field: 'slug',
    headerName: 'Slug',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { description, salePrice } }) => {
      return (
        <Box
          sx={{
            fontSize: '0.9rem',
            color: salePrice === 0 ? '#FDDA16' : 'inherit',
          }}
        >
          {description}
        </Box>
      );
    },
  },
  {
    field: 'quantity',
    headerName: 'Quantity In Stock',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { quantity, qtyThreshold } }) => {
      return (
        <Box
          sx={{
            color: quantity < qtyThreshold ? `#EE4B2B` : `#47BFA0`,
          }}
        >
          {quantity} units {quantity < qtyThreshold ? '[**LOW**]' : ''}
        </Box>
      );
    },
    cellClassName: 'name-column--cell',
  },
  {
    field: 'qtySold',
    headerName: 'Quantity Sold',
    renderCell: ({ row: { qtySold } }) => {
      return <Box>{qtySold} units</Box>;
    },
    flex: 0.5,
    type: 'number',
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'weightedCostBasis',
    headerName: 'Weighted Cost Basis',
    renderCell: ({ row: { weightedCostBasis } }) => {
      return <Box>${parseFloat(weightedCostBasis).toFixed(3)}</Box>;
    },
    type: 'number',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'salePrice',
    headerName: 'Current Sale Price',
    renderCell: ({ row: { salePrice } }) => {
      return <Box>${parseFloat(salePrice).toFixed(2)}</Box>;
    },
    flex: 0.5,
    type: 'number',
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'weightedProfit',
    headerName: 'Trailing Profit',
    renderCell: ({ row: { weightedProfit } }) => {
      return (
        <Box sx={{ color: weightedProfit === 0 ? '#FDDA16' : '#47BFA0' }}>
          ${weightedProfit.toFixed(2)}
        </Box>
      );
    },
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'currentSalePriceProfit',
    headerName: 'Current Sale Price Profit',
    renderCell: ({ row: { currentSalePriceProfit } }) => {
      return (
        <Box
          sx={{
            color: currentSalePriceProfit === 0 ? '#FDDA16' : '#47BFA0',
          }}
        >
          ${currentSalePriceProfit}
        </Box>
      );
    },
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    renderCell: ({ row: { revenue } }) => {
      return (
        <Box
          sx={{
            color: revenue === 0 ? '#FDDA16' : '#47BFA0',
          }}
        >
          ${revenue ? revenue.toFixed(2) : '0'}
        </Box>
      );
    },
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'salePriceHistory',
    headerName: 'Sale Price History',
    type: 'number',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
  },
];

export const salePriceHistoryColumns = [
  {
    field: 'costBasisSoldAt',
    headerName: 'Cost Basis',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { costBasisSoldAt } }) => {
      return <Box>${parseFloat(costBasisSoldAt).toFixed(3)}</Box>;
    },
  },
  {
    field: 'salePrice',
    headerName: 'Sale Price',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { salePrice } }) => {
      return <Box>${parseFloat(salePrice).toFixed(2)}</Box>;
    },
  },
  {
    field: 'qtySold',
    headerName: 'Qty Sold',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { qtySold } }) => {
      return <Box>{`${qtySold} units`}</Box>;
    },
  },
  {
    field: 'relativeProfit',
    headerName: 'Transaction Profit',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { relativeProfit } }) => {
      return <Box>${parseFloat(relativeProfit).toFixed(2)}</Box>;
    },
  },
  {
    field: 'relativeRevenue',
    headerName: 'Transaction Revenue',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { relativeRevenue } }) => {
      return <Box>${parseFloat(relativeRevenue).toFixed(2)}</Box>;
    },
  },
  {
    field: 'updatedDate',
    headerName: 'Date Updated',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { updatedDate } }) => {
      return <Box sx={{}}>{updatedDate}</Box>;
    },
  },
  {
    field: 'updatedTime',
    headerName: 'Time Updated',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { updatedTime } }) => {
      return <Box sx={{}}>{updatedTime}</Box>;
    },
  },
  {
    field: 'changedBy',
    headerName: 'Updated By',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ row: { changedBy } }) => {
      return <Box sx={{}}>{changedBy}</Box>;
    },
  },
];
