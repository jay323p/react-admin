import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, TextField, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Formik } from 'formik';
import React from 'react';
import { BiShow } from 'react-icons/bi';
import { FcCancel } from 'react-icons/fc';
import Header from '../Header';

const ProfileForm = ({
  editProfile,
  hide,
  mouseHover,
  handleMouseEnter,
  handleMouseLeave,
  setEditProfile,
  handleFormSubmit,
  initialValues,
  profileSchema,
  isNonMobile,
  handleImageChange,
  imagePreview,
  handleModalClick,
  setHideNotification,
  hideNotification,
  setShowDeleteForm,
  showDeleteForm,
  deleteProfile,
  teamName,
  handleTeamNameChange,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Header
          title={editProfile ? 'UPDATE PROFILE' : 'CREATE PROFILE'}
          subtitle={
            editProfile
              ? 'Update existing profile'
              : 'Create a new user profile'
          }
        />
        {!hide ? (
          <button
            style={{
              backgroundColor: `${
                mouseHover && !editProfile
                  ? colors.blueAccent[600]
                  : mouseHover && editProfile
                  ? colors.greenAccent[600]
                  : !mouseHover && !editProfile
                  ? colors.blueAccent[300]
                  : !mouseHover && editProfile
                  ? colors.greenAccent[300]
                  : 'white'
              }`,
              border: 'none',
              height: '4rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              boxShadow: `${
                editProfile
                  ? 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'
                  : 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'
              }`,
              color: 'white',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setEditProfile(!editProfile)}
          >
            {editProfile ? 'Create New Profile' : 'Update Profile'}
          </button>
        ) : (
          ''
        )}
      </Box>
      <Formik
        enableReinitialize
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={profileSchema}
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
              {/* NAME */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: 'span 2' }}
              />
              {/* ACCESS LEVEL */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Access Level (user, admin, manager)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.access}
                name="access"
                error={!!touched.access && !!errors.access}
                helperText={touched.access && errors.access}
                sx={{ gridColumn: 'span 2' }}
              />
              {/* EMAIl */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
              {/* PHONE NUMBER */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: 'span 4' }}
              />

              {/* AGE */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: 'span 2' }}
              />
              {/* BIO */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Team Member Position"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bio}
                name="bio"
                error={!!touched.bio && !!errors.bio}
                helperText={touched.bio && errors.bio}
                sx={{ gridColumn: 'span 2' }}
              />
              {/* UPLOAD PHOTO */}
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
                Upload Profile Picture
                <input
                  hidden
                  accept="image/*"
                  name="photo"
                  multiple
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
              </Button>

              {imagePreview !== null ? (
                <Box height="5rem">
                  <img
                    src={imagePreview}
                    alt="image_preview"
                    style={{
                      height: 'inherit',
                      borderRadius: '1rem',
                      cursor: 'pointer',
                    }}
                    onClick={handleModalClick}
                  />
                </Box>
              ) : (
                <p>No new image set for profile picutre</p>
              )}
            </Box>

            {/* SUBMIT BUTTON */}
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                style={{
                  backgroundColor: `${
                    editProfile
                      ? colors.greenAccent[500]
                      : colors.blueAccent[500]
                  }`,
                  boxShadow: `${
                    editProfile
                      ? 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'
                      : 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'
                  }`,
                }}
                variant="contained"
              >
                {editProfile ? 'Update Profile' : 'Create New Profile'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {hide ? (
        <Box display="flex" flexDirection="column">
          <Box display="flex">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setHideNotification(!hideNotification)}
              sx={{ height: '2rem' }}
            >
              {hideNotification ? (
                <BiShow size={18} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FcCancel size={15} style={{ marginRight: '4px' }} />
                  <p>
                    **To create a new profile, please delete this one first!**
                  </p>
                </div>
              )}
            </Button>
            <Button
              variant="contained"
              color={showDeleteForm ? 'warning' : 'error'}
              sx={{ height: '30px', marginLeft: '4px' }}
              onClick={() => setShowDeleteForm(!showDeleteForm)}
            >
              {showDeleteForm ? 'Cancel' : 'Delete Profile'}
            </Button>
          </Box>
          {showDeleteForm ? (
            <Box marginTop="1rem">
              <form
                style={{ height: '2rem' }}
                onSubmit={(e) => deleteProfile(e, teamName)}
              >
                <input
                  type="text"
                  name="teamName"
                  value={teamName}
                  placeholder="If applicable, team name"
                  style={{
                    backgroundColor: 'rgb(50, 57, 72)',
                    color: 'white',
                    height: '2rem',
                    outline: 'none',
                    border: 'none',
                  }}
                  onChange={(e) => handleTeamNameChange(e)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{
                    height: '2rem',
                    borderTopLeftRadius: '0',
                    borderBottomLeftRadius: '0',
                  }}
                >
                  Confirm
                </Button>
              </form>
            </Box>
          ) : (
            ''
          )}
        </Box>
      ) : (
        ''
      )}
    </>
  );
};

export default ProfileForm;
