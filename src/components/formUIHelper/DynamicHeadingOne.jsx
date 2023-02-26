import { useTheme } from '@mui/material';
import { tokens } from '../../theme';

const DynamicHeadingOne = ({ dynamicDescription, label }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <h1 style={{ textAlign: 'center', color: `${colors.primary[500]}` }}>
      {dynamicDescription !== '' ? dynamicDescription : ''} {label}
    </h1>
  );
};

export default DynamicHeadingOne;
