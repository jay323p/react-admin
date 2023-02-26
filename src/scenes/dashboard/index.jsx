// REACT IMPORTS
import { useCallback, useState, useEffect } from 'react';
// REACT-REDUX IMPORTS
import { useDispatch, useSelector } from 'react-redux';
// SERVICES IMPORTS
import {
  getDemandLineChartData,
  getNearDueDateInvoicesFromInvoices,
  getRevenueLineData,
  updateFinalQtyToOrderService,
} from '../../services/statService';
import { getUpdatedStatsFromInventory } from '../../services/inventoryService';
// REDUX-SLICE IMPORTS
import { selectProfile } from '../../redux/features/profile/profileSlice';
import {
  selectInventoryCost,
  selectInventoryQty,
  selectLosses,
  selectNearDueDateInvoices,
  selectProfit,
  selectQtySold,
  selectRecentTransactions,
  selectReorderList,
  selectRevenue,
  SET_NEAR_DUE_INVOICES,
  SET_STATS,
} from '../../redux/features/stats/statSlice';
// MUI MATERIAL IMPORTS
import { Box, Button } from '@mui/material';
// COMPONENT IMPORTS
import Header from '../../components/Header';
import DashboardRowOne from '../../components/statisticBoxes/DashboardRowOne';
import DashboardRowTwo from '../../components/statisticBoxes/DashboardRowTwo';
import DashboardRowThree from '../../components/statisticBoxes/DashboardRowThree';
import DownloadReportButton from '../../components/buttons/DownloadReportButton';
import { initialRevenueLineData, initialDemandLineData } from './lineData';

const Dashboard = () => {
  const dispatch = useDispatch();

  // STATES
  const [revenueLineData, setRevenueLineData] = useState();
  const [highDemandLineDataState, setHighDemandLineDataState] = useState();
  const [lowDemandLineDataState, setLowDemandLineDataState] = useState();
  const [showLowDemandLineData, setShowLowDemandLineData] = useState(false);
  const [inventoryQtyProgress, setInventoryQtyProgress] = useState(0);
  const [inventoryQtyPercent, setInventoryQtyPercent] = useState(0);
  const [profitRevenuePercent, setProfitRevenuePercent] = useState(0);
  const [profitRevenueProgress, setProfitRevenueProgress] = useState(0);
  const [revenueInventoryCostProgress, setRevenueInventoryCostProgress] =
    useState(0);
  const [revenueInventoryCostPercent, setRevenueInventoryCostPercent] =
    useState(0);
  const [lossesOverProfitProgress, setLossesOverProfitProgress] = useState(0);
  const [lossesOverProfitPercent, setLossesOverProfitPercent] = useState(0);
  const [updateFinalQtyToOrder, setUpdateFinalQtyToOrder] = useState(false);
  const [finalQtyToOrderInitialState, setFinalQtyToOrderInitialState] =
    useState({
      slug: '',
      finalQtyToOrder: 0,
    });
  const [qtysToOrder, setQtysToOrder] = useState();
  const [finalQty, setFinalQty] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  // USE SELECTORS
  const inventoryQty = useSelector(selectInventoryQty);
  const qtySold = useSelector(selectQtySold);
  const inventoryCost = useSelector(selectInventoryCost);
  const inventoryLosses = useSelector(selectLosses);
  const inventoryProfit = useSelector(selectProfit);
  const recentTransactions = useSelector(selectRecentTransactions);
  const revenue = useSelector(selectRevenue);
  let reorderList = useSelector(selectReorderList);
  const nearDueDateInvoices = useSelector(selectNearDueDateInvoices);
  const profile = useSelector(selectProfile);

  // LINE DATA FXNS
  const getLineData = async () => {
    const data = await getRevenueLineData();

    if (data) {
      setRevenueLineData([data]);
    }
  };

  const updateDemandLineData = async () => {
    const demandLineData = await getDemandLineChartData();

    if (demandLineData && demandLineData.length > 0) {
      setHighDemandLineDataState([demandLineData[0]]);
      setLowDemandLineDataState([demandLineData[1]]);
    }
  };

  // FORM-RELATED FXNS
  const setUpFinalQtyToOrderForm = (slug, qtysToOrder) => {
    setFinalQtyToOrderInitialState({
      slug: slug,
      finalQtyToOrder: 0,
    });
    setQtysToOrder(qtysToOrder);
    setUpdateFinalQtyToOrder(true);
  };

  const handleQtyToOrderChangeFormSubmit = async (e) => {
    e.preventDefault();
    const data = await updateFinalQtyToOrderService(
      finalQtyToOrderInitialState
    );

    if (data) {
      setFinalQty(finalQtyToOrderInitialState.finalQtyToOrder);
      setFinalQtyToOrderInitialState({
        slug: '',
        finalQtyToOrder: 0,
      });
      setQtysToOrder();

      setUpdateFinalQtyToOrder(false);
    }
  };

  const cancelQtyToOrderUpdate = () => {
    setFinalQtyToOrderInitialState({
      slug: '',
      finalQtyToOrder: 0,
    });
    setQtysToOrder();
    setUpdateFinalQtyToOrder(false);
  };

  const getUpdatedTeamInventoryStats = async () => {
    const data = await getUpdatedStatsFromInventory();

    if (data) {
      dispatch(SET_STATS(data));
      const nearDueInvoices = await getNearDueDateInvoicesFromInvoices();
      const demandLineChartData = await getDemandLineChartData();

      if (nearDueDateInvoices) {
        dispatch(SET_NEAR_DUE_INVOICES(nearDueInvoices));
      }
    }
  };

  const handleCalculations = useCallback(() => {
    if (qtySold !== 0 || revenue !== 0) {
      //   first statBox
      const qtyProgress = qtySold / inventoryQty;
      const fixedQtyProgress = parseFloat(qtyProgress.toFixed(2));
      const qtyPercent = (qtySold / inventoryQty) * 100;
      const fixedQtyPercent = parseFloat(qtyPercent.toFixed(2));

      //   second statBox
      const revenueOverInventoryCostProgress = revenue / inventoryCost;
      const fixedRevenueOverInventoryCost = parseFloat(
        revenueOverInventoryCostProgress.toFixed(2)
      );
      const revenueOverInventoryCostPercent = (revenue / inventoryCost) * 100;
      const fixedRevenueOverInventoryCostPercent = parseFloat(
        revenueOverInventoryCostPercent.toFixed(2)
      );

      //   third staBox
      const lossesOverProfitProgress = inventoryLosses / inventoryProfit;
      const fixedLossesOverProfitProgress = parseFloat(
        lossesOverProfitProgress.toFixed(2)
      );
      const lossesOverProfitPercent = (inventoryLosses / inventoryProfit) * 100;
      const fixedLossesOverProfitPercent = parseFloat(
        lossesOverProfitPercent.toFixed(2)
      );

      //   fourth staBox
      const profitToRevenueProgress = inventoryProfit / revenue;
      const fixedProfitToRevenueProgress = parseFloat(
        profitToRevenueProgress.toFixed(2)
      );
      const profitToRevenuePercent = (inventoryProfit / revenue) * 100;
      const fixedProfitToRevenuePercent = parseFloat(
        profitToRevenuePercent.toFixed(2)
      );

      //   state handlings
      setInventoryQtyProgress(fixedQtyProgress);
      setInventoryQtyPercent(fixedQtyPercent);
      setRevenueInventoryCostProgress(fixedRevenueOverInventoryCost);
      setRevenueInventoryCostPercent(fixedRevenueOverInventoryCostPercent);
      setLossesOverProfitProgress(fixedLossesOverProfitProgress);
      setLossesOverProfitPercent(fixedLossesOverProfitPercent);
      setProfitRevenuePercent(fixedProfitToRevenuePercent);
      setProfitRevenueProgress(fixedProfitToRevenueProgress);
    }
  }, [
    inventoryCost,
    inventoryLosses,
    inventoryProfit,
    qtySold,
    revenue,
    inventoryQty,
  ]);

  // USE EFFECT RENDER HANDLING
  useEffect(() => {
    if (!revenueLineData) {
      getLineData();
    }

    if (!highDemandLineDataState) {
      updateDemandLineData();
    }

    handleCalculations();
  }, [
    revenueLineData,
    highDemandLineDataState,
    inventoryQtyProgress,
    profitRevenueProgress,
    handleCalculations,
  ]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box display="flex" flexDirection="row">
          {profile.access === 'manager' ? (
            <Button
              variant="contained"
              color="info"
              onMouseEnter={() => setShowMessage(true)}
              onMouseLeave={() => setShowMessage(false)}
              onClick={() => getUpdatedTeamInventoryStats()}
              sx={{ width: '8rem', height: '3rem' }}
            >
              Get Updated Stats
            </Button>
          ) : (
            <Box color="red">
              'Please speak with your team manager if you notice team stats are
              not up to date!'
            </Box>
          )}
        </Box>
        <DownloadReportButton />
      </Box>

      {/* GRID & CHARTS */}
      <Box display="flex" justifyContent="center" color="red">
        {showMessage
          ? 'Please only press this button occasionally after a few inventory updates! Calculations will be done automatically but some calculations may not have been done correctly, so pressing this button will fix any and all issues! '
          : ''}
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <DashboardRowOne
          qtySold={qtySold}
          inventoryQty={inventoryQty}
          inventoryQtyProgress={inventoryQtyProgress}
          inventoryQtyPercent={inventoryQtyPercent}
          inventoryCost={inventoryCost}
          revenue={revenue}
          revenueInventoryCostProgress={revenueInventoryCostProgress}
          revenueInventoryCostPercent={revenueInventoryCostPercent}
          inventoryProfit={inventoryProfit}
          profitRevenueProgress={profitRevenueProgress}
          profitRevenuePercent={profitRevenuePercent}
          inventoryLosses={inventoryLosses}
          lossesOverProfitProgress={lossesOverProfitProgress}
          lossesOverProfitPercent={lossesOverProfitPercent}
        />
        {/* ROW 2 */}
        <DashboardRowTwo
          revenue={revenue}
          initialRevenueLineData={initialRevenueLineData}
          revenueLineData={revenueLineData}
          recentTransactions={recentTransactions}
        />
        {/* ROW 3 */}
        <DashboardRowThree
          reorderList={reorderList}
          updateFinalQtyToOrder={updateFinalQtyToOrder}
          setUpFinalQtyToOrderForm={setUpFinalQtyToOrderForm}
          finalQty={finalQty}
          finalQtyToOrderInitialState={finalQtyToOrderInitialState}
          qtysToOrder={qtysToOrder}
          setFinalQtyToOrderInitialState={setFinalQtyToOrderInitialState}
          handleQtyToOrderChangeFormSubmit={handleQtyToOrderChangeFormSubmit}
          cancelQtyToOrderUpdate={cancelQtyToOrderUpdate}
          initialDemandLineData={initialDemandLineData}
          showLowDemandLineData={showLowDemandLineData}
          highDemandLineDataState={highDemandLineDataState}
          lowDemandLineDataState={lowDemandLineDataState}
          setShowLowDemandLineData={setShowLowDemandLineData}
          nearDueDateInvoices={nearDueDateInvoices}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
