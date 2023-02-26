import { Box, Typography } from '@mui/material';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

export const teamColumns = [
  { field: 'profileOwner', headerName: 'ID' },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    cellClassName: 'name-column--cell',
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'phone',
    headerName: 'Phone Number',
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'access',
    headerName: 'Access Level',
    flex: 1,
    renderCell: ({ row: { access } }) => {
      return (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={access === 'admin' ? '#70D2AF' : '#2E7C67'}
          borderRadius="4px"
        >
          {access === 'admin' && <AdminPanelSettingsOutlinedIcon />}
          {access === 'manager' && <SecurityOutlinedIcon />}
          {access === 'user' && <LockOpenOutlinedIcon />}
          <Typography color={'#D2D8D6'} sx={{ ml: '5px' }}>
            {access}
          </Typography>
        </Box>
      );
    },
  },
];
