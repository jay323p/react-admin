import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, useTheme } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { tokens } from '../theme';
import { EclipseLoader } from './loader/Loader';

const FormikForm = ({
  handleFormSubmit,
  initialValues,
  isNonMobile,
  handleImageChange,
  isLoading,
  pdfName,
  setPdfName,
  btnLabel,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Formik
      enableReinitialize
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
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
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              '& > div': {
                gridColumn: isNonMobile ? undefined : 'span 4',
              },
            }}
          >
            {/* upload invoice btn */}
            <Button
              variant="contained"
              color={'info'}
              component="label"
              sx={{
                gridColumn: 'span 2',
                fontWeight: '900',
                fontSize: '15px',
                height: '3rem',
                boxShadow:
                  'rgba(30, 130, 177, 0.17) 0px -23px 25px 0px inset, rgba(30, 130, 177, 0.15) 0px -36px 30px 0px inset, rgba(30, 130, 177, 0.1) 0px -79px 40px 0px inset, rgba(30, 130, 177, 0.06) 0px 2px 1px, rgba(30, 130, 177, 0.09) 0px 4px 2px, rgba(30, 130, 177, 0.09) 0px 8px 4px, rgba(30, 130, 177, 0.09) 0px 16px 8px, rgba(30, 130, 177, 0.09) 0px 32px 16px',
              }}
            >
              <PhotoCamera style={{ marginRight: '10px' }} />
              {btnLabel[0]}
              <input
                hidden
                accept="application/pdf"
                name="pdfFile"
                type="file"
                onChange={(e) => handleImageChange(e)}
              />
            </Button>
            {/* pdf uploaded ? show pdf name */}
            {pdfName ? pdfName : ''}

            {/* uploaded pdf ? show confim submit and cancel btns */}
            {pdfName ? (
              <Box display="flex" justifyContent="end" mt="20px">
                {isLoading ? (
                  <Button
                    type="submit"
                    disabled
                    style={{
                      backgroundColor: `${colors.greenAccent[500]}`,
                      boxShadow: `${'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'}`,
                    }}
                    variant="contained"
                  >
                    <EclipseLoader />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: `${colors.greenAccent[500]}`,
                      boxShadow: `${'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'}`,
                    }}
                    variant="contained"
                  >
                    {btnLabel[1]}
                  </Button>
                )}
                <Button
                  variant="contained"
                  color={'error'}
                  sx={{ marginLeft: '10px' }}
                  onClick={() => setPdfName('')}
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              ''
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FormikForm;
