// REACCT
import { useState, useEffect } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
// SERVICES
import { getInventory } from '../../services/inventoryService';
import {
  addInvoice,
  deleteInvoice,
  getInvoice,
  getTeamInvoices,
  updateBalance,
} from '../../services/invoiceService';
import { getNearDueDateInvoicesFromInvoices } from '../../services/statService';
// REDUX-SLICES
import { SET_INVENTORY } from '../../redux/features/inventory/inventorySlice';
import { SET_TEAM_INVOICES } from '../../redux/features/invoice/invoiceSlice';
// MUI AND ICONS
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { FcCancel } from 'react-icons/fc';
import { BiShow } from 'react-icons/bi';
import { tokens } from '../../theme';
// COMPONENTS
import Header from '../../components/Header';
import FormikForm from '../../components/FormikForm';
import MUIDataGrid from '../../components/muiDataGrid/MUIDataGrid';
import SingleInvoice from './SingleInvoice';
// DATA
import { invoiceColumns } from '../../data/invoiceMUIColumnData';

// pdf-file upload initial state
const initialValues = {
  pdfFile: {},
};

// invoice util functions
const getInvoiceQuantity = (invoice) => {
  let quantity = 0;

  invoice.forEach((item, i) => {
    quantity += parseInt(item.quantity);
  });

  return quantity + ' units';
};

const getInvoiceTotal = (invoice) => {
  let total = 0;

  invoice.forEach((item, i) => {
    total += item.total;
  });

  return '$' + total;
};

// INVOICE COMPONENT --------------------------------------------------------------------------------------
const Invoices = () => {
  // theme/dispatch setup
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const dispatch = useDispatch();

  // USESTATES
  const [isLoading, setIsLoading] = useState(false);
  const [invoice, setInvoice] = useState({});
  const [pdfName, setPdfName] = useState('');
  const [invoiceID, setInvoiceID] = useState('');
  const [singleInvoice, setSingleInvoice] = useState({});
  const [teamInvoices, setTeamInvoices] = useState([]);
  const [totalInvoiceBalance, setTotalInvoiceBalance] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [updatedBalance, setUpdatedBalance] = useState(0);

  // MUI COLUMN MODS
  invoiceColumns[0].renderCell = ({ row: { _id } }) => {
    return (
      <Box
        width="100%"
        m="0 auto"
        p="5px"
        display="flex"
        justifyContent="center"
        borderRadius="4px"
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: '5px', overflow: 'hidden' }}
          onClick={() => getSingleInvoice(_id)}
        >
          {_id}
        </Button>
      </Box>
    );
  };

  // INVOICE UTIL FUNCTIONS THAT SET STATE -------------------------------
  // get balance sum of all invoices
  const getInvoicesBalanceSum = (teamInvoices) => {
    let sum = 0;
    teamInvoices.forEach((item, i) => {
      sum += item.balance;
    });
    setTotalInvoiceBalance(sum);
  };

  // update balance of single invoice
  const handleInvoiceBalanceUpdate = async (e, id) => {
    e.preventDefault();
    const initialState = {
      balance: updatedBalance,
      id,
    };

    const data = await updateBalance(initialState);

    if (data) {
      setSingleInvoice(data);
      getInvoices();

      // update nearDueDateInvoices in db here after balance change and getTeamStats will fetch update from backend
      getNearDueDateInvoicesFromInvoices();
    }
  };

  // get specific invoice
  const getSingleInvoice = async (id) => {
    const formData = {
      id,
    };
    const data = await getInvoice(formData);

    if (data) {
      setSingleInvoice(data);
      setShowInvoice(true);
    }
  };

  // get all invoices
  const getInvoices = async () => {
    const data = await getTeamInvoices();

    if (data) {
      dispatch(SET_TEAM_INVOICES(data));
      setTeamInvoices(data);
      getInvoicesBalanceSum(data);
    }
  };

  // delete specific invoice
  const deleteSpecificInvoice = async (id) => {
    const initialState = {
      id,
    };
    const data = await deleteInvoice(initialState);

    if (data) {
      setShowInvoice(false);
      getInvoices();
    }
  };

  // FORM UTIL FUNCTIONS ---------------------------------------
  // handle invoice file change
  const handleImageChange = (e) => {
    setInvoice(e.target.files[0]);
  };

  // submit pdfFile from frontend for backend scanning and processing
  const handleFormSubmit = async (values) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('pdfFile', invoice);
    const data = await addInvoice(formData);

    if (data) {
      setFormSubmitted(true);
      setInvoice({});
      setIsLoading(false);
      const data = await getInventory();

      if (data) {
        dispatch(SET_INVENTORY(data.inventory));
      }
    }
    setIsLoading(false);
    setPdfName('');
  };

  // USEEFFECT RENDER HANDLING
  useEffect(() => {
    if (invoice.name) {
      setPdfName(invoice.name);
    } else {
      setPdfName('');
    }
    if (invoiceID !== '') {
      getSingleInvoice(invoiceID);
    }
    if (formSubmitted) {
      getInvoices();
      setFormSubmitted(false);
    } else {
      getInvoices();
    }

    //   default
    getInvoicesBalanceSum(teamInvoices);
  }, [invoice, invoiceID, formSubmitted, singleInvoice]);

  // COMPONENT RETURN -------------------------------------------------------------------------------------------------
  return (
    <>
      {/* SINGLE INVOICE PAGE ----------------------------------------------------------- */}
      {showInvoice ? (
        <SingleInvoice
          singleInvoice={singleInvoice}
          getInvoiceQuantity={getInvoiceQuantity}
          getInvoiceTotal={getInvoiceTotal}
          handleInvoiceBalanceUpdate={handleInvoiceBalanceUpdate}
          updatedBalance={updatedBalance}
          setUpdatedBalance={setUpdatedBalance}
          setShowInvoice={setShowInvoice}
          setConfirmDelete={setConfirmDelete}
          confirmDelete={confirmDelete}
          deleteSpecificInvoice={deleteSpecificInvoice}
        />
      ) : (
        <Box m="10px">
          {/* ALL INVOICES PAGE ------------------------------------------------------------------- */}
          <Box display="flex" justifyContent="space-between">
            {/* header */}
            <Header title="INVOICES" subtitle="List of Invoice Balances" />
            {/* total balance sum of invoices */}
            <h2
              style={{
                color:
                  totalInvoiceBalance === 0
                    ? colors.greenAccent[500]
                    : colors.redAccent[500],
              }}
            >
              Total Balance: ${totalInvoiceBalance}
            </h2>
            {/* Upload pdf btn and submit pdf form ------ START*/}
            <FormikForm
              handleFormSubmit={handleFormSubmit}
              initialValues={initialValues}
              isNonMobile={isNonMobile}
              handleImageChange={handleImageChange}
              isLoading={isLoading}
              pdfName={pdfName}
              setPdfName={setPdfName}
              btnLabel={['Scan Invoice PDF', 'Add Invoice']}
            />
            {/* Upload pdf btn and submit pdf form ------ END*/}
          </Box>

          {/* show/hide helpeful user guide/notification */}
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowMessage(!showMessage)}
            >
              {showMessage ? (
                <FcCancel />
              ) : (
                <BiShow color={colors.blueAccent[400]} />
              )}
            </Button>
            {showMessage ? (
              <span
                style={{
                  color: `${colors.blueAccent[400]}`,
                  marginLeft: '1rem',
                }}
              >
                To update a invoice, please delete it first and then scan the
                updated invoice pdf!
              </span>
            ) : (
              ''
            )}
          </Box>

          {/* MUIDATAGRID */}
          <MUIDataGrid
            rows={teamInvoices}
            columns={invoiceColumns}
            id={'_id'}
          />
        </Box>
      )}
    </>
  );
};
export default Invoices;
