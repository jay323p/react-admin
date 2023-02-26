// REACT
import { useState, useEffect } from 'react';
// REACT-REDUX
import { useDispatch, useSelector } from 'react-redux';
// REDUX-SLICE
import {
  selectProfile,
  SET_PROFILE,
} from '../../redux/features/profile/profileSlice';
// SERVICES
import {
  createProfile,
  createTeam,
  updateProfile,
  joinTeamAPI,
  removeProfile,
} from '../../services/profileService';
// MUI-MATERIAL
import { Box, Button, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
// COMPONENTS
import Header from '../../components/Header';
import { tokens } from '../../theme';
import ImageModal from '../../components/profileTeamForm/ImageModal';
import ProfileForm from '../../components/profileTeamForm/ProfileForm';
// MISC
import { Formik } from 'formik';
import * as yup from 'yup';

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const profileSchema = yup.object().shape({
  name: yup.string().required('required'),
  access: yup.string().required('required'),
  age: yup.number().required('required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('required'),
  email: yup.string().required('required'),
  bio: yup.string().required('required'),
});

const teamSchema = yup.object().shape({
  teamName: yup.string().required('required'),
  teamID: yup.string().required('required'),
});

const Form = () => {
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const [editProfile, setEditProfile] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [hide, setHide] = useState(false);
  const [hideNotification, setHideNotification] = useState(false);
  const [joinTeam, setJoinTeam] = useState(false);
  const [mouseHover, setMouseHover] = useState(false);
  const [mouseHoverTeam, setMouseHoverTeam] = useState(false);
  const [profile, setProfile] = useState({});
  const [teamName, setTeamName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [modal, showModal] = useState(false);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const foundProfile = useSelector(selectProfile);

  // profile form initial values on render handling
  useEffect(() => {
    const name = localStorage.getItem('name');
    if (profile.name !== name) {
      setProfile(foundProfile);
    } else {
      // already created profile ? default = edit page handling
      if (!editProfile) {
        setEditProfile(true);
        setHide(true);
      }
    }
  }, [foundProfile, profile.name, editProfile]);

  const initialValues = {
    name: profile.name,
    access: profile.access ? profile.access : '',
    age: profile.age ? profile.age : undefined,
    email: profile.email ? profile.email : '',
    phone: profile.phone ? profile.phone : '',
    bio: profile.bio ? profile.bio : '',
    photo: profile.photo ? profile.photo : '',
  };

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };
  // profile form initial values on render handling

  const teamValues = {
    teamName: profile.teamName ? profile.teamName : '',
    teamID: '',
  };

  const handleFormSubmit = async (values) => {
    if (!editProfile) {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('access', values.access);
      formData.append('age', values.age);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('photo', profileImage);
      formData.append('bio', values.bio);

      const data = await createProfile(formData);
      dispatch(SET_PROFILE(data));
    } else {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('access', values.access);
      formData.append('age', values.age);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('photo', profileImage);
      formData.append('bio', values.bio);
      const data = await updateProfile(formData);

      dispatch(SET_PROFILE(data));
    }
  };

  const handleTeamFormSubmit = async (values) => {
    if (!joinTeam) {
      await createTeam(values);
    } else {
      await joinTeamAPI(values);
    }
  };

  const deleteProfile = async (e, userData) => {
    e.preventDefault();
    const data = await removeProfile(userData);

    if (data) {
      setShowDeleteForm(!showDeleteForm);
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
      setProfile({});
      setEditProfile(false);
      setHide(false);
      setImagePreview(false);
    }
  };

  const handleMouseEnter = () => {
    setMouseHover(true);
  };
  const handleMouseLeave = () => {
    setMouseHover(false);
  };

  const handleMouseEnterTeamForm = () => {
    setMouseHoverTeam(true);
  };
  const handleMouseLeaveTeamForm = () => {
    setMouseHoverTeam(false);
  };

  const handleModalClick = () => {
    showModal(!modal);
  };

  return (
    <>
      {modal ? (
        <ImageModal
          imagePreview={imagePreview}
          handleModalClick={handleModalClick}
        />
      ) : (
        <Box m="20px">
          <ProfileForm
            editProfile={editProfile}
            hide={hide}
            mouseHover={mouseHover}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            setEditProfile={setEditProfile}
            handleFormSubmit={handleFormSubmit}
            initialValues={initialValues}
            profileSchema={profileSchema}
            isNonMobile={isNonMobile}
            handleImageChange={handleImageChange}
            imagePreview={imagePreview}
            handleModalClick={handleModalClick}
            setHideNotification={setHideNotification}
            hideNotification={hideNotification}
            setShowDeleteForm={setShowDeleteForm}
            showDeleteForm={showDeleteForm}
            deleteProfile={deleteProfile}
            teamName={teamName}
            handleTeamNameChange={handleTeamNameChange}
          />

          <hr style={{ marginTop: '1rem' }} />

          {/* CREATE A TEAM / JOIN A TEAM FORM */}

          <Box display="flex" justifyContent="space-between" marginTop="2rem">
            <Header
              title={joinTeam ? 'JOIN A TEAM' : 'CREATE A TEAM'}
              subtitle={
                !joinTeam
                  ? 'Managers welcome to create teams'
                  : 'Please get team name and team ID from team-manager to join'
              }
            />
            <button
              style={{
                backgroundColor: `${
                  mouseHoverTeam && !joinTeam
                    ? colors.blueAccent[600]
                    : mouseHoverTeam && joinTeam
                    ? colors.greenAccent[600]
                    : !mouseHoverTeam && !joinTeam
                    ? colors.blueAccent[300]
                    : !mouseHoverTeam && joinTeam
                    ? colors.greenAccent[300]
                    : 'white'
                }`,
                color: 'white',

                border: 'none',
                height: '4rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                boxShadow: `${
                  editProfile
                    ? 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'
                    : 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'
                }`,
              }}
              onMouseEnter={handleMouseEnterTeamForm}
              onMouseLeave={handleMouseLeaveTeamForm}
              onClick={() => setJoinTeam(!joinTeam)}
            >
              {joinTeam ? 'Create A Team' : 'Join A Team'}
            </button>
          </Box>
          <Formik
            onSubmit={handleTeamFormSubmit}
            initialValues={teamValues}
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
                    sx={{ gridColumn: 'span 4' }}
                  />
                  {/* TEAM ID */}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="teamID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.teamID}
                    name="teamID"
                    error={!!touched.teamID && !!errors.teamID}
                    helperText={touched.teamID && errors.teamID}
                    sx={{ gridColumn: 'span 3' }}
                  />

                  {/* SUBMIT BUTTON */}
                  <Box display="flex" justifyContent="end">
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: `${
                          joinTeam
                            ? colors.greenAccent[500]
                            : colors.blueAccent[500]
                        }`,
                        boxShadow: `${
                          joinTeam
                            ? 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'
                            : 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'
                        }`,
                      }}
                      variant="contained"
                    >
                      {joinTeam ? 'Join Team' : 'Create A Team'}
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      )}
    </>
  );
};

export default Form;
