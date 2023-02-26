// REACT IMPORTS
import { useState, useEffect } from 'react';
// REACT REDUX RELATED IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProfile,
  selectMemberProfile,
  SET_MEMBER_PROFILE,
  SET_TEAMNAME,
} from '../../redux/features/profile/profileSlice';
import {
  getMemberProfile,
  getTeamMembers,
  removeMember,
  updateAccess,
} from '../../services/profileService';
// MUI MATERIAL/THEME IMPORTS
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { tokens } from '../../theme';
// COMPONENT IMPORTS
import Header from '../../components/Header';
import MUIDataGrid from '../../components/muiDataGrid/MUIDataGrid';
import { teamColumns } from '../../data/teamMUIColumnData';
import MenuSelector from '../../components/menuSelector/MenuSelector';
import ViewProfileButtonGroup from '../../components/buttons/ViewProfileButtonGroup';
import TeamPageButton from '../../components/buttons/TeamPageButton';
import DefaultTeamPage from '../../components/team/DefaultTeamPage';
import MemberProfileInfo from '../../components/team/MemberProfileInfo';
import AllTeamMembers from '../../components/team/AllTeamMembers';
// MISCELLANEOUS IMPORTS
import { toast } from 'react-toastify';
import * as yup from 'yup';

const initialState = {
  profileOwner: '',
  access: '',
};
const initialValues = {
  teamName: '',
};
const teamSchema = yup.object().shape({
  teamName: yup.string().required('required'),
});

const Team = () => {
  const isNonMobile = useMediaQuery('(min-width: 600px)');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  // STATES
  const [teamMembers, setTeamMembers] = useState([]);
  const [adminUpdating, setAdminUpdating] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const [access, setAccess] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [viewMember, setViewMember] = useState(false);
  const [font, setFont] = useState('cursive');
  const [align, setAlign] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [editID, setEditID] = useState('');
  const [lineBreaks, setLineBreaks] = useState(false);

  // REDUX SELECTORS
  const userProfile = useSelector(selectProfile);
  const memberProfile = useSelector(selectMemberProfile);

  // FORM RELATED FXNS
  const handleFormSubmit = async (values) => {
    const data = await getTeamMembers(values);
    if (data) {
      setTeamMembers(data);
    }
    if (teamMembers.length > 0) {
      dispatch(SET_TEAMNAME(teamMembers[0].teamName));
    }
  };

  const handleAccessChangeSubmit = async (e) => {
    e.preventDefault();

    const data = await updateAccess(userData);

    if (data) {
      setTeamMembers(data);
      setUserData(initialState);
      setEditID('');
      setAccess('');
    }
  };

  const handleInputChange = (e, profileOwner) => {
    setEditID(profileOwner);
    setAccess(e.target.value);
    setUserData({ ...userData, profileOwner: editID, access: e.target.value });
  };

  const handleEditRequest = (id) => {
    setShowAccessForm(!showAccessForm);
    setEditID(id);
  };

  const removeProfile = async (id) => {
    const data = await removeMember(id);

    if (data) {
      setTeamMembers(data);
    }
  };

  // PAGE SWITCHING FXNS
  const switchPage = async () => {
    if (userProfile.access === 'user') {
      return toast.error('Sorry, only admins and managers are allowed access!');
    } else {
      setAdminUpdating(!adminUpdating);
    }
  };

  const getMember = async (id) => {
    const data = await getMemberProfile(id);

    if (data) {
      dispatch(SET_MEMBER_PROFILE(data));
      setViewMember(!viewMember);
    }
  };

  // MISC
  const changeFont = (e) => {
    setFont(e.target.value);
  };

  useEffect(() => {
    if (teamMembers.length > 0) {
      dispatch(SET_TEAMNAME(teamMembers[0].teamName));
    }
  }, [teamMembers]);

  return (
    <>
      {/* --------------------VIEW MEMBERS ONLY PAGE ------------------------------- */}
      {teamMembers.length > 0 && !adminUpdating ? (
        <Box m="20px">
          <Box display="flex" justifyContent="space-between">
            <Header title="TEAM" subtitle="View Only Page" />
            <TeamPageButton
              onClick={switchPage}
              label={'Go To Remove/Update Page'}
              type={'basic'}
            />
          </Box>

          <MUIDataGrid
            rows={teamMembers}
            columns={teamColumns}
            id={'profileOwner'}
          />
        </Box>
      ) : //   ---------------------------INSERT TEAM NAME AND TEAM ID FOR ACCESS PAGE (DEFAULT) --------------------
      teamMembers.length > 0 && !adminUpdating ? (
        <DefaultTeamPage
          handleFormSubmit={handleFormSubmit}
          initialValues={initialValues}
          teamSchema={teamSchema}
          isNonMobile={isNonMobile}
        />
      ) : //   ---------------------------- UPDATE/DELETE/SHOW MEMBERS PAGE ------------------------------
      teamMembers.length > 0 && adminUpdating && !viewMember ? (
        <Box margin="20px">
          <Box display="flex" justifyContent="space-between">
            <Header title="TEAM" subtitle="Update Access/Remove Members" />
            <TeamPageButton
              onClick={switchPage}
              label={'Go To View Only Page'}
              type={'basic'}
            />
          </Box>

          <Box
            marginTop="20px"
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, fr)',
              alignmentBaseline: 'center',
            }}
          >
            {teamMembers.map((member) => {
              return (
                <AllTeamMembers
                  member={member}
                  getMember={getMember}
                  handleEditRequest={handleEditRequest}
                  showAccessForm={showAccessForm}
                  editID={editID}
                  handleAccessChangeSubmit={handleAccessChangeSubmit}
                  handleInputChange={handleInputChange}
                  access={access}
                  setShowConfirm={setShowConfirm}
                  showConfirm={showConfirm}
                  removeProfile={removeProfile}
                />
              );
            })}
          </Box>
        </Box>
      ) : viewMember ? (
        //   ------------------------ VIEW SINGLE MEMBER PROFILE PAGE -----------------------
        <Box marginLeft={'2rem'} marginRight="2rem">
          {/* HEADER BOX */}
          <Box display="flex" justifyContent="space-between" marginTop="2rem">
            <Header
              title="Team Member Profile"
              subtitle={`Viewing ${memberProfile.name}\'s profile`}
            />
            <TeamPageButton
              onClick={setViewMember}
              state={viewMember}
              label={'Go Back'}
              type={'complex'}
            />
          </Box>

          <Box
            display="flex"
            gap="1rem"
            sx={{
              borderRadius: '1rem',
              background: `radial-gradient(${colors.blueAccent[400]}, ${colors.greenAccent[400]})`,
              boxShadow: `rgba(89, 203, 232, 0.3) 0px 19px 38px, rgba(89, 203, 232, 0.22) 0px 15px 12px;`,
            }}
          >
            {/* MAIN TEMS/ IMAGE */}
            <Box
              margin="7px"
              borderRadius="1rem"
              sx={{
                boxShadow: `rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;`,
              }}
            >
              <img
                src={memberProfile.photo.filePath}
                alt="member_photo"
                style={{
                  objectFit: 'contain',
                  aspectRatio: '1/1',
                  width: '20rem',
                  height: '100%',
                  padding: '7px',
                  borderRadius: '1rem',
                  boxShadow: `rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;`,
                }}
              />
            </Box>
            {/* MAIN ITEMS/ PROFILE INFO */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems={align ? 'center' : 'start'}
              justifyContent="center"
              marginTop="7px"
              marginBottom="7px"
              marginRight="7px"
              padding="1rem"
              maxWidth="50%"
              sx={{
                fontFamily: { font },
                borderRadius: '1rem',
                boxShadow: `rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;`,
              }}
            >
              <MemberProfileInfo
                font={font}
                showDescription={showDescription}
                memberProfile={memberProfile}
                lineBreaks={lineBreaks}
              />
              {/* BUTTONS */}
              <ViewProfileButtonGroup
                setShowDescription={setShowDescription}
                showDescription={showDescription}
                setAlign={setAlign}
                align={align}
                setLineBreaks={setLineBreaks}
                lineBreaks={lineBreaks}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems={align ? 'center' : 'start'}
              justifyContent="center"
              marginTop="7px"
              marginBottom="7px"
              marginRight="7px"
              padding="1rem"
              maxWidth="50%"
              overflow="auto"
              sx={{
                fontFamily: { font },
                borderRadius: '1rem',
                boxShadow: `rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;`,
              }}
            >
              <h1 style={{ color: colors.primary[500] }}>
                Team Access Change Requests
              </h1>
              <Box width="100%">
                {userProfile.accessChanges &&
                userProfile.accessChanges.length > 0
                  ? userProfile.accessChanges.map((item) => {
                      return (
                        <>
                          <div
                            style={{
                              width: '100%',
                              height: '2px',
                              backgroundColor: 'black',
                            }}
                          ></div>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                          >
                            <Box
                              display="flex"
                              flexDirection="column"
                              paddingLeft="3px"
                              sx={{ color: colors.primary[500] }}
                            >
                              <h3>{item.name}</h3>
                              <h3>{item.bio}</h3>
                              <h3>
                                From {item.prevAccess} To {item.newAccess}
                              </h3>
                            </Box>
                            <Box
                              display="flex"
                              flexDirection="column"
                              paddingTop="2px"
                            >
                              <Button variant="contained" color="success">
                                Confirm
                              </Button>
                              <Button variant="contained" color="error">
                                Deny
                              </Button>
                            </Box>
                          </Box>
                          <div
                            style={{
                              width: '100%',
                              height: '2px',
                              backgroundColor: 'black',
                            }}
                          ></div>
                        </>
                      );
                    })
                  : ''}
              </Box>
            </Box>
          </Box>

          {/* CUSTOMIZATION SECTION */}
          <Box marginTop="2rem">
            <MenuSelector
              type="fonts"
              value={font}
              handleChange={changeFont}
              colors={colors}
            />
          </Box>
        </Box>
      ) : (
        //   ------------------------------INSERT TEAM NAME AND TEAM ID FOR ACCESS PAGE (DEFAULT) -------------------------------
        <DefaultTeamPage
          handleFormSubmit={handleFormSubmit}
          initialValues={initialValues}
          teamSchema={teamSchema}
          isNonMobile={isNonMobile}
        />
      )}
    </>
  );
};

export default Team;
