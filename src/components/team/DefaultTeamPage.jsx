import { Box, Button, TextField, useTheme } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import Header from '../Header';
import { tokens } from '../../theme';

const DefaultTeamPage = ({
  handleFormSubmit,
  initialValues,
  teamSchema,
  isNonMobile,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box marginLeft={'2rem'} marginRight="2rem">
      <Box display="flex" justifyContent="space-between" marginTop="2rem">
        <Header
          title="Manage Team Members"
          subtitle="Please enter team name for access!"
        />
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={teamSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': {
                  gridColumn: isNonMobile ? undefined : 'span 4',
                },
              }}
            >
              {/* TEAMNAME */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Team Name (case/space sensitive)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.teamName}
                name="teamName"
                error={!!touched.teamName && !!errors.teamName}
                helperText={touched.teamName && errors.teamName}
                sx={{ gridColumn: 'span 3' }}
              />

              {/* SUBMIT BUTTON */}
              <Box display="flex" justifyContent="end">
                <Button
                  type="submit"
                  style={{
                    backgroundColor: `${colors.greenAccent[500]}`,
                    boxShadow: `${'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'}`,
                  }}
                  variant="contained"
                >
                  Get Team Members
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DefaultTeamPage;
