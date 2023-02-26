import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SET_LOGIN } from '../redux/features/auth/authSlice';
import { SET_PROFILE } from '../redux/features/profile/profileSlice';
import { getLoginStatus } from '../services/authService';
import { getProfile } from '../services/profileService';

const useRedirectLoggedOutUser = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      const profile = await getProfile();

      if (profile) {
        dispatch(SET_PROFILE(profile));
      }
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast.info('Session expired, please log in to continue.');
        navigate(path);
        return;
      }
    };

    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
