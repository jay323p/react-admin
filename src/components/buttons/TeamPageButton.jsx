import { Button } from '@mui/material';
import React from 'react';

const TeamPageButton = ({ onClick, state, label, type }) => {
  return (
    <>
      {type === 'basic' ? (
        <Button
          variant="outlined"
          color="warning"
          size="small"
          onClick={onClick}
          sx={{
            boxShadow:
              'rgba(254, 162, 34, 0.17) 0px -23px 25px 0px inset, rgba(254, 162, 34, 0.15) 0px -36px 30px 0px inset, rgba(254, 162, 34, 0.1) 0px -79px 40px 0px inset, rgba(254, 162, 34, 0.06) 0px 2px 1px, rgba(254, 162, 34, 0.09) 0px 4px 2px, rgba(254, 162, 34, 0.09) 0px 8px 4px, rgba(254, 162, 34, 0.09) 0px 16px 8px, rgba(254, 162, 34, 0.09) 0px 32px 16px',
          }}
        >
          {label}
        </Button>
      ) : type === 'complex' ? (
        <Button
          variant="contained"
          color="error"
          onClick={() => onClick(!state)}
          sx={{
            height: '3rem',
            width: '5rem',
            boxShadow:
              'rgba(203, 42, 42, 0.17) 0px -23px 25px 0px inset, rgba(203, 42, 42, 0.15) 0px -36px 30px 0px inset, rgba(203, 42, 42, 0.1) 0px -79px 40px 0px inset, rgba(203, 42, 42, 0.06) 0px 2px 1px, rgba(203, 42, 42, 0.09) 0px 4px 2px, rgba(203, 42, 42, 0.09) 0px 8px 4px, rgba(203, 42, 42, 0.09) 0px 16px 8px, rgba(203, 42, 42, 0.09) 0px 32px 16px',
          }}
        >
          Go Back
        </Button>
      ) : (
        ''
      )}
    </>
  );
};

export default TeamPageButton;
