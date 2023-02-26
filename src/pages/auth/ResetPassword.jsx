import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authService';
import { MdPassword } from 'react-icons/md';
import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const initialState = {
  password: '',
  password2: '',
};

const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { resetToken } = useParams();

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
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error('Password must be longer than 6 characters!');
    }
    if (password !== password2) {
      return toast.error('Passwords do not match!');
    }

    const userData = {
      password,
      password2,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
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
        flexDirection={'column'}
        justifyContent="center"
        alignItems="center"
        height="40vh"
        padding={'2rem'}
        boxShadow={`rgba(112, 216, 189, 0.17) 0px -23px 25px 10px inset, rgba(112, 216, 189, 0.15) 0px -36px 30px 20px inset, rgba(112, 216, 189, 0.1) 0px -79px 40px 30px inset, rgba(112, 216, 189, 0.06) 0px 2px 1px, rgba(112, 216, 189, 0.4) 0px 4px 2px, rgba(112, 216, 189, 0.3) 0px 8px 4px, rgba(112, 216, 189, 0.2) 0px 16px 8px, rgba(112, 216, 189, 0.1) 0px 32px 16px;`}
        sx={{ backgroundColor: colors.grey[100], borderRadius: '1rem' }}
      >
        <MdPassword size={35} color={colors.greenAccent[700]} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h2"
            color={colors.greenAccent[700]}
            fontWeight="600"
            sx={{ textAlign: 'center' }}
          >
            Reset Forgotten Password
          </Typography>
        </div>

        <form onSubmit={reset} style={{ marginTop: '2rem' }}>
          <input
            type="password"
            placeholder="New Password"
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
            Reset Password
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
                  color: `${colors.blueAccent[600]}`,
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
                  color: `${colors.blueAccent[600]}`,
                }}
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
