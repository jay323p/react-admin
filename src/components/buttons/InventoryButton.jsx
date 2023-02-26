import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';

const InventoryButton = ({
  type,
  color,
  btnFunction,
  height,
  fontSize,
  variant,
  switchState,
  label,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {type === 'close' ? (
        <Button>
          <CloseIcon
            height={height}
            fontSize={fontSize}
            sx={{ color: color }}
            onClick={() => btnFunction()}
          />
        </Button>
      ) : type === 'switch' ? (
        <Button
          variant={variant}
          color={color}
          onClick={() => btnFunction(!switchState)}
        >
          {label}
        </Button>
      ) : (
        ''
      )}
    </>
  );
};

export default InventoryButton;
