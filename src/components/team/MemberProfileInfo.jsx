import { Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import React from 'react';

const MemberProfileInfo = ({
  font,
  showDescription,
  memberProfile,
  lineBreaks,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {/* NAME */}
      <Typography variant="h1" fontFamily={font} color={colors.primary[500]}>
        {showDescription ? `Name: ${memberProfile.name}` : memberProfile.name}
      </Typography>
      {lineBreaks ? (
        <hr
          style={{
            backgroundColor: 'red',
            width: '100%',
            borderColor: `${colors.primary[500]}`,
          }}
        />
      ) : (
        ''
      )}
      {/* TEAMNAME */}
      <Typography variant="h3" fontFamily={font} color={colors.primary[500]}>
        {showDescription
          ? `Team: ${memberProfile.teamName}`
          : memberProfile.teamName}
      </Typography>
      {lineBreaks ? (
        <hr
          style={{
            backgroundColor: 'red',
            width: '100%',
            borderColor: `${colors.primary[500]}`,
          }}
        />
      ) : (
        ''
      )}
      {/* POSITION */}
      <Typography variant="h3" fontFamily={font} color={colors.primary[500]}>
        {showDescription ? `Position: ${memberProfile.bio}` : memberProfile.bio}
      </Typography>
      {lineBreaks ? (
        <hr
          style={{
            backgroundColor: 'red',
            width: '100%',
            borderColor: `${colors.primary[500]}`,
          }}
        />
      ) : (
        ''
      )}
      {/* ACCESS LEVEL */}
      <Typography variant="h3" fontFamily={font} color={colors.primary[500]}>
        {showDescription
          ? `Access Level: ${memberProfile.access}`
          : memberProfile.access}
      </Typography>
      {lineBreaks ? (
        <hr
          style={{
            backgroundColor: 'red',
            width: '100%',
            borderColor: `${colors.primary[500]}`,
          }}
        />
      ) : (
        ''
      )}
      {/* EMAIL */}
      <Typography variant="h3" fontFamily={font} color={colors.primary[500]}>
        {showDescription
          ? `Email: ${memberProfile.email}`
          : memberProfile.email}
      </Typography>
      {lineBreaks ? (
        <hr
          style={{
            backgroundColor: 'red',
            width: '100%',
            borderColor: `${colors.primary[500]}`,
          }}
        />
      ) : (
        ''
      )}
      {/* PHONE */}
      <Typography variant="h3" fontFamily={font} color={colors.primary[500]}>
        {showDescription
          ? `Phone: ${memberProfile.phone}`
          : memberProfile.phone}
      </Typography>
      {lineBreaks ? (
        <hr
          style={{
            backgroundColor: 'red',
            width: '100%',
            borderColor: `${colors.primary[500]}`,
          }}
        />
      ) : (
        ''
      )}
      {/* AGE */}
      <Typography variant="h3" fontFamily={font} color={colors.primary[500]}>
        {showDescription ? `Age: ${memberProfile.age}` : memberProfile.age}
      </Typography>
      {lineBreaks ? (
        <hr
          style={{
            backgroundColor: 'red',
            width: '100%',
            borderColor: `${colors.primary[500]}`,
          }}
        />
      ) : (
        ''
      )}
      {/* JOINED */}
      <Typography variant="h5" fontFamily={font} color={colors.primary[500]}>
        {showDescription
          ? `Joined: ${memberProfile.createdAt.slice(0, 10)}`
          : memberProfile.createdAt.slice(0, 10)}
      </Typography>
      {lineBreaks ? (
        <hr
          style={{
            backgroundColor: 'red',
            width: '100%',
            borderColor: `${colors.primary[500]}`,
          }}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default MemberProfileInfo;
