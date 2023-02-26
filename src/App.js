import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Inventory from './scenes/inventory';
import Invoices from './scenes/invoices';
import Form from './scenes/form';
import Calendar from './scenes/calendar';
import FAQ from './scenes/faq';
import Bar from './scenes/bar';
import Pie from './scenes/pie';
import Line from './scenes/line';
import Geography from './scenes/geography';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import {
  selectIsLoggedIn,
  SET_LOGIN,
  SET_NAME,
} from './redux/features/auth/authSlice';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import { canPopulateApp, getProfile } from './services/profileService';
import { getTeamInvoices } from './services/invoiceService';
import {
  selectHasInventory,
  selectHasInvoices,
  selectHasStats,
  selectHasTransactions,
  SET_PROFILE,
  SET_TEAMNAME,
  SET_TEAM_BOOLEANS,
} from './redux/features/profile/profileSlice';
import { logoutUser } from './services/authService';
import { SET_TEAM_INVOICES } from './redux/features/invoice/invoiceSlice';
import {
  getInventory,
  getUpdatedStatsFromInventory,
} from './services/inventoryService';
import {
  SET_INVENTORY,
  SET_INVENTORY_COST,
  SET_INVENTORY_QTY,
} from './redux/features/inventory/inventorySlice';
import { getDemandLineChartData } from './services/statService';
import {
  SET_DEMAND_LINE_DATA,
  SET_STATS,
} from './redux/features/stats/statSlice';
import { toast } from 'react-toastify';
import Transactions from './scenes/transactions';
import { getTeamTransactions } from './services/transactionService';
import { SET_TRANSACTIONS } from './redux/features/transactions/transactionsSlice';
import Landing from './pages/landing/Landing';
import { getLoginStatus } from './services/authService';

function App() {
  const [theme, colorMode] = useMode();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [inventory, setInventory] = useState();
  const [teamStats, setTeamStats] = useState();
  const dispatch = useDispatch();

  const hasTeamInventory = useSelector(selectHasInventory);
  const hasTeamInvoices = useSelector(selectHasInvoices);
  const hasTeamTransactions = useSelector(selectHasTransactions);
  const hasTeamStats = useSelector(selectHasStats);

  const getUserProfile = async () => {
    const data = await getProfile();
    console.log('getting profile for user --------------');

    if (data) {
      dispatch(SET_PROFILE(data));
      setProfile(data);
      dispatch(SET_TEAMNAME(data.teamName));
    } else {
      toast.error('Please Create A Profile And Join A Team!');
    }
  };

  const getTeamInventory = async () => {
    const data = await getInventory();

    if (data) {
      dispatch(SET_INVENTORY(data.inventory));
      setInventory(data.inventory);
      dispatch(SET_INVENTORY_QTY(data));
      dispatch(SET_INVENTORY_COST(data));
    } else {
      toast.error('Please Create A Profile And Join A Team!');
    }
  };

  const getInvoices = async () => {
    const data = await getTeamInvoices();

    if (data) {
      dispatch(SET_TEAM_INVOICES(data));
    } else {
      toast.error('Please Create A Profile And Join A Team!');
    }
  };

  const getTransactions = async () => {
    const transactions = await getTeamTransactions();

    if (transactions && transactions.length > 0) {
      dispatch(SET_TRANSACTIONS(transactions));
    } else {
      toast.error('Unable to fetch transactions!');
    }
  };

  const getUpdatedTeamStats = async () => {
    const data = await getUpdatedStatsFromInventory();

    if (data) {
      setTeamStats(data);
      dispatch(SET_STATS(data));
    } else {
      toast.error('Please Create A Profile And Join A Team!');
    }
  };

  const canUpdateUI = async () => {
    const booleans = await canPopulateApp();

    if (booleans) {
      dispatch(SET_TEAM_BOOLEANS(booleans));
    }

    if (booleans.hasInvoices) {
      getInvoices();
    }

    if (booleans.hasInventory) {
      getTeamInventory();
    }

    if (booleans.hasTransactions) {
      getTransactions();
    }

    if (booleans.hasStats) {
      getUpdatedTeamStats();
    }
  };

  const userLoginStatus = async () => {
    const loginStatus = await getLoginStatus();
    console.log('loginStatus -------------------------');
    console.log(loginStatus);

    if (!loginStatus) {
      console.log('false found');
      localStorage.removeItem('name');
    } else {
      return;
    }
  };

  useEffect(() => {
    const result = userLoginStatus();
    setLoggedIn(result);

    const name = localStorage.getItem('name');

    if (name) {
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(name));
      getUserProfile();

      if (!hasTeamStats) {
        canUpdateUI();
      }
    } else {
      navigate('/landing');
      logoutUser();
    }
  }, [hasTeamStats]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar profile={profile} />
          <main className="content">
            {isLoggedIn ? <Topbar /> : ''}
            <Routes>
              <Route path="/landing" element={<Landing />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route
                path="/resetpassword/:resetToken"
                element={<ResetPassword />}
              />
              <Route path="/team" element={<Team />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
