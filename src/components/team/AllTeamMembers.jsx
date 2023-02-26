import { Button, Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import React from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { MdPersonSearch } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';

const AllTeamMembers = ({
  member,
  getMember,
  handleEditRequest,
  showAccessForm,
  editID,
  handleAccessChangeSubmit,
  handleInputChange,
  access,
  setShowConfirm,
  showConfirm,
  removeProfile,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      key={member.profileOwner}
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      marginBottom="7px"
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={() => getMember(member.profileOwner)}
        sx={{
          boxShadow:
            'rgba(59, 179, 173, 0.17) 0px -23px 25px 0px inset, rgba(59, 179, 173, 0.15) 0px -36px 30px 0px inset, rgba(59, 179, 173, 0.1) 0px -79px 40px 0px inset, rgba(59, 179, 173, 0.06) 0px 2px 1px, rgba(59, 179, 173, 0.09) 0px 4px 2px, rgba(59, 179, 173, 0.09) 0px 8px 4px, rgba(59, 179, 173, 0.09) 0px 16px 8px, rgba(59, 179, 173, 0.09) 0px 32px 16px',
        }}
      >
        <MdPersonSearch style={{ scale: '1.5' }} />
      </Button>
      <h5 style={{ width: '5rem' }}>{member.name}</h5>
      <Button
        variant="contained"
        color="warning"
        onClick={() => handleEditRequest(member.profileOwner.toString())}
        sx={{
          boxShadow:
            'rgba(254,162,33, 0.17) 0px -23px 25px 0px inset, rgba(254,162,33, 0.15) 0px -36px 30px 0px inset, rgba(254,162,33, 0.1) 0px -79px 40px 0px inset, rgba(254,162,33, 0.06) 0px 2px 1px, rgba(254,162,33, 0.09) 0px 4px 2px, rgba(254,162,33, 0.09) 0px 8px 4px, rgba(254,162,33, 0.09) 0px 16px 8px, rgba(254,162,33, 0.09) 0px 32px 16px',
        }}
      >
        <AiFillEdit />
      </Button>
      {showAccessForm && member.profileOwner.toString() === editID ? (
        <form onSubmit={(e) => handleAccessChangeSubmit(e)}>
          <input
            type="text"
            name="access"
            value={access}
            onChange={(e) => handleInputChange(e, editID)}
            style={{
              height: '24px',
              borderTopLeftRadius: '24px',
              borderBottomLeftRadius: '24px',
              border: 'none',
              backgroundColor: colors.primary[100],
              color: colors.primary[900],
            }}
          />
          {member.profileOwner.toString() === editID ? (
            <Button
              type="submit"
              variant="contained"
              color="warning"
              sx={{
                height: '24px',
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '0',
                marginBottom: '2px',
                boxShadow:
                  'rgba(254,162,33, 0.17) 0px -23px 25px 0px inset, rgba(254,162,33, 0.15) 0px -36px 30px 0px inset, rgba(254,162,33, 0.1) 0px -79px 40px 0px inset, rgba(254,162,33, 0.06) 0px 2px 1px, rgba(254,162,33, 0.09) 0px 4px 2px, rgba(254,162,33, 0.09) 0px 8px 4px, rgba(254,162,33, 0.09) 0px 16px 8px, rgba(254,162,33, 0.09) 0px 32px 16px',
              }}
            >
              Change Access
            </Button>
          ) : (
            ''
          )}
        </form>
      ) : (
        ''
      )}
      <h5 style={{ width: '3rem' }}>{member.access}</h5>
      <Button
        color="warning"
        variant="contained"
        style={{ width: '5rem', height: '24px' }}
        onClick={() => setShowConfirm(!showConfirm)}
        sx={{
          boxShadow:
            'rgba(254,162,33, 0.17) 0px -23px 25px 0px inset, rgba(254,162,33, 0.15) 0px -36px 30px 0px inset, rgba(254,162,33, 0.1) 0px -79px 40px 0px inset, rgba(254,162,33, 0.06) 0px 2px 1px, rgba(254,162,33, 0.09) 0px 4px 2px, rgba(254,162,33, 0.09) 0px 8px 4px, rgba(254,162,33, 0.09) 0px 16px 8px, rgba(254,162,33, 0.09) 0px 32px 16px',
        }}
      >
        {showConfirm ? 'Cancel' : <CiCircleRemove style={{ scale: '1.5' }} />}
      </Button>
      {showConfirm ? (
        <Button
          color="error"
          variant="contained"
          style={{ width: '5rem', height: '24px' }}
          onClick={() => removeProfile(member.profileOwner)}
          sx={{
            boxShadow:
              'rgba(203, 42, 42, 0.17) 0px -23px 25px 0px inset, rgba(203, 42, 42, 0.15) 0px -36px 30px 0px inset, rgba(203, 42, 42, 0.1) 0px -79px 40px 0px inset, rgba(203, 42, 42, 0.06) 0px 2px 1px, rgba(203, 42, 42, 0.09) 0px 4px 2px, rgba(203, 42, 42, 0.09) 0px 8px 4px, rgba(203, 42, 42, 0.09) 0px 16px 8px, rgba(203, 42, 42, 0.09) 0px 32px 16px',
          }}
        >
          Confirm
        </Button>
      ) : (
        ''
      )}
    </Box>
  );
};

export default AllTeamMembers;
