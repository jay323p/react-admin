import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';

const QuickInventoryInfo = ({ inventoryQty, inventoryTotal }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" flexDirection="column">
      {/* QUICK INVENTORY INFO BOX */}
      <h2
        style={{
          backgroundImage: `linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%)`,
          textAlign: 'center',
          color: `${colors.primary[500]}`,
          padding: '4px',
          borderTopLeftRadius: '7px',
          borderTopRightRadius: '7px',
        }}
      >
        Quantity: {inventoryQty} units
      </h2>
      <h2
        style={{
          backgroundImage: `linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%)`,
          textAlign: 'center',
          color: `${colors.primary[500]}`,
          padding: '4px',
        }}
      >
        Inventory Cost: ${inventoryTotal.toFixed(2)}
      </h2>
    </Box>
  );
};

export default QuickInventoryInfo;
