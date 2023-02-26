import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword, validateEmail } from '../../services/authService';
import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { AiOutlineMail } from 'react-icons/ai';
import LandingTopbar from '../../scenes/global/LandingTopbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  const forgot = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error('Please provide your email!');
    }

    if (!validateEmail(email)) {
      return toast.error('Please provide a valid email!');
    }

    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail('');
  };

  return (
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
            style={{ fontFamily: 'sans-serif', color: colors.greenAccent[400] }}
          >
            Your All-In-One Inventory Dashboard Is One Password-Reset Away
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
              Forgot Password
            </Typography>
            <AiOutlineMail size={35} color={colors.primary[100]} />
          </div>

          <form onSubmit={forgot} style={{ marginTop: '2rem' }}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Get Reset Email
            </button>
            <br />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'sans-serif',
              }}
            >
              <p>
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
              </p>
              <p>
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
              </p>
            </div>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
