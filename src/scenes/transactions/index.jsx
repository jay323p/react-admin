// REACT
import { useState, useEffect } from 'react';
// REACT-REDUX
import { useDispatch } from 'react-redux';
// REDUX-SLICES
import { SET_INVENTORY } from '../../redux/features/inventory/inventorySlice';
import { SET_STATS } from '../../redux/features/stats/statSlice';
import { SET_TRANSACTIONS } from '../../redux/features/transactions/transactionsSlice';
// SERVICES
import { getInventory } from '../../services/inventoryService';
import { getUpdatedTeamStats } from '../../services/statService';
import {
  addTransaction,
  getSingleTeamTransaction,
  getTeamTransactions,
} from '../../services/transactionService';
// MUI-MATERIAL AND ICONS
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { FcCancel } from 'react-icons/fc';
import { BiShow } from 'react-icons/bi';
// COMPONENTS
import Header from '../../components/Header';
import FormikForm from '../../components/FormikForm';
import MUIDataGrid from '../../components/muiDataGrid/MUIDataGrid';
import SingleTransaction from './SingleTransaction';
// DATA
import { transactionColumns } from '../../data/transactionMUIColumnData';

// pdf-file upload initial state
const initialValues = {
  pdfFile: {},
};

// TRANSACTION COMPONENT --------------------------------------------------------------------------------------
const Transactions = () => {
  // theme/dispatch setup
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  const dispatch = useDispatch();

  // useState setups
  const [isLoading, setIsLoading] = useState(false);
  const [transactionPDF, setTransactionPDF] = useState({});
  const [pdfName, setPdfName] = useState('');
  const [transactionID, setTransactionID] = useState('');
  const [singleTransaction, setSingleTransaction] = useState({});
  const [teamTransactions, setTeamTransactions] = useState([]);
  const [totalTransactionSum, setTotalTransactionSum] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(true);
  const [showTransaction, setShowTransaction] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // INVOICE UTIL FUNCTIONS THAT SET STATE -------------------------------
  //   get transaction sum of all team transactions
  const getTransactionSum = (teamTransactions) => {
    let sum = 0;
    teamTransactions.forEach((item, i) => {
      sum += item.transactionTotal;
    });
    setTotalTransactionSum(sum);
  };

  // get specific transaction
  const getSingleTransaction = async (_id) => {
    const formData = {
      _id,
    };
    const data = await getSingleTeamTransaction(formData);

    if (data) {
      setSingleTransaction(data);
      setShowTransaction(true);
    }
  };

  // get all transactions
  const getTransactions = async () => {
    const data = await getTeamTransactions();

    if (data && data.length > 0) {
      dispatch(SET_TRANSACTIONS(data));
      setTeamTransactions(data);
      getTransactionSum(data);
    }
  };

  // FORM UTIL FUNCTIONS ---------------------------------------
  // handle invoice file change
  const handleImageChange = (e) => {
    setTransactionPDF(e.target.files[0]);
  };

  // submit pdfFile from frontend for backend scanning and processing
  const handleFormSubmit = async (values) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('pdfFile', transactionPDF);
    const data = await addTransaction(formData);

    if (data) {
      setFormSubmitted(true);
      setTransactionPDF({});
      setIsLoading(false);

      const data = await getInventory();

      if (data) {
        dispatch(SET_INVENTORY(data.inventory));
      }

      const statsData = await getUpdatedTeamStats();

      if (statsData) {
        dispatch(SET_STATS(statsData));
      }
    }
    setIsLoading(false);
    setPdfName('');
  };

  // useEffect render handling
  useEffect(() => {
    if (transactionPDF.name) {
      setPdfName(transactionPDF.name);
    } else {
      setPdfName('');
    }
    if (transactionID !== '') {
      getSingleTeamTransaction(transactionID);
    }
    if (formSubmitted) {
      getTransactions();
      setFormSubmitted(false);
    } else {
      if (teamTransactions.length === 0) {
        getTransactions();
      }
    }
  }, [transactionPDF, transactionID, formSubmitted, singleTransaction]);

  // MUIDATAGRID columns/rows setup --------------------------------------- START
  transactionColumns[0].renderCell = ({ row: { _id } }) => {
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
          onClick={() => getSingleTransaction(_id)}
        >
          {_id}
        </Button>
      </Box>
    );
  };

  // COMPONENT RETURN -------------------------------------------------------------------------------------------------
  return (
    <>
      {/* SINGLE INVOICE PAGE ------------------------------------------------------  */}
      {showTransaction ? (
        <Box overflow={'auto'}>
          <SingleTransaction
            singleTransaction={singleTransaction}
            setShowTransaction={setShowTransaction}
          />
        </Box>
      ) : (
        <Box m="10px">
          {/* ALL INVOICES PAGE --------------------------------------------------------------  */}
          <Box display="flex" justifyContent="space-between">
            {/* header */}
            <Header title="Transactions" subtitle="List of Team Transactions" />
            {/* total balance sum of invoices */}
            <h2
              style={{
                color:
                  totalTransactionSum === 0
                    ? colors.greenAccent[500]
                    : colors.redAccent[500],
              }}
            >
              Total Transactions Sum: ${totalTransactionSum}
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
              btnLabel={['Scan Transaction PDF', 'Add Transaction']}
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
            rows={teamTransactions}
            columns={transactionColumns}
            id={'transactionTimeline'}
          />
        </Box>
      )}
    </>
  );
};
export default Transactions;
