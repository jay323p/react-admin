import { useState } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import { loginUser, validateEmail } from '../../services/authService';
import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Loader from '../../components/loader/Loader';
import { getProfile } from '../../services/profileService';
import { SET_PROFILE } from '../../redux/features/profile/profileSlice';
import LandingTopbar from '../../scenes/global/LandingTopbar';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { email, password } = formData;

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleClick = () => {
    setIsActive(true);

    setTimeout(() => {
      setIsActive(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    //
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('Please fill out all fields!');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email!');
    }

    setIsLoading(true);
    const userData = {
      email,
      password,
    };

    try {
      const data = await loginUser(userData);

      if (data) {
        const profile = await getProfile();

        if (profile) {
          dispatch(SET_PROFILE(profile));
          dispatch(SET_LOGIN(true));
          localStorage.setItem('name', profile.name);
          navigate('/');
        } else {
          localStorage.setItem('name', data.name);
          dispatch(SET_LOGIN(true));
          dispatch(SET_NAME(data.name));
          navigate('/');
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader
          style={{
            height: '18rem',
            width: '18rem',
          }}
        />
      ) : (
        <Box>
          <LandingTopbar />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding="auto"
            fontFamily={'fantasy'}
            height="100vh"
            width="100vw"
          >
            <Box
              display="flex"
              flexDirection="column"
              flex="3 1"
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
              paddingY="3rem"
              sx={{
                backgroundImage:
                  'linear-gradient(to right, rgba(142, 45, 226, 0.2), rgba(74, 0, 224, 0.6))',
              }}
            >
              <h2
                style={{
                  fontFamily: 'sans-serif',
                  color: colors.greenAccent[400],
                }}
              >
                Your All-In-One Inventory Dashboard Is One Sign-In Away
              </h2>
              <img
                src="/dashboard.png"
                alt="dashboard"
                style={{
                  objectFit: 'contain',
                  aspectRatio: '2/1',
                  height: '100%',
                  maxWidth: '95%',
                }}
              />
            </Box>
            <Box
              display="flex"
              flex="1 1"
              flexDirection={'column'}
              justifyContent="center"
              alignItems="center"
              height="100%"
              width="100%"
              padding={'2rem'}
              boxShadow={`rgba(142, 45, 226, 0.17) 0px -23px 25px 10px inset, rgba(142, 45, 226, 0.15) 0px -36px 30px 20px inset, rgba(142, 45, 226, 0.1) 0px -79px 40px 30px inset, rgba(142, 45, 226, 0.06) 0px 2px 1px, rgba(142, 45, 226, 0.4) 0px 4px 2px, rgba(142, 45, 226, 0.3) 0px 8px 4px, rgba(142, 45, 226, 0.2) 0px 16px 8px, rgba(142, 45, 226, 0.1) 0px 32px 16px;`}
              sx={{
                backgroundImage:
                  'linear-gradient(to right, rgba(142, 45, 226, 0.4), rgba(74, 0, 224, 0.2))',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="h2"
                  color={colors.primary[100]}
                  fontWeight="600"
                  sx={{ textAlign: 'center' }}
                >
                  Login
                </Typography>
                <BiLogIn size={35} color={colors.primary[100]} />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '2rem',
                }}
              >
                <form onSubmit={login}>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    style={{
                      borderRadius: '1rem',
                      border: 'none',
                      marginBottom: '0.5rem',
                      height: '1.5rem',
                      textAlign: 'center',
                      width: '20rem',
                    }}
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    style={{
                      borderRadius: '1rem',
                      border: 'none',
                      marginBottom: '0.5rem',
                      height: '1.5rem',
                      textAlign: 'center',
                      width: '20rem',
                    }}
                  />
                  <br />
                  <button
                    className="bg-sky-500 hover: bg-danger"
                    type="submit"
                    style={{
                      width: '20rem',
                      height: '2rem',
                      border: 'none',
                      fontSize: isHovering ? '1.3rem' : '1rem',
                      background: isHovering
                        ? `radial-gradient(${colors.greenAccent[300]}, ${colors.greenAccent[600]})`
                        : isActive
                        ? `${colors.greenAccent[900]}`
                        : `radial-gradient(${colors.greenAccent[600]}, ${colors.greenAccent[300]})`,
                      borderRadius: '2rem',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      color: isActive ? `${colors.greenAccent[300]}` : 'black',
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                  >
                    Login
                  </button>
                </form>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '0.6rem',
                    fontFamily: 'sans-serif',
                  }}
                >
                  <Link
                    style={{
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 'normal',
                      color: `${colors.primary[100]}`,
                    }}
                    to="/forgot"
                  >
                    Forgot Password?
                  </Link>
                  <Link
                    to="/register"
                    style={{
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 'normal',
                      color: `${colors.primary[100]}`,
                    }}
                  >
                    Register
                  </Link>
                </div>
              </div>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Login;
