// REACT IMPORTS
import { useEffect, useState } from 'react';

// MUI AND THEME IMPORTS
import { Box, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';

// REDUX, SERVICE, SLICE IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import {
  selectInventory,
  selectInventoryCost,
  selectTotalQty,
  SET_INVENTORY,
} from '../../redux/features/inventory/inventorySlice';
import {
  addInventory,
  deleteInventoryItem,
  getInventory,
  getInventoryItem,
  getUpdatedSalesDataFromInventory,
  updateInventoryItem,
} from '../../services/inventoryService';

// DATA IMPORTS
import {
  salePriceHistoryColumns,
  saleColumns,
  costBasisHistoryColumns,
  columns,
} from '../../data/inventoryMUIColumnData';

// COMPONENT IMPORTS
import CloseInventoryFormBtn from '../../components/formUIHelper/CloseInventoryFormBtn';
import DynamicHeadingOne from '../../components/formUIHelper/DynamicHeadingOne';
import Header from '../../components/Header';
import InventoryButton from '../../components/buttons/InventoryButton';
import InventoryFormikForm from '../../components/formUIHelper/InventoryFormikForm';
import FormikForm from '../../components/FormikForm';
import MUIDataGrid from '../../components/muiDataGrid/MUIDataGrid';
import QtyThresholdEasyInsert from '../../components/formUIHelper/QtyThresholdEasyInsert';
import QuickInventoryInfo from '../../components/formUIHelper/QuickInventoryInfo';
import SalePriceProfitCalculator from '../../components/formUIHelper/SalePriceProfitCalculator';
import { selectProfile } from '../../redux/features/profile/profileSlice';

// pdf-file upload initial state
const initialPDFValues = {
  pdfFile: {},
};

const Inventory = () => {
  // media query
  const isNonMobile = useMediaQuery('(min-width: 600px)');

  // theme/dispatch set-up
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  // redux selections
  const inventory = useSelector(selectInventory);
  const inventoryQtyFromSlice = useSelector(selectTotalQty);
  const inventoryTotalFromSlice = useSelector(selectInventoryCost);
  const profile = useSelector(selectProfile);

  // states
  const [isLoading, setIsLoading] = useState(false);
  const [singleInventoryItem, setSingleInventoryItem] = useState();
  const [showSingleItem, setShowSingleItem] = useState(false);
  const [showCostBasisHistory, setShowCostBasisHistory] = useState(false);
  const [costBasisHistory, setCostBasisHistory] = useState();
  const [costBasisModalDescription, setCostBasisModalDescription] =
    useState('');
  const [showSalePriceHistory, setShowSalePriceHistory] = useState(false);
  const [salePriceHistory, setSalePriceHistory] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [arrayOfSalePrices, setArrayOfSalePrices] = useState();
  const [finalState, setFinalState] = useState({
    description: '',
    quantity: 0,
    costBasis: 0,
    salePrice: 0,
    qtyThreshold: 0,
    slug: '',
    profitPercentage: 0,
  });
  const [updatedSalePrice, setUpdatedSalePrice] = useState(0);
  const [updatedQtyThreshold, setUpdatedQtyThreshold] = useState(0);
  const [inventoryTotal, setInventoryTotal] = useState(0);
  const [inventoryQty, setInventoryQty] = useState(0);
  const [showSales, setShowSales] = useState(false);
  const [inventoryPDF, setInventoryPDF] = useState({});
  const [pdfName, setPdfName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [tempInventory, setTempInventory] = useState();

  // helper inventory functions ------------------------------------------------------ START
  const calculateSalePriceByProfitPercent = (costPrice) => {
    const percents = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5];
    let pricesToSell = [];
    let num = parseFloat(costPrice);

    for (let i = 0; i < percents.length; i++) {
      let total = percents[i] * num;
      total += costPrice;
      parseFloat(total).toFixed(2);
      pricesToSell.push(total);
    }

    setArrayOfSalePrices(pricesToSell);
  };

  const calculateProfitPercetage = (costBasis, salePrice) => {
    let profit = 0;
    profit = ((salePrice - costBasis) / costBasis) * 100;
    return parseFloat(profit.toFixed(2));
  };

  const showInventoryItem = async (slug) => {
    const finalState = {
      slug,
    };
    const data = await getInventoryItem(finalState);

    if (data) {
      setSingleInventoryItem(data);
      setShowSingleItem(true);

      if (singleInventoryItem) {
        calculateSalePriceByProfitPercent(
          singleInventoryItem.weightedCostBasis
        );
      }
    }
  };

  const showCostBasisHistoryModal = (costBasisArray, description) => {
    setShowCostBasisHistory(true);
    setCostBasisHistory(costBasisArray);
    setCostBasisModalDescription(description);
  };

  const resetCostBasisHistoryModal = () => {
    setShowCostBasisHistory(false);
    setCostBasisHistory();
    setCostBasisModalDescription('');
  };

  const showSalePriceHistoryModal = (salePriceArray) => {
    setShowSalePriceHistory(true);
    setSalePriceHistory(salePriceArray);
  };

  const resetSalePriceHistoryModal = () => {
    setShowSalePriceHistory(false);
    setSalePriceHistory();
  };

  const deleteItemFromInventory = async (slug) => {
    const finalState = {
      slug,
    };
    const data = await deleteInventoryItem(finalState);

    if (data) {
      dispatch(SET_INVENTORY(data.inventory));
      setSingleInventoryItem();
      setShowSingleItem(false);
      setConfirmDelete(false);
    }
  };

  const showAllInventory = () => {
    setSingleInventoryItem();
    setShowSingleItem(false);
    setArrayOfSalePrices([]);
  };

  const handleImageChange = (e) => {
    setInventoryPDF(e.target.files[0]);
  };

  const handleInventoryFormSubmit = async (values) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('pdfFile', inventoryPDF);
    const data = await addInventory(formData);

    if (data) {
      setFormSubmitted(true);
      setInventoryPDF({});
      setIsLoading(false);
      dispatch(SET_INVENTORY(data.inventory));
      setTempInventory(data.inventory);
    }
    setPdfName('');
  };

  const updateSaleData = async () => {
    const data = await getUpdatedSalesDataFromInventory();

    if (data) {
      dispatch(SET_INVENTORY(data.inventory));
    }
  };

  const getTeamInventory = async () => {
    const data = await getInventory();

    if (data && data.length > 0) {
      setFormSubmitted(false);
      dispatch(SET_INVENTORY(data.inventory));
      setInventoryQty(data.totalQty);
      setInventoryTotal(data.inventoryCost);
    }
  };
  // helper inventory functions ------------------------------------------------------ END

  // form related functions and states --------------------------------------------- START
  const initialValues = {
    description: singleInventoryItem ? singleInventoryItem.description : '',
    quantity: singleInventoryItem ? singleInventoryItem.quantity : '',
    costBasis: singleInventoryItem ? singleInventoryItem.costBasis : 0,
    salePrice: singleInventoryItem ? singleInventoryItem.salePrice : 0,
    qtyThreshold: singleInventoryItem ? singleInventoryItem.qtyThreshold : 0,
    slug: singleInventoryItem ? singleInventoryItem.slug : 0,
    costBasisHistory: singleInventoryItem
      ? singleInventoryItem.costBasisHistory
      : [],
    weightedCostBasis: singleInventoryItem
      ? singleInventoryItem.weightedCostBasis
      : 0,
    qtySold: singleInventoryItem ? singleInventoryItem.qtySold : 0,
    salePriceHistory: singleInventoryItem
      ? singleInventoryItem.salePriceHistory
      : [],
    weightedSalePrice: singleInventoryItem
      ? singleInventoryItem.weightedSalePrice
      : 0,
    weightedProfit: singleInventoryItem
      ? singleInventoryItem.weightedProfit
      : 0,
    revenue: singleInventoryItem ? singleInventoryItem.revenue : 0,
  };

  const handleFormSubmit = async (values) => {
    //   calc xtra values for insertion
    const finalCostBasis = initialValues.weightedCostBasis;
    const finalSalePrice =
      updatedSalePrice > 0 ? updatedSalePrice : values.salePrice;
    const profit = calculateProfitPercetage(finalCostBasis, finalSalePrice);

    //   set final state
    setFinalState({
      description: values.description,
      quantity: values.quantity,
      costBasis: values.costBasis,
      salePrice: updatedSalePrice > 0 ? updatedSalePrice : values.salePrice,
      slug: initialValues.slug,
      qtyThreshold:
        updatedQtyThreshold > 0 ? updatedQtyThreshold : values.qtyThreshold,
      profitPercentage: profit,
      costBasisHistory: initialValues.costBasisHistory,
      weightedCostBasis: initialValues.weightedCostBasis,
      qtySold: initialValues.qtySold,
      salePriceHistory: initialValues.salePriceHistory,
      weightedSalePrice: initialValues.weightedSalePrice,
      weightedProfit: initialValues.weightedProfit,
    });

    //   check final state before sending
    if (finalState.slug !== '') {
      setIsLoading(true);
      values.salePrice = updatedSalePrice;
      values.qtyThreshold = updatedQtyThreshold;
      const data = await updateInventoryItem(finalState);

      if (data) {
        //   data handling/dispatching
        setIsLoading(false);
        dispatch(SET_INVENTORY(data.inventory));
        setInventoryTotal(data.inventoryCost);
        setInventoryQty(data.totalQty);
        setUpdatedSalePrice(0);
        setUpdatedQtyThreshold(0);
        setFinalState({
          description: '',
          quantity: 0,
          costBasis: 0,
          salePrice: 0,
          qtyThreshold: 0,
          slug: '',
        });
        showAllInventory();
      }
    }
  };

  // form related functions and states --------------------------------------------- END

  // MUI DATA GRID MODIFICATIONS ---------------------------------------------- START
  columns[0].renderCell = ({ row: { slug, salePrice } }) => {
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
          sx={{
            borderRadius: '5px',
            overflow: 'hidden',
            backgroundColor:
              salePrice === 0 ? '#FDDA16' : `${colors.greenAccent[500]}`,
          }}
          onClick={() => showInventoryItem(slug)}
        >
          {slug}
        </Button>
      </Box>
    );
  };

  columns[4].renderCell = ({ row: { costBasisHistory, description } }) => {
    return (
      <Box>
        {costBasisHistory && costBasisHistory.length > 0 ? (
          <Button
            variant="contained"
            color="info"
            onClick={() =>
              showCostBasisHistoryModal(costBasisHistory, description)
            }
          >
            {costBasisHistory.length}
          </Button>
        ) : (
          <Button variant="contained" color="info">
            {costBasisHistory && costBasisHistory.length
              ? costBasisHistory.length
              : 0}
          </Button>
        )}
      </Box>
    );
  };

  saleColumns[0].renderCell = ({ row: { slug, salePrice } }) => {
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
          sx={{
            borderRadius: '5px',
            overflow: 'hidden',
            backgroundColor:
              salePrice === 0 ? '#FDDA16' : `${colors.greenAccent[500]}`,
          }}
          onClick={() => showInventoryItem(slug)}
        >
          {slug}
        </Button>
      </Box>
    );
  };

  saleColumns[9].renderCell = ({ row: { salePriceHistory } }) => {
    return (
      <Box>
        {salePriceHistory && salePriceHistory.length > 0 ? (
          <Button
            variant="contained"
            color="info"
            onClick={() => showSalePriceHistoryModal(salePriceHistory)}
          >
            {salePriceHistory.length}
          </Button>
        ) : (
          <Button variant="contained" color="info">
            {salePriceHistory && salePriceHistory.length
              ? salePriceHistory.length
              : 0}
          </Button>
        )}
      </Box>
    );
  };
  // MUI DATA GRID MODIFICATIONS ---------------------------------------------- START

  // useEffect handling
  useEffect(() => {
    if (inventoryPDF.name) {
      setPdfName(inventoryPDF.name);
    } else {
      setPdfName('');
    }
    if (formSubmitted) {
      getTeamInventory();
    }
    if (singleInventoryItem) {
      calculateSalePriceByProfitPercent(singleInventoryItem.weightedCostBasis);
    }
    if (updatedSalePrice > 0) {
      initialValues.salePrice = updatedSalePrice;
    }
    if (inventory) {
      setTempInventory(inventory);
    }

    setInventoryQty(inventoryQtyFromSlice);
    setInventoryTotal(inventoryTotalFromSlice);
  }, [
    singleInventoryItem,
    updatedSalePrice,
    inventoryPDF,
    inventoryQtyFromSlice,
    inventoryTotalFromSlice,
    inventory,
  ]);

  // -----------------------------------------------COMPONENT RETURN--------------------------------------
  return (
    <>
      {/* SINGLE ITEM FORM PAGE START --------------------------------------------------------------------------*/}
      {showSingleItem ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="80vh"
          marginLeft="3rem"
          marginRight="3rem"
          marginTop="3rem"
          sx={{
            backgroundColor: `${colors.primary[900]}`,
            borderRadius: '3rem',
            borderTopRightRadius: '5px',
            boxShadow: `${colors.greenAccent[700]} 0px 20px 30px -10px`,
          }}
        >
          {/* CLOSE BTN COMP. */}
          <CloseInventoryFormBtn showAllInventory={showAllInventory} />
          {/* SALE PRICE PROFIT CALC COMP. */}
          <SalePriceProfitCalculator
            singleInventoryItem={singleInventoryItem}
            arrayOfSalePrices={arrayOfSalePrices}
            setUpdatedSalePrice={setUpdatedSalePrice}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            gap="8rem"
            height="100%"
            alignItems="baseline"
          >
            {/* INVENTORY FORM COMP. */}
            <InventoryFormikForm
              singleInventoryItem={singleInventoryItem}
              handleFormSubmit={handleFormSubmit}
              initialValues={initialValues}
              isNonMobile={isNonMobile}
              updatedSalePrice={updatedSalePrice}
              updatedQtyThreshold={updatedQtyThreshold}
              setConfirmDelete={setConfirmDelete}
              confirmDelete={confirmDelete}
              deleteItemFromInventory={deleteItemFromInventory}
              isLoading={isLoading}
            />
            {/* QTY-THRESHOLD INSERTER COMP. */}
            <QtyThresholdEasyInsert
              setUpdatedQtyThreshold={setUpdatedQtyThreshold}
            />
          </Box>
          {/* SINGLE ITEM FORM PAGE END ---------------------------------------------------------------------*/}
        </Box>
      ) : showSales ? (
        //   SHOW SALE SIDE OF INVENTORY START --------------------------------------------------------------
        <>
          <Box m="20px" sx={{ opacity: showSalePriceHistory ? '0.1' : '1' }}>
            <Box display="flex" justifyContent="space-between">
              <Box>
                {/* DATAGRID TITLE */}
                <Header
                  title="INVENTORY SALES"
                  subtitle="Viewing Inventory Sales"
                />
                {/* EXIT SALE-SIDE INVENTORY BTN */}
                <InventoryButton
                  type="switch"
                  variant="contained"
                  color="secondary"
                  btnFunction={setShowSales}
                  switchState={showSales}
                  label="Show Inventory"
                />
              </Box>
              {profile && profile.access === 'manager' ? (
                <Button
                  variant="contained"
                  color="info"
                  sx={{ height: '3rem', width: '10rem' }}
                  onClick={() => updateSaleData()}
                  onMouseEnter={() => setShowMessage(true)}
                  onMouseLeave={() => setShowMessage(false)}
                >
                  Update Sales Data
                </Button>
              ) : (
                ''
              )}
              {/* QUICK INVENTORY INFO BOX */}
              <QuickInventoryInfo
                inventoryQty={inventoryQty}
                inventoryTotal={inventoryTotal}
              />
            </Box>
            {showMessage ? (
              <Box display="flex" justifyContent="center" color="red">
                Please only press this button after a few inventory updates and
                if you notice anything wrong with the data! The program will
                automatically perform the necessary calculations, but some
                calculations may not have been done properly. Pressing this
                button will resolve any and all issues!
              </Box>
            ) : (
              ''
            )}
            {/* MUI SALE SIDE INVENTORY DATAGRID COMP. */}
            <MUIDataGrid
              rows={tempInventory ? tempInventory : inventory}
              columns={saleColumns}
              id={'slug'}
            />
          </Box>
          {/* TRANSACTION HISTORY MODAL */}
          {showSalePriceHistory && salePriceHistory.length > 0 ? (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                opacity: 1,
                zIndex: 1000,
                transform: 'translate(-50%, -50%)',
                marginTop: '2rem',
                padding: '1rem',
                width: '60vw',
                height: '90vh',
                backgroundImage: `linear-gradient(-20deg, ${colors.blueAccent[600]} 0%, ${colors.blueAccent[300]} 100%)`,
              }}
            >
              {/* CLOSE MODAL BTN */}
              <InventoryButton
                type="close"
                height="2rem"
                fontSize="large"
                color={colors.primary[500]}
                btnFunction={resetSalePriceHistoryModal}
              />
              {/* MODAL DYNAMIC TITLE */}
              <DynamicHeadingOne
                dynamicDescription={salePriceHistory[0].description}
                label="Transaction History"
              />
              {/* MUI TRANSACTION HISTORY MODAL DATAGRID COMP. */}
              <MUIDataGrid
                rows={salePriceHistory}
                columns={salePriceHistoryColumns}
                id={'updatedTime'}
              />
              {/* SHOW SALE SIDE OF INVENTORY END ---------------------------------------------------------------- */}
            </Box>
          ) : (
            ''
          )}
        </>
      ) : (
        //   SHOW COST SIDE OF INVENTORY START --------------------------------------------------------------
        <Box m="20px" sx={{ opacity: showCostBasisHistory ? '0.1' : '1' }}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              {/* INVENTORY COST SIDE TITLE */}
              <Header title="INVENTORY" subtitle="View/Edit Inventory" />
              {/* SWITCH TO SALE SIDE INVENTORY BTN */}
              <InventoryButton
                type="switch"
                variant="contained"
                color="secondary"
                btnFunction={setShowSales}
                switchState={showSales}
                label="Show Sales"
              />
            </Box>
            {/* INVENTORY SET-UP PDF SCAN BTN */}
            {inventory.length === 0 &&
              profile &&
              profile.access === 'manager' && (
                <FormikForm
                  handleFormSubmit={handleInventoryFormSubmit}
                  initialValues={initialPDFValues}
                  isNonMobile={isNonMobile}
                  handleImageChange={handleImageChange}
                  isLoading={isLoading}
                  pdfName={pdfName}
                  setPdfName={setPdfName}
                  btnLabel={['Scan Initial Inventory PDF', 'Add Inventory']}
                />
              )}
            {/* QUICK INVENTORY INFO BOX */}
            <QuickInventoryInfo
              inventoryQty={inventoryQty}
              inventoryTotal={inventoryTotal}
            />
          </Box>

          {/*MUI COST SIDE INVENTORY DATAGRID COMP.*/}
          <MUIDataGrid
            rows={tempInventory ? tempInventory : inventory}
            columns={columns}
            id={'slug'}
          />
        </Box>
      )}
      {/* COST BASIS HISTORY MODAL */}
      {showCostBasisHistory ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            opacity: 1,
            zIndex: 1000,
            transform: 'translate(-50%, -50%)',
            marginTop: '2rem',
            padding: '1rem',
            width: '60vw',
            height: '90vh',
            backgroundImage: `linear-gradient(-20deg, ${colors.blueAccent[600]} 0%, ${colors.blueAccent[300]} 100%)`,
          }}
        >
          {/* CLOSE CBH MODAL BTN */}
          <InventoryButton
            type="close"
            height="2rem"
            fontSize="large"
            color={colors.primary[500]}
            btnFunction={resetCostBasisHistoryModal}
          />
          {/* CBH MODAL DYNAMIC TITLE */}
          <DynamicHeadingOne
            dynamicDescription={costBasisModalDescription}
            label="Cost Basis Hisotry"
          />
          {/* MUI CBH HISTORY MODAL DATAGRID COMP. */}
          <MUIDataGrid
            rows={costBasisHistory}
            columns={costBasisHistoryColumns}
            id={'updatedTime'}
          />
          {/* SHOW COST SIDE OF INVENTORY END ------------------------------------------------------------------ */}
        </Box>
      ) : (
        ''
      )}
    </>
  );
};

export default Inventory;
