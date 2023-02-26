import { Box, Button, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { tokens } from '../../theme';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import InventoryIcon from '@mui/icons-material/Inventory';
import HttpsIcon from '@mui/icons-material/Https';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import Groups2Icon from '@mui/icons-material/Groups2';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useNavigate } from 'react-router-dom';
import LandingTopbar from '../../scenes/global/LandingTopbar';
const Landing = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [showTypewriter, setShowTypewriter] = useState(true);
  const [showGroupOne, setShowGroupOne] = useState(false);
  const [showGroupTwo, setShowGroupTwo] = useState(false);
  const [showGroupThree, setShowGroupThree] = useState(false);

  useEffect(() => {
    if (showTypewriter) {
      setTimeout(() => {
        setShowTypewriter(false);
      }, [18000]);
    }

    setTimeout(() => {
      setShowGroupOne(true);
    }, [19000]);
    setTimeout(() => {
      setShowGroupTwo(true);
    }, [20000]);
    setTimeout(() => {
      setShowGroupThree(true);
    }, [21000]);
  }, []);
  return (
    <Box overflow="auto" height="100vh">
      <LandingTopbar />
      <h1
        style={{
          textAlign: 'center',
          color: colors.primary[500],
          marginTop: '2rem',
          backgroundImage: 'linear-gradient(to right, #8e2de2, #4a00e0)',
        }}
      >
        Scanning Based Inventory System
      </h1>
      <Box
        height="40vh"
        width="100vw"
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        sx={{ backgroundImage: 'linear-gradient(to right, #8e2de2, #4a00e0)' }}
      >
        {showTypewriter ? (
          <Box
            width="100%"
            height="15rem"
            marginLeft="2rem"
            paddingLeft="1rem"
            sx={{ backgroundColor: colors.primary[500], borderRadius: '2rem' }}
          >
            <h1 style={{ color: colors.primary[500] }}>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      '<span style="color: #8e2de2;">Welcome New User,</span>'
                    )
                    .pauseFor(11000)
                    .deleteAll()
                    .start();
                }}
              />
            </h1>
            <h1 style={{ color: colors.primary[500] }}>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(3000)
                    .typeString(
                      '<span style="color: #4a00e0;">To Your Brand New Inventory Management Solution!</span>'
                    )
                    .start()
                    .pauseFor(4000)
                    .deleteAll();
                }}
              />
            </h1>
            <h1 style={{ color: colors.primary[500] }}>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(10000)
                    .typeString(
                      '<span style="color: #8e2de2;">Let\'s Get Started!</span>'
                    )
                    .start()
                    .pauseFor(3000)
                    .deleteAll();
                }}
              />
            </h1>
          </Box>
        ) : (
          <Box
            padding="4px"
            marginLeft="5rem"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            sx={{
              color: colors.primary[500],
              border: `1px solid ${colors.primary[500]}`,
              borderRadius: '2rem',
              boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
              backgroundImage:
                'linear-gradient( 109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% )',
            }}
          >
            <Box display="flex" justifyContent="center">
              <h2>PDF-Based Inventory Management</h2>
            </Box>
            <Box
              marginTop="6px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <h4 style={{ textAlign: 'center' }}>
                Manage your entire inventory through pdf scans! After each scan,
                the necessary calculations will be done for you automatically!
              </h4>
            </Box>
            <Box
              marginTop="1.5rem"
              display="flex"
              justifyContent="center"
              gap="4px"
            >
              <PictureAsPdfIcon fontSize="large" />
              <ArrowRightAltIcon fontSize="large" />
              <DatasetLinkedIcon fontSize="large" />
            </Box>

            <Box display="flex" flexDirection="column">
              <h3 style={{ color: colors.primary[500], textAlign: 'center' }}>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter.typeString("It's as easy as ......").start();
                  }}
                />
              </h3>
              <h3 style={{ color: colors.primary[500], textAlign: 'center' }}>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(3000)
                      .typeString('1). Set-up Inventory Through PDF Scan.')
                      .start();
                  }}
                />
              </h3>
              <h3 style={{ color: colors.primary[500], textAlign: 'center' }}>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(8000)
                      .typeString('2). Add Inventory Through PDF Scan.')
                      .start();
                  }}
                />
              </h3>
              <h3 style={{ color: colors.primary[500], textAlign: 'center' }}>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(13000)
                      .typeString('3). Remove Inventory Through PDF Scan')
                      .start();
                  }}
                />
              </h3>
            </Box>
          </Box>
        )}
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            src="/inventorypng.png"
            alt="inventory"
            style={{
              objectFit: 'contain',
              width: 'auto',
              height: 'auto',
            }}
          />
        </Box>
      </Box>
      <Box
        marginTop="2rem"
        display="flex"
        flexDirection="column"
        sx={{
          backgroundImage: 'linear-gradient(to right, #8e2de2, #4a00e0)',
        }}
      >
        <h1 style={{ textAlign: 'center', color: colors.primary[500] }}>
          Team-Based Inventory Management
        </h1>
        <Box
          display="flex"
          justifyContent="space-evenly"
          gap="1rem"
          padding="1rem"
          sx={{
            backgroundImage: 'linear-gradient(to right, #8e2de2, #4a00e0)',
          }}
        >
          <Box
            display="flex"
            height="320px"
            width="320px"
            flexDirection="column"
            justifyContent="center"
            style={{
              backgroundColor: colors.primary[500],
              borderRadius: '20%',
              cursor: 'pointer',
            }}
          >
            {!showGroupOne ? (
              <>
                <h2
                  style={{
                    textAlign: 'center',
                    marginTop: '2rem',
                    color: colors.blueAccent[400],
                  }}
                >
                  Declutter Your Inventory
                </h2>
                <img
                  src="/group4.png"
                  alt=""
                  style={{
                    objectFit: 'contain',
                    aspectRatio: '1/2',
                    height: '300px',
                    width: '300px',
                  }}
                  onClick={() => setShowGroupOne(true)}
                />
              </>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                gap="10px"
                onClick={() => setShowGroupOne(false)}
                sx={{ color: colors.blueAccent[400] }}
              >
                <h2 style={{ textAlign: 'center', marginBottom: '1.7rem' }}>
                  Declutter Your Inventory With An Online Solution!
                </h2>

                <h4 style={{ textAlign: 'center' }}>
                  No More Inventory Stress! Know Exactly What Is In Your
                  Inventory And What Is Not!
                </h4>

                <h4 style={{ textAlign: 'center' }}>
                  Real-Time Access To Your Inventory Stats When You Need Them!
                </h4>

                <Box display="flex" justifyContent="center">
                  <CleaningServicesIcon fontSize="large" />
                  <InventoryIcon fontSize="large" />
                </Box>
              </Box>
            )}
          </Box>
          <Box
            display="flex"
            height="320px"
            width="320px"
            flexDirection="column"
            justifyContent="center"
            style={{
              backgroundColor: colors.primary[500],
              borderRadius: '20%',
              cursor: 'pointer',
            }}
          >
            {!showGroupTwo ? (
              <>
                <h2
                  style={{
                    textAlign: 'center',
                    marginTop: '2rem',
                    color: colors.greenAccent[400],
                  }}
                >
                  Manage All Employees
                </h2>
                <img
                  src="/team.png"
                  alt=""
                  style={{
                    objectFit: 'contain',
                    aspectRatio: '1/2',
                    height: '300px',
                    width: '300px',
                  }}
                  onClick={() => setShowGroupTwo(true)}
                />
              </>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                gap="10px"
                onClick={() => setShowGroupTwo(false)}
                sx={{ color: colors.greenAccent[400] }}
              >
                <h2 style={{ textAlign: 'center', marginBottom: '1.7rem' }}>
                  Manage Your Team Of Employees!
                </h2>

                <h4 style={{ textAlign: 'center' }}>
                  Decide Which Members Are Allowed To Update Inventory Or To
                  Simply View Inventory
                </h4>

                <h4 style={{ textAlign: 'center' }}>
                  Secure And Fast! Only Your Team Has Access To Your Inventory
                  And Right When You Need It!
                </h4>

                <Box display="flex" justifyContent="center">
                  <HttpsIcon fontSize="large" />
                  <ElectricBoltIcon fontSize="large" />
                </Box>
              </Box>
            )}
          </Box>
          <Box
            display="flex"
            height="320px"
            width="320px"
            flexDirection="column"
            justifyContent="center"
            style={{
              backgroundColor: colors.primary[500],
              borderRadius: '20%',
              cursor: 'pointer',
            }}
          >
            {!showGroupThree ? (
              <>
                <h2
                  style={{
                    textAlign: 'center',
                    marginTop: '2rem',
                    color: colors.blueAccent[400],
                  }}
                >
                  Keep Everyone Up-To-Date
                </h2>
                <img
                  src="/lastGroup.png"
                  alt=""
                  style={{
                    objectFit: 'contain',
                    aspectRatio: '1/2',
                    height: '300px',
                    width: '300px',
                  }}
                  onClick={() => setShowGroupThree(true)}
                />
              </>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                gap="10px"
                onClick={() => setShowGroupThree(false)}
                sx={{ color: colors.blueAccent[400] }}
              >
                <h2 style={{ textAlign: 'center', marginBottom: '1.7rem' }}>
                  Keep Everyone On The Same Page!
                </h2>

                <h4 style={{ textAlign: 'center' }}>
                  Easily Manage Team And Track All Inventory Updates Made By
                  Members
                </h4>

                <h4 style={{ textAlign: 'center' }}>
                  Frequent Addition Of Team-Based Features To Even Further
                  Organize Your Entity
                </h4>

                <Box display="flex" justifyContent="center" gap="10px">
                  <Groups2Icon fontSize="large" />
                  <AutoStoriesIcon fontSize="large" />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        sx={{ textAlign: 'center' }}
        position="sticky"
        paddingLeft="auto"
        paddingRight="auto"
      >
        Jay's Inventory Management System &copy; 2023
        <Box
          display="flex"
          justifyContent="space-evenly"
          gap="2rem"
          marginRight="2rem"
        >
          <Box sx={{ cursor: 'pointer', color: colors.greenAccent[400] }}>
            Privacy
          </Box>
          <Box sx={{ cursor: 'pointer', color: colors.greenAccent[400] }}>
            Terms
          </Box>
          <Box sx={{ cursor: 'pointer', color: colors.greenAccent[400] }}>
            Contact Us
          </Box>
          <Box sx={{ cursor: 'pointer', color: colors.greenAccent[400] }}>
            Social
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
