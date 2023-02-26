import { Box, useTheme, Typography } from '@mui/material';
import Header from '../../components/Header';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tokens } from '../../theme';

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      {/* QUESTION 1 */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I create a team?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            1: Under profile form, please first create a profile with "manager"
            level access.
          </Typography>
          <Typography>
            2: After profile is created successfully, please then create a team
            in the same section.
          </Typography>
          <Typography>
            3: Team ID is your teams password to access the application so
            please do make it secure!
          </Typography>
          <Typography>
            4: Only one manager is allowed per team so make sure team members
            use "admin" or "user" access level when creating a profile.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* QUESTION 2 */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How does the application work?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This application requires setup of an intial inventory first! After
            counting your inventory and creating the respective PDF file for
            your inventory items, this application will then scan the pdf and
            setup your initial inventory. To add new inventory, you simply scan
            invoice pdfs. To remove inventory, or simulate transactions, you
            simply create a transactions pdf and scan it! This application
            handles all logic needed to create and sustain an inventory
            management system!
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* QUESTION 3 */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            I have issues scanning my pdfs!
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This application works through scanning pdfs that are of a certain
            format! Please understand that inventory pdf, invoice pdfs, and
            transaction pdfs have their own unique formats so the software can
            extract what it needs to out of those pdf files! It is important to
            follow their respective formats! Furthermore, please make sure you
            correctly enter the product names every time you need to make an
            inventory update! Entering the wrong product name can create a new
            inventory entry or cause the application to throw an error!
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* QUESTION 4 */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Why can I only be a part of one team?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Currently, our application does not support users to be a part of
            multiple teams! Therefore, each user is restricted to be on only one
            team in any instance! You may leave a team to join another one or
            simply create a new account to be on mutliple teams at once. Future
            updates to this application will allow users to join as many teams
            as they like!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
