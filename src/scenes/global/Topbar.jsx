// REACT-REDUX-ROUTER-SERVICES-SLICES RELATED IMPORTS
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  SET_LOGIN,
  SET_NAME,
} from '../../redux/features/auth/authSlice';
import {
  SET_PROFILE,
  SET_TEAMNAME,
} from '../../redux/features/profile/profileSlice';
import { logoutUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, useTheme } from '@mui/material';
// MUI-MATERIAL
import { InputBase } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { ColorModeContext, tokens } from '../../theme';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const logout = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    localStorage.removeItem('name');
    dispatch(SET_NAME(''));
    dispatch(SET_TEAMNAME(''));
    dispatch(
      SET_PROFILE({
        profileOwner: '',
        teamName: undefined,
        teamJoined: '',
        name: '',
        age: undefined,
        access: '',
        email: '',
        photo: '',
        phone: '',
        bio: '',
      })
    );
    navigate('/landing');
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {isLoggedIn ? (
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        ) : (
          ''
        )}
        {isLoggedIn ? (
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        ) : (
          ''
        )}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          {isLoggedIn ? <NotificationsOutlinedIcon /> : ''}
        </IconButton>
        <IconButton>{isLoggedIn ? <SettingsOutlinedIcon /> : ''}</IconButton>
        <IconButton onClick={logout}>
          {isLoggedIn ? <LogoutIcon sx={{ color: 'red' }} /> : ''}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
