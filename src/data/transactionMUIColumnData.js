import { Box, Button } from '@mui/material';

export const transactionColumns = [
  {
    field: '_id',
    headerName: 'Transaction ID',
    flex: 1,
    headerAlign: 'center',
  },
  {
    field: 'transactionTimeline',
    headerName: 'Timeline',
    flex: 1,
    headerAlign: 'center',
    renderCell: ({ row: { transactionTimeline } }) => {
      return (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
          fontWeight={900}
        >
          {transactionTimeline}
        </Box>
      );
    },
  },
  {
    field: 'transactionQty',
    headerName: 'Transaction Qty',
    flex: 1,
    headerAlign: 'center',
    cellClassName: 'name-column--cell',
    renderCell: ({ row: { transactionQty } }) => {
      return (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
          color="#5B64DA"
        >
          {transactionQty} units
        </Box>
      );
    },
  },
  {
    field: 'transactionTotal',
    headerName: 'Transaction Total',
    flex: 1,
    headerAlign: 'center',
    cellClassName: 'name-column--cell',
    renderCell: ({ row: { transactionTotal } }) => {
      return (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
        >
          ${transactionTotal}
        </Box>
      );
    },
  },
  {
    field: 'transactionLosses',
    headerName: 'Transaction Losses',
    flex: 1,
    headerAlign: 'center',
    cellClassName: 'name-column--cell',
    renderCell: ({ row: { transactionLosses } }) => {
      return (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
          color="#DB4F4A"
        >
          ${transactionLosses}
        </Box>
      );
    },
  },
  {
    field: 'transactedItems',
    headerName: 'Unique Transacted Items',
    flex: 1,
    headerAlign: 'center',
    renderCell: ({ row: { transactedItems } }) => {
      return (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
        >
          <Button
            variant="contained"
            color="info"
            sx={{ borderRadius: '5px', overflow: 'hidden' }}
          >
            {transactedItems.length}
          </Button>
        </Box>
      );
    },
  },
];
