import { Box, Button } from '@mui/material';

export const invoiceColumns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'companyName',
    headerName: 'Company Name',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    cellClassName: 'name-column--cell',
    valueGetter: (params) => params.row.distributorInfo.companyName,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params) => params.row.distributorInfo.phone,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params) => params.row.distributorInfo.email,
  },
  {
    field: 'invoiceNumber',
    headerName: 'Invoice #',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params) => params.row.distributorInfo.invoiceNumber,
  },
  {
    field: 'dateOfIssue',
    headerName: 'Issue Date',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params) => params.row.distributorInfo.dateOfIssue,
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params) => params.row.distributorInfo.dueDate,
  },
  {
    field: 'balance',
    headerName: 'Balance Due',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params) => params.row.balance,
    renderCell: ({ row: { balance } }) => {
      return (
        <Box>
          <p
            style={{
              color: balance === 0 ? `#21D0B6` : `#DB4F4A`,
            }}
          >
            ${balance}
          </p>
        </Box>
      );
    },
  },
];
