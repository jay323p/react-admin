import { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import { registerUser, validateEmail } from '../../services/authService';
import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Loader from '../../components/loader/Loader';
import LandingTopbar from '../../scenes/global/LandingTopbar';

const initialState = {
  name: '',
  email: '',
  password: '',
  password2: '',
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
  const { name, email, password, password2 } = formData;

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

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error('Please fill out all fields!');
    }

    if (!validateEmail(email)) {
      return toast.error('Please provide a valid email!');
    }

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters long!');
    }

    if (password !== password2) {
      return toast.error('Password do not match!');
    }
    setIsLoading(true);

    const userData = {
      name,
      email,
      password,
    };

    try {
      const data = await registerUser(userData);

      if (data) {
        toast.success('Account Registration Successful!');
        dispatch(SET_LOGIN(true));
        dispatch(SET_NAME(data.name));
        navigate('/');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          <LandingTopbar />
          <Box
            display="flex"
            justifyContent="center"
            height="100vh"
            alignItems="center"
            padding="auto"
            fontFamily={'fantasy'}
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
                Your All-In-One Inventory Dashboard Is One Register Away
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
                  Register
                </Typography>
                <AiOutlineUserAdd size={35} color={colors.primary[100]} />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '2rem',
                }}
              >
                <form onSubmit={register}>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
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
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="password2"
                    value={password2}
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
                      background: isHovering
                        ? `radial-gradient(${colors.greenAccent[300]}, ${colors.greenAccent[600]})`
                        : isActive
                        ? `${colors.greenAccent[900]}`
                        : `radial-gradient(${colors.greenAccent[600]}, ${colors.greenAccent[300]})`,
                      borderRadius: '2rem',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      color: isActive ? `${colors.greenAccent[300]}` : 'black',
                      fontWeight: '600',
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                  >
                    Register
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
                    to="/login"
                    style={{
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 'normal',
                      color: `${colors.primary[100]}`,
                    }}
                  >
                    Login
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
